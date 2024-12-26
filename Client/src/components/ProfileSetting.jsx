import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeContext } from "../reducers/homeReducer";
import axios from "axios";

function ProfileSetting({ close }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Tracks whether we are in edit mode
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const profileRef = useRef(null);
  const { user, editProfile } = useHomeContext();

  const [editData, setEditData] = useState({
    img: user?.img,
    phone: user?.phone,
    name: user?.name,
    email: user?.email,
  });

  const [img, setImg] = useState(
    user?.img ||
      "https://www.wrestlinginc.com/img/gallery/bully-ray-lays-out-how-the-bloodline-must-respond-to-roman-reigns-return-to-wwe/intro-1723042647.jpg"
  );

  // Trigger the transition when the component is mounted
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // Slight delay to trigger smooth transition
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        close(); // Call the `close` function when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  const handlePortfolioClick = () => {
    navigate("/portfolio");
    close();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
      editData.img = imageUrl;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      window.location.href = "/";
      setIsVisible(false);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleBackClick = () => {
    setIsEditing(false); // Return to main menu
  };

  const handleSaveChanges = () => {
    console.log(editData);
    editProfile(editData)
  };

  return (
    <div
      ref={profileRef} // Reference to the profile settings container
      className={`w-[30%] h-auto pb-5 rounded-lg bg-neutral-950 border-2 border-gray-800 border-opacity-35 absolute right-0 transition-all duration-500 z-50 bg-opacity-100 ${
        isVisible ? "translate-x-0" : "translate-x-full hidden"
      }`}
    >
      {!isEditing ? (
        <>
          {/* PROFILE */}
          <div className="h-[15vh] flex items-center justify-start px-5 gap-2">
            <div className="w-20 h-20 bg-gray-600 rounded-full">
              <img src={img} alt="" className="w-full h-full rounded-full" />
            </div>
            <div className="w-[70%] h-[80%] flex justify-center flex-col">
              <p className="text-xl">
                Hello,{" "}
                {user?.name || `user@${Math.random().toFixed(5) * 10 ** 5}`}
              </p>
              <p className="text-sm text-neutral-200">{user?.email}</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="h-[10vh] w-[90%] my-2 bg-neutral-800 rounded-3xl mx-auto flex justify-center">
            <button
              className="border-r border-neutral-900 hover:bg-neutral-900 hover:bg-opacity-10 rounded-l-3xl w-full"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
            <button
              className="border-l border-neutral-900 hover:bg-neutral-900 hover:bg-opacity-10 rounded-r-3xl w-full"
              onClick={handlePortfolioClick}
            >
              Your Portfolio
            </button>
          </div>

          {/* MORE OPTIONS */}
          <div className="h-auto w-[90%] flex-col flex items-start gap-3 mx-auto px-3">
            <a
              className="hover:bg-opacity-10 w-full rounded-2xl flex items-center hover:bg-neutral-500 text-left h-10 px-5"
              href={"https://github.com/mr21sanger/cryptoTracker"}
              target="_blank"
            >
              Get Source Code
            </a>
            <button
              className="hover:bg-opacity-10 w-full rounded-2xl hover:bg-neutral-500 text-left h-10 px-5"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        /* Edit Profile Section */
        <div className="h-screen my-5 transition-all duration-300  w-[90%] mx-auto px-3 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Edit Profile</h2>
            <button
              className="text-lg text-gray-400 hover:underline"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <img
                src={img}
                alt="Profile"
                className="w-36 h-36 rounded-full mx-auto object-cover border-2 border-neutral-800 cursor-pointer hover:opacity-80 transition-all duration-200"
                onClick={handleImageClick} // Open file input on image click
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white"
                placeholder="Enter your name"
                value={editData.name}
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white"
                placeholder="Enter your email"
                value={editData.email}
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="number"
                className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white"
                placeholder="1234567890"
                value={editData.phone}
                maxLength={10}
                minLength={10}
                onChange={(e) => {
                  setEditData({
                    ...editData,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <button
              className="w-full py-2 my-2 bg-orange-500 text-black font-bold rounded-md hover:bg-orange-700 transition-all duration-300"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSetting;
