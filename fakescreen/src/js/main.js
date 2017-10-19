/* jshint esversion:6 */

const background = document.getElementById('bg');

window.addEventListener('paste', setBackground);

function setBackground(e){
  const items = (e.clipboardData || e.originalEvent.clipboardData).items;

  for (const i in items) {
    const item = items[i];

    if (item.kind === 'file') {
      const blob = item.getAsFile();
      const reader = new FileReader();

      reader.onload = function(e){
        const url = e.target.result;
        background.src = url;

        trigger();
      };

      reader.readAsDataURL(blob);
    }
  }
}

function trigger(){
  for(const i in setup.eventListeners){
    document.removeEventListener(setup.eventListeners[i], alarm);
    document.addEventListener(setup.eventListeners[i], alarm);
  }

}

function alarm(e){
  if(e.type === 'keypress'){
    if(e.key !== setup.safeKey){
      playAudio();
    }
  }else{
    playAudio();
  }

  function playAudio(){
    const audio = new Audio(setup.audio);
    audio.play();

    window.setTimeout(function(){
      audio.pause();
      audio.currentTime = 0;
    }, setup.playTime);

    splashImage();
  }
}

function splashImage(){
  const image = new Image();
  image.src = setup.splashImage;
  image.className = 'splash-image';
  document.body.appendChild(image);

  window.setTimeout(function(){
    image.parentElement.removeChild(image);
  }, setup.playTime);
}