import { useCanvas } from '../../hooks/useCanvas';
import { Config, AbstractionAnimation } from './abstraction';
import type React from 'react';
import { useAppTheme } from '../../hooks/useAppTheme';
import "./NoiseCanvas.styles.scss";

const abstraction = new AbstractionAnimation();

export const NoiseCanvas: React.FC = () => {
  const { mode } = useAppTheme();
  const canvasReference = useCanvas(abstraction.draw.bind(abstraction), {
    backgroundColor: mode === 'dark' ? Config.backgroundColorDark : Config.backgroundColor
  });

  return (
    <canvas ref={canvasReference} className="noise-abstraction" />
  );
};
