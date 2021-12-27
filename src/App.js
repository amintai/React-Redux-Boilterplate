import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes , Route, Link } from "react-router-dom";
import TutorialsList from './components/TutorialsList';
import Tutorial from './components/Tutorial';
import Students from './components/Students';

function App() {
  return (
    <BrowserRouter>
        <nav>
        <div>
          <li>
            <Link to={"/tutorials"}>
              Tutorials
            </Link>
          </li>
          
          <li>
            <Link to={"/todos"}>
              Todos
            </Link>
          </li>
        </div>
      </nav>
    <div className="App">
      <Routes>
        <Route  path="/tutorials" element={<TutorialsList />} />
        <Route path="/tutorials/:id" element={<Tutorial />}/>
        <Route path="/todos" element={<Students />} />
      </Routes>
    {/* <TutorialsList /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
