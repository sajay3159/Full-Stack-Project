import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Apps from './redux/Apps';
import MuiForms from './components/MuiForms';
import StudentList from './components/StudentList';
// import Mi from './components/Mi';

function App() {
  return (
   <div className="App">
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/create" element={<MuiForms/>}/>
    <Route path="/update/:id" element={<MuiForms/>}/>
    <Route path="/list" element={<StudentList/>}/>
    <Route path="/dropdown" element={<Apps/>}/>
    {/* <Route path="/mi" element={<Mi/>}/> */}
  </Routes>
    </div>
  );
}

export default App;
