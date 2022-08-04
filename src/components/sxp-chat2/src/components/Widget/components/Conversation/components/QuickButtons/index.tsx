import React from 'react';
import { useSelector } from 'react-redux';

import { GlobalState, QuickButton } from '../../../../../../../src/store/types';
import { AnyFunction } from '../../../../../../../src/utils/types';

import './style.scss';

type Props = {
  onQuickButtonClicked?: AnyFunction;
  chatId: string
}

function QuickButtons({ onQuickButtonClicked, chatId }: Props) {
  const buttons = useSelector((state: GlobalState) => state.quickButtons.quickButtons ? state.quickButtons.quickButtons[chatId] : []);

  const getComponentToRender = (button: QuickButton) => {
    const ComponentToRender = button.component;
    return (
      <ComponentToRender
        onQuickButtonClicked={onQuickButtonClicked}
        button={button}
      />
    );
  }
// if(!buttons) {
//   debugger
// }
  if (!buttons || !buttons.length) return null;

  return (
    <div className="quick-buttons-container">
      <ul className="quick-buttons">
        {buttons.map((button, index) =>
          <li className="quick-list-button" key={`${button.label}-${index}`}>
            {getComponentToRender(button)}
          </li>
        )
        }
      </ul>
    </div>
  );
}

export default QuickButtons;
