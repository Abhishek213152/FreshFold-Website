import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import UserHeader from "../components/UserHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("guest");
  const [userEmail, setUserEmail] = useState("");
  const [matchedName, setMatchedName] = useState("");
  const signOut = () => {
    auth.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://freshfold.vercel.app/api/user"
        );
        const fetchedData = response.data;
        setData(response.data);
        if (user) {
          const matched = fetchedData.filter(
            (item) => item.email === user.email
          );
          const names = matched.map((item) => item.name);
          setMatchedName(names);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        fetchData();
      }
    });

    return () => unsubscribe();
  });

  return (
    <div>
      <UserHeader />
      <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <img
                className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src="https://i.postimg.cc/hvY3hKw1/user.png"
                alt=""
              />
              <div className="py-2">
                <h3 className="font-semibold text-2xl text-gray-800 dark:text-white mb-1">
                  {matchedName}
                </h3>
              </div>
              <div className="py-2">
                <h3 className="text-xl text-gray-800 dark:text-white mb-1">
                  {user?.email}
                </h3>
              </div>
            </div>
            <div className="flex gap-2 px-2">
              <Link to="/">
                <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                  Back
                </button>
              </Link>
              <button
                onClick={signOut}
                className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-white dark:text-white px-4 py-2 bg-red-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
