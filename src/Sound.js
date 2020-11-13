export class Sound {
  constructor() {
    this.sound = document.createElement('audio');
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.setAttribute('muted', false);
    this.sound.style.display = 'none';
    this.state = true;
    document.body.appendChild(this.sound);
  }
  init(src) {
    this.pause();
    this.sound.currentTime = 0;
    this.sound.src = `sounds/${src}`;
    const playPromise = this.play();
    if (playPromise) {
      playPromise.then(() => {
        setTimeout(() => this.play(), 0);
      }).catch(error => {
        console.log({error});
      });
    }
  }
  play() {
    if (this.state) this.sound.play();
  }
  pause() {
    if (this.state) this.sound.pause();
  }
}