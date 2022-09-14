import { createReducer } from '../../utils/createReducer';
import { createQuickButton } from '../../utils/messages';
import { SET_QUICK_BUTTONS, QuickButtonsActions } from '../actions/types';
import { QuickButtonsState, QuickButton } from '../types'

const quickButtonsReducer = {
  [SET_QUICK_BUTTONS]: (_: QuickButtonsState, { buttons, widgetId }) =>
    ({ quickButtons: { [widgetId]: [...buttons.map((button: QuickButton) => createQuickButton(button))] } })
}

export default (state = {}, action: QuickButtonsActions) => createReducer(quickButtonsReducer, state, action);
