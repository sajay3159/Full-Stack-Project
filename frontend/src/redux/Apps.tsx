import React from 'react';
import '../App'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './services/reducer/indexs';
import Dropdown from './components/Dropdown';
import MyLineChart from '../redux/graph/MyLineChart';
import MyPieChart from '../redux/graph/MyPieChart';

const store = createStore(rootReducer);

const Apps: React.FC = () => {
  return (
    <Provider store={store}>
      <div className='App'>
        <Dropdown />
        <MyLineChart/>
        <MyPieChart/>
      </div>
    </Provider>
  );
};

export default Apps;

