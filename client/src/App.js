import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import rootReducer from "./reducers";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Regions from "./components/Regions";
import Products from "./components/Products";
import Orders from "./components/Orders";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <AppHeader />
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/regions" component={Regions} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <AppFooter />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
