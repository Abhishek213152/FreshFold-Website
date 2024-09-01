import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { auth } from "./firebase";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { BallTriangle } from "react-loader-spinner";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import Pickup from "./screens/Pickup";
import Cart from "./screens/Cart";
import Pay from "./screens/Pay";
import Success from "./screens/Success";
import Cancel from "./screens/Cancel";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BallTriangle color="#333" height={64} width={64} />
      </div>
    );
  }


  return (
    <Provider store={store}>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pickup" element={<Pickup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Provider>
  );
};

export default App;
