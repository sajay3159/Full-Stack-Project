import { combineReducers } from 'redux';
import dropdownReducer from './DropdownReducer';

const rootReducer = combineReducers({
  dropdown: dropdownReducer,
});

export default rootReducer;