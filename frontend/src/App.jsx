import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Sendmoney from "./pages/Sendmoney";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import HeroSection from "./pages/HeroSection";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element = {<HeroSection/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/sendmoney" element={<Sendmoney/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
