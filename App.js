import './App.css';
import AddStudent from './Components/AddStudent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Profile from './Components/Profile';
import Student from './Components/Student';
import PageNotFound from './Components/PageNotFound.js';

function App() {
  return (
    <div className="App">
      
      <Router>
      <Header/>
        <Routes>
        <Route path="/"  element={<Student />} />
        <Route path="/AddStudents"  element={< AddStudent />} />
        <Route path="/Profile"  element={<Profile />} />
        <Route path="/PageNotFound"  element={< PageNotFound />} />

        </Routes>
      </Router>
    </div>
  );
}


export default App;
