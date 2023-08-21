import { useAppTheme } from "../../hooks/useAppTheme";
import { Counter } from "../Counter";
import { GitHub } from "../GitHub/GitHub";
import { Switch } from "../Switch";
import "./Card.styles.scss";

export const Card: React.FC = () => {
  const { toggle, mode } = useAppTheme();

  const buttonClickHandler = () => {
    window.open('https://github.com/embyth/scss-design-system', '_blank');
  };

  return (
    <div className='app-container'>
      <div className='app-content'>
        <div className="card">
          <h1 className='card_title'>SASS Design System</h1>
          <p className='card_paragraph'>
            This design system is a collection of pre-built, reusable assets—components,
            patterns, guidance, and code—that allows its users to build
            consistent digital experiences faster.
            By using the pre-built and universal assets, the time teams spend
            designing and building is minimized.
            Instead of building and re-building basic elements, they can spend
            that time customizing their products to address specific client use cases.
          </p>
          <div className="card_controls">
            <Switch onChange={toggle} defaultChecked={mode === 'dark'} />
            <Counter />
            <GitHub onClick={buttonClickHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};
