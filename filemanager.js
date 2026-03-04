function openFileManager(){

  let content = "<div style='max-height:200px;overflow:auto;'>";

  if(localStorage.length === 0){
    content += "No files found.";
  }else{
    for(let i=0;i<localStorage.length;i++){
      let key = localStorage.key(i);
      content += `
        <div style="margin-bottom:5px;">
          📄 ${key}
          <button onclick="viewFile('${key}')">Open</button>
          <button onclick="deleteFile('${key}')">Delete</button>
        </div>
      `;
    }
  }

  content += "</div>";

  createWindow("File Manager", content);
}

function viewFile(key){
  let data = localStorage.getItem(key);

  // 画像かどうか判定
  if(data && data.startsWith("data:image")){
    createWindow(key, "<img src='"+data+"' style='width:100%;'>");
  }
  // それ以外はテキスト表示
  else{
    createWindow(key, "<textarea style='width:100%;height:150px;'>"+data+"</textarea>");
  }
}

function deleteFile(key){
  if(confirm("Delete "+key+" ?")){
    localStorage.removeItem(key);
    alert("Deleted!");
  }
}
