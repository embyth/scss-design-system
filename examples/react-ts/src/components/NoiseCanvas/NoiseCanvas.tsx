import { AbstractionAnimation, Config } from '../../abstraction';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useCanvas } from '../../hooks/useCanvas';
import type React from 'react';
import './NoiseCanvas.styles.scss';

const abstraction = new AbstractionAnimation();

export const NoiseCanvas: React.FC = () => {
  const { mode } = useAppTheme();
  const canvasReference = useCanvas(abstraction.draw.bind(abstraction), {
    backgroundColor: mode === 'dark' ? Config.backgroundColorDark : Config.backgroundColor,
  });

  return <canvas ref={canvasReference} className="noise-abstraction" />;
};
