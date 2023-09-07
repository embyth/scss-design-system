import { useEffect, useRef } from 'react';

type TUseCanvasOutput = (
  draw: (context: CanvasRenderingContext2D | null, frameCount: number) => void,
  options?: {
    backgroundColor?: string;
  },
) => React.RefObject<HTMLCanvasElement>;

export const useCanvas: TUseCanvasOutput = (draw, options = {}) => {
  const canvasReference = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasReference.current;
    let animationFrameId: number;

    if (canvas) {
      canvas.style.backgroundColor = options.backgroundColor || 'white';
      const context = canvas.getContext('2d');
      let frameCount = 0;

      const render = () => {
        frameCount += 1;
        draw(context, frameCount);
        animationFrameId = window.requestAnimationFrame(render);
      };

      render();
    }

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [draw, options.backgroundColor]);

  useEffect(() => {
    const windowResizeHandler = () => {
      const canvas = canvasReference.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext('2d');
      const { width, height } = canvas.getBoundingClientRect();

      if (canvas.width !== width || canvas.height !== height) {
        const { devicePixelRatio: ratio = 1 } = window;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        context?.scale(ratio, ratio);
      }
    };
    windowResizeHandler();

    window.addEventListener('resize', windowResizeHandler);

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);

  return canvasReference;
};
