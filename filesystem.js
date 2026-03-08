// 仮想ファイルシステム

let filesystem = JSON.parse(localStorage.getItem("chaFilesystem")) || {

  home: {
    "welcome.txt": "Welcome to Cha-syuOS"
  },

  docs: {},

  apps: {}

};

function saveFS(){
  localStorage.setItem("chaFilesystem", JSON.stringify(filesystem));
}
