import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activity from "./routes/activity";
import TodoItem from "./routes/todoitem";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Activity />} />
          <Route path='/detail/:id' element={<TodoItem />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
