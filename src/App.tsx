import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddImage from "./components/AddImage";
import { UserGallery } from "./components/UserGallery";
import { AuthButtons } from "./components/AuthButtons";
import { SearchImage } from "./components/SearchImage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Title from "./components/Title";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { addUser } from "./store/actions/actions";
import { store } from ".";
import NonAuth from "./components/NonAuth";

function App() {
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataRef = doc(firestore, "usersData", localStorage.email);
      const userData = await getDoc(userDataRef);
      const data = userData.data();
      if (data) {
        store.dispatch(addUser(data));
      }
    };
    fetchUserData();
  }, [localStorage.email]);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NonAuth />} />
          <Route path="/my-gallery" element={<UserGallery />} />
          <Route path="/add-image" element={<AddImage />} />
          <Route path="/search-image" element={<SearchImage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
