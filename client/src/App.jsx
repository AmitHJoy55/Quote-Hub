import { Footer } from "./sections";
import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Motivational from "./Pages/Motivational";
import Romantic from "./Pages/Romatic";
import Funny from "./Pages/Funny";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
  <>
    <BrowserRouter>
      <Nav />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/motivational-quotes" element={<Motivational />} />
        <Route path="/romantic-quotes" element={<Romantic />} />
        <Route path="/funny-quotes" element={<Funny />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
