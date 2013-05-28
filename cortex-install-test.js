var Installer = require("./lib/cortex-install");

var installer = new Installer();

installer.installModule("ajax","0.0.0",function(err,json){
    console.log(json);
});