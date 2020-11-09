export class Sound {
  constructor() {
    this.sound = document.createElement('audio');
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.setAttribute('muted', false);
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
  }
  init(src) {
    this.sound.pause();
    this.sound.currentTime = 0;
    this.sound.src = `sounds/${src}`;
    const playPromise = this.sound.play();
    if (playPromise) {
      playPromise.then(() => {
        setTimeout(() => this.sound.play(), 0);
      }).catch(error => {
        console.log({error});
      });
    }
  }
  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}