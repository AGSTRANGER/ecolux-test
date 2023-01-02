import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import rootReducer from "./reducers";

import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Regions from "./components/Regions";
import Products from "./components/Products";
import Orders from "./components/Orders";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <App> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>

        {/* </App> */}
      </Router>
    </Provider>
  );
}

export default App;
