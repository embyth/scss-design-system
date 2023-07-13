/* eslint-disable unicorn/filename-case */
import type React from 'react';

import './App.scss';

const App: React.FC = () => (
  <div className='app-container'>
    <div className='gradient-container'>
      <div className='gradient-root'></div>
    </div>
    <div className='app-content'>
      <h1 className='title'>SASS Design System</h1>
      <p className='paragraph'>
        This design system is a collection of pre-built, reusable assets—components, patterns, guidance, and code—that allows its users to build consistent digital experiences faster. By using the pre-built and universal assets, the time teams spend designing and building is minimized. Instead of building and re-building basic elements, they can spend that time customizing their products to address specific client use cases.
      </p>
    </div>
  </div>
);

export default App;
