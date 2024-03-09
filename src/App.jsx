import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './App.css'
import Auth from './components/pages/Auth/Index'
import Home from './components/pages/Home'
import Settings from './components/pages/Settings'
import Followers from './components/pages/Followers'
import { Route, Routes } from 'react-router-dom'
import Followings from './components/pages/Following'
import FindFollowers from "./components/pages/FindFollowers";

function App() {
  /*
const counterRedux = useSelector((state) => state.counter);
  const showCounterRedux = useSelector((state) => state.showCounter);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    dispatch({
      type: "increment",
    });
  };

  const decrementCounter = () => {
    dispatch({
      type: "decrement",
    });
  };

  const showCounterHandler = () => {
    dispatch({
      type: "show",
    });
  };
  */

  return (
    <>
    { /*
  <>
      {showCounterRedux && <h1>{counterRedux}</h1>}

      <div className="container">
        <button onClick={incrementCounter}>Increment</button>
        <button onClick={decrementCounter}>Decrement</button>
        <button onClick={showCounterHandler}>{showCounterRedux ? "show Counter": "Hide Counter"}</button>
      </div>
    </> */}

    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path=":id" element={<Home />} />
        <Route path="/home">
          <Route index element={<Home />} />
          <Route path=":paramId" element={<Home />} />
          <Route path="followings" element={<Followings />} />
          <Route path="followers" element={<Followers />} />
          <Route path="findFollowers" element={<FindFollowers/>} />
        </Route>
        <Route path="/setting" element={<Settings />} />
      </Routes>
      </>
    
  );
}

export default App
