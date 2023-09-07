export class CanvasAnimation {
  constructor(canvas, drawCallback, backgroundColor = 'white') {
    this.canvas = canvas;
    this.backgroundColor = backgroundColor;
    this.drawCallback = drawCallback;
    this.animationFrameId = 0;
  }

  updateBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    window.cancelAnimationFrame(this.animationFrameId);
    this.draw();
  }

  setupCanvasResize() {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.getContext('2d');
    const { width, height } = this.canvas.getBoundingClientRect();

    if (this.canvas.width !== width || this.canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      this.canvas.width = width * ratio;
      this.canvas.height = height * ratio;
      context?.scale(ratio, ratio);
      window.cancelAnimationFrame(this.animationFrameId);
      this.draw();
    }
  }

  draw() {
    if (!this.canvas) {
      return;
    }

    this.canvas.style.backgroundColor = this.backgroundColor;
    const context = this.canvas.getContext('2d');
    let frameCount = 0;

    const render = () => {
      frameCount += 1;
      this.drawCallback(context, frameCount);
      this.animationFrameId = window.requestAnimationFrame(render);
    };

    render();
  }

  destroy() {
    window.removeEventListener('resize', this.setupCanvasResize);
    window.cancelAnimationFrame(this.animationFrameId);
  }

  init() {
    this.draw();
    this.setupCanvasResize();
    window.addEventListener('resize', this.setupCanvasResize.bind(this));
  }
}
