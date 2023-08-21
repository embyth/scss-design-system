import { NoiseCanvas } from './components/NoiseCanvas';
import { Card } from './components/Card';
import type React from 'react';

import './App.scss';

export const App: React.FC = () => (
  <>
    <NoiseCanvas />
    <Card />
  </>
);
