let packages = {

python3:{
name:"python3",
description:"Python interpreter",

install:function(){

installedPackages["python3"]=true;

alert("Python3 installed!");

}

},

nano:{
name:"nano",
description:"Text editor",

install:function(){

installedPackages["nano"]=true;

alert("Nano installed!");

}

}

};

let installedPackages={};
