import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOption } from '../services/action/DropdownAction';
interface RootState {
  dropdown: {
    selectedOption: string;
  };
}

const Dropdown: React.FC = () => {
  const selectedOption = useSelector((state: RootState) => state.dropdown.selectedOption);
  const dispatch = useDispatch();

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    // console.log(12,event)
    dispatch(selectOption(selectedValue));
  };

  return (
    <div>
      <h2>Redux Dropdown</h2>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="Mathmatics">Mathmatics</option>
        <option value="History">History</option>
        <option value="Science">Science</option>
      </select>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Dropdown;






