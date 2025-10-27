import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./pages/Body";
import Login from "./pages/Login"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login/>} />
            {/* we need to add <Outlet/> in <Body/> file for using the children */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
