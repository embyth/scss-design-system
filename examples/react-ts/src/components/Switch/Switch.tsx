import type React from 'react';
import './Switch.styles.scss';

type TSwitchProperties = {
  defaultChecked?: boolean
  onChange?: () => void
};

export const Switch: React.FC<TSwitchProperties> = ({ onChange, defaultChecked }) => (
  <label className="switch">
    <input className='switch_input' type="checkbox" checked={defaultChecked} onChange={onChange} />
    <span className="switch_slider" />
  </label>
);
