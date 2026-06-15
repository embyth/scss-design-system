import { onBeforeUnmount, onMounted, watchEffect, type Ref, type ShallowRef } from 'vue';

type TDraw = (context: CanvasRenderingContext2D | null, frameCount: number) => void;

type TCanvasRef = Readonly<ShallowRef<HTMLCanvasElement | null>> | Ref<HTMLCanvasElement | null>;

type TUseCanvasOptions = {
  backgroundColor?: Ref<string> | (() => string);
};

export const useCanvas = (canvasReference: TCanvasRef, draw: TDraw, options: TUseCanvasOptions = {}): void => {
  const resolveBackground = (): string => {
    const { backgroundColor } = options;
    if (typeof backgroundColor === 'function') {
      return backgroundColor();
    }

    return backgroundColor?.value ?? 'white';
  };

  onMounted(() => {
    const canvas = canvasReference.value;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId = 0;

    // Keep the canvas background in sync with the active theme.
    watchEffect(() => {
      canvas.style.backgroundColor = resolveBackground();
    });

    const render = (): void => {
      frameCount += 1;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    const handleResize = (): void => {
      const { width, height } = canvas.getBoundingClientRect();

      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context?.scale(ratio, ratio);
      }
    };

    handleResize();
    render();
    window.addEventListener('resize', handleResize);

    onBeforeUnmount(() => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    });
  });
};
