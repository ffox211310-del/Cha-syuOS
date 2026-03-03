const musicContainer = document.getElementById("musicContainer");
const musicFile = document.getElementById("musicFile");
const audioPlayer = document.getElementById("audioPlayer");

function openMusic(){
  desktop.style.display = "none";
  musicContainer.style.display = "block";
}

function closeMusic(){
  musicContainer.style.display = "none";
  desktop.style.display = "block";
}

musicFile.addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    audioPlayer.play();
  }
});
