import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import Modal from "./Modal";
import LoginCont from "./LoginCont";
import { useHomeContext } from "../reducers/homeReducer";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileSetting from "./ProfileSetting";
import { useCryptoReducer } from "../reducers/cryptoReducer";

function Navbar() {
  const [query, setQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showProfileSetting, setShowProfileSetting] = useState(false);
  const { isLoggedIn, user } = useHomeContext();
  const { showModal, hideLoginModal } = useCryptoReducer();

  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchFocus = () => {
    setShowSearchBox(true);
  };

  const handleSearchBlur = (e) => {
    // Prevent hiding when clicking on the search button
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowSearchBox(false);
    }
  };

  const handleClick = () => {
    setShowSearchBox(!showSearchBox);
  };

  const handleLoginClick = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const handleProfileClick = () => {
    setShowProfileSetting(!showProfileSetting);
  };

  useEffect(() => {
    setShowLoginModal(showModal);
  }, [showModal]);

  const closeModal = () => {
    hideLoginModal();
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setShowLoginModal(false);
    }
  }, [isLoggedIn]);

  const handleSearch = (val) => {
    setQuery(val);
  };

  return (
    <>
      <div className="w-full bg-black bg-opacity-85 h-[5em] py-2 border-b-2 hidden md:flex justify-around items-center">
        {/* LOGO */}
        <NavLink
          to={"/"}
          className="w-[15%] text-white font-mono font-bold text-4xl text-center italic flex items-center logoName"
        >
          <img
            src="src/background/Untitled_design-removebg-preview.png"
            alt=""
            className="h-16 mt-"
          />
        </NavLink>

        {/* SEARCHBAR */}
        <div
          className="w-[30%] bg-whit gap-5 relative"
          onBlur={handleSearchBlur}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full bg-red-0 flex items-center justify-start gap-2 h-full transition-all duration-300"
          >
            <input
              type="search"
              name="search"
              id="search"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleSearchFocus}
              className={`bg-neutral-400 bg-opacity-30 h-[1.5em] rounded p-5 text-lg font-semibold transition-all duration-300 ${
                showSearchBox ? "w-[78%] rounded-r-none" : "w-[70%]"
              }`}
              placeholder="Search here..."
            />
            <button
              type="submit"
              className={`bg-white text-black font-bold text-xl py-1.5 px-6 rounded rounded-l-none transition-all duration-300 absolute right-0 transform ${
                !showSearchBox
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
              onClick={() => navigate(`/detail/${query}`)}
            >
              Search
            </button>
          </form>
        </div>

        {/* LOGIN AND SIGNUP BUTTONS */}
        {!isLoggedIn && (
          <div className="w-[20%] flex gap-2 items-center justify-center">
            <button
              className="w-[50%] text-white hover:underline h-[80%] rounded text-xl font-bold "
              onClick={handleLoginClick}
            >
              Login/Signup
            </button>
          </div>
        )}

        {/* PROFILE SECTION */}
        {isLoggedIn && (
          <div className="flex w-[30%] gap-5 justify-end items-center">
            <div>
              <NavLink
                to={"/portfolio"}
                className="text-lg hover:underline underline-offset-4"
              >
                Your Portfolio
              </NavLink>
            </div>
            <button
              className="text-lg hover:underline underline-offset-4"
              onClick={handleProfileClick}
            >
              hii, {user?.name?.toUpperCase()}
            </button>
            <div>
              <img
                className="w-14 h-14 rounded-full object-cover border-2"
                src={user?.img}
                alt="Rounded avatar"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-auto py-2 border-b-2 px-3 transition-all duration-300 md:hidden">
        <div className="w-full flex justify-between ">
          {/* LOGO */}
          <div className="w-[50vw] py-1">
            <h1 className="text-xl italic">CryptoStalker</h1>
          </div>
          {/* SEARCH BUTTON AND OPTIONS BUTTON */}
          <div className="flex gap-2">
            <button
              className=" p-2 text-xl text-black bg-white rounded-full "
              onClick={handleClick}
            >
              {!showSearchBox ? <FaSearch /> : <RxCross2 />}
            </button>

            {/* OPTIONS BUTTON */}

            <button
              className=" p-2 text-xl text-black bg-white rounded-full "
              onClick={handleOptionsClick}
            >
              {showOptions ? <RxCross2 /> : <FaBars />}
            </button>
          </div>
        </div>
        {showSearchBox ? (
          <div className="w-full h-[3em] ">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center gap-2 h-full"
            >
              <input
                type="search"
                name="search"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white bg-opacity-30 w-[80%] h-[2em] rounded hover:ring-2 hover:ring-white p-2 ml-2 font-medium"
                placeholder="Search here..."
              />
              <button
                type="submit"
                className="bg-white hover:bg-gray-200 text-black font-bold text-base py-1
                 px-2 rounded"
              >
                Search
              </button>
            </form>
          </div>
        ) : null}
      </div>
      {showOptions && (
        <div className="h-auto border-b-2 py-2 md:hidden">
          <ul>
            <li className="w-[90%] text-center mx-auto text-xl my-2">Home</li>
            <li className="w-[90%] text-center mx-auto text-xl my-2">
              Profile
            </li>
            <li className="w-[90%] text-center mx-auto text-xl my-2">
              Settings
            </li>
            <li className="w-[90%] text-center mx-auto text-xl my-2">
              Login/signup
            </li>
            <li className="w-[90%] text-center mx-auto text-xl my-2">LogOut</li>
          </ul>
        </div>
      )}

      {showLoginModal && (
        <Modal
          onclose={() => setShowLoginModal(false)}
          children={<LoginCont />}
        />
      )}

      {showProfileSetting && <ProfileSetting close={handleProfileClick} />}
    </>
  );
}

export default Navbar;
