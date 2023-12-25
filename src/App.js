import logo from "./logo.svg";
import { Outlet, Route, Routes } from "react-router-dom";
import Initpage from "./Pages/Initpage";
import Mainpage from "./Pages/Mainpage";
import Loadingpage from "./Pages/Loadingpage";
import Searchpage from "./Pages/Searchpage";
import Parsingpage from "./components/parsing";
import Nav from "./Pages/nav";
import Foot from "./Pages/footer";
import "./App.css";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Foot />
      {/* outlet부분에 child component rendering 
      여기선 outlet 다른 nav comp등이 없기에 굳이 필요 X*/}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Initpage />} />
          <Route path="main" element={<Mainpage />} />
          <Route path="loading" element={<Loadingpage />} />
          <Route path="search" element={<Searchpage />} />
          <Route path="parsing" element={<Parsingpage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
