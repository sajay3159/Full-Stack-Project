// src/reducers/dropdownReducer.ts

interface DropdownState {
  selectedOption: string;
}

const initialState: DropdownState = {
  selectedOption: '',
};

const dropdownReducer = (state = initialState, action: any): DropdownState => {
  switch (action.type) {
    case 'SELECT_OPTION':
      return { ...state, selectedOption: action.payload };
    default:
      return state;
  }
};

export default dropdownReducer;
