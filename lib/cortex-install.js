var npm = require("./npmw")
    , path = require("path")
    , file = require("fs-extra")
    , async = require("async")
    , cwd = process.cwd()
    , WEB_MODULE_DIR = "web_modules"
    , NODE_MODULE_DIR = "node_modules"
    , PACKAGE_DEPENDENCIES_KEY = "cortexDependencies";

function removeEmptyDir(path){
    if(!file.existsSync(path)){
        return;
    }

    var files = file.readdirSync(path);
    if(!files.length){
        file.removeSync(path)
    }
}

function installModule(mod,version,done){
    npm.load(function (er,npm) {
        if (er) return done(er)
        npm.commands.install([mod+"@"+version], function (er, data) {
            if (er) return done(er)
            done(null);
        });
    });
}

/**
 * 分析依赖，下载
 */
function intstallDependencies(dir,options,all_installed){
    options = options || {};
    var packageFile = path.join(dir,"./package.json")
        , packageJSON = file.readJsonSync(packageFile)
        , dependencies
        , mod
        , tasks = [];

    dependencies = packageJSON[PACKAGE_DEPENDENCIES_KEY]
    if(!dependencies){
        all_installed()
        return;
    }

    for(mod in dependencies){
        (function(mod,version){
            tasks.push(function(one_installed){
                installModule(mod,version,function(){
                    var node_modules_dir = path.join(dir,NODE_MODULE_DIR)
                        , web_modules_dir = path.join(dir,WEB_MODULE_DIR)
                        , module_preinstalled_dir = path.join(node_modules_dir,mod)
                        , module_dist_dir = path.join(web_modules_dir,mod,version)

                    file.mkdirpSync(module_dist_dir);
                    file.copy(module_preinstalled_dir,module_dist_dir,function(){
                        intstallDependencies(module_dist_dir,options,one_installed);
                        console.log("copy: ".green + path.relative(dir,module_preinstalled_dir) + " -> " + path.relative(dir,module_dist_dir))
                        file.removeSync(module_preinstalled_dir);
                    });
                });
            });
        })(mod,dependencies[mod]);
    }
    async.series(tasks,all_installed);


}


module.exports = {
    install:intstallDependencies
}