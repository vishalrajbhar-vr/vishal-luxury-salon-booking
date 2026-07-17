import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaSignOutAlt, FaCog, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import BookingModal from "./BookingModal";
import logo from "../../assets/logo.png";

const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5opVz37NwOdXal9H5Xa-UMlDvne9QXhgt_udOU42Mw&s=10";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      return !!(token && user);
    } catch {
      return false;
    }
  });
  const [profile, setProfile] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return { name: user?.name || "User", image: user?.image || defaultImage };
    } catch {
      return { name: "User", image: defaultImage };
    }
  });

  const accountRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTopIfSamePage = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        setIsLoggedIn(true);
        setProfile({ name: user.name || "User", image: user.image || defaultImage });
      } else {
        setIsLoggedIn(false);
        setProfile({ name: "User", image: defaultImage });
      }
    } catch {
      setIsLoggedIn(false);
      setProfile({ name: "User", image: defaultImage });
    }
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, [checkAuth]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setProfile({ name: "User", image: defaultImage });
    window.dispatchEvent(new Event("authChange"));
    setIsOpen(false);
    setAccountOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-red-700 bg-black text-white">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" onClick={() => scrollToTopIfSamePage("/")} className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full object-contain shadow-[0_0_20px_rgba(150,0,11,1)] sm:h-16 sm:w-16 md:relative md:top-6 md:h-24 md:w-24"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <Link to="/" onClick={() => scrollToTopIfSamePage("/")} className="transition duration-300 hover:text-red-500">Home</Link>
            <Link to="/services" onClick={() => scrollToTopIfSamePage("/services")} className="transition duration-300 hover:text-red-500">Services</Link>
            <Link to="/booking" onClick={() => scrollToTopIfSamePage("/booking")} className="transition duration-300 hover:text-red-500">Book Appointment</Link>
            <Link to="/gallery" onClick={() => scrollToTopIfSamePage("/gallery")} className="transition duration-300 hover:text-red-500">Gallery</Link>
            <Link to="/contact" onClick={() => scrollToTopIfSamePage("/contact")} className="transition duration-300 hover:text-red-500">Contact</Link>

            {/* Account Section - Click Based */}
            <div className="relative" ref={accountRef}>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 transition hover:bg-zinc-700"
                  >
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-red-600"
                    />
                    <span className="max-w-[100px] truncate font-medium">{profile.name}</span>
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-3 w-52 rounded-xl border border-zinc-700 bg-zinc-950/95 p-2 shadow-2xl backdrop-blur">
                      <div className="flex items-center gap-3 px-3 py-3 border-b border-zinc-800">
                        <img
                          src={profile.image}
                          alt={profile.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-red-600"
                        />
                        <div>
                          <p className="font-semibold text-white truncate">{profile.name}</p>
                          <p className="text-xs text-zinc-400">Premium Member</p>
                        </div>
                      </div>

                      <Link
                        to="/myprofile"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                      >
                        <FaUserCircle /> My Profile
                      </Link>

                      <Link
                        to="/myappointments"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                      >
                        <FaCalendarAlt /> My Appointments
                      </Link>

                      {/* <Link
                        to="/ChangePassword"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                      >
                        <FaCog /> Change Password
                      </Link> */}

                      <div className="border-t border-zinc-800 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition w-full"
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAccountOpen((prev) => !prev)}
                    className="flex items-center gap-2 rounded-lg border border-red-600 bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 sm:px-5"
                  >
                    <FaUser /> Account
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-3 w-32 rounded-xl border border-red-700 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur">
                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-red-600 hover:text-white"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setAccountOpen(false)}
                        className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-200 transition hover:bg-red-600 hover:text-white"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-700 text-2xl text-white md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="flex flex-col gap-4 border-t border-zinc-800 py-5 md:hidden">
            <Link to="/" onClick={() => { setIsOpen(false); scrollToTopIfSamePage("/"); }} className="hover:text-red-500">Home</Link>
            <Link to="/services" onClick={() => { setIsOpen(false); scrollToTopIfSamePage("/services"); }} className="hover:text-red-500">Services</Link>
            <Link to="/booking" onClick={() => { setIsOpen(false); scrollToTopIfSamePage("/booking"); }} className="hover:text-red-500">Appointment Booking</Link>
            <Link to="/gallery" onClick={() => { setIsOpen(false); scrollToTopIfSamePage("/gallery"); }} className="hover:text-red-500">Gallery</Link>
            <Link to="/contact" onClick={() => { setIsOpen(false); scrollToTopIfSamePage("/contact"); }} className="hover:text-red-500">Contact</Link>

            <div className="pt-2 border-t border-zinc-800">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 mb-2">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-red-600"
                    />
                    <div>
                      <p className="font-semibold text-white">{profile.name}</p>
                      <p className="text-xs text-zinc-400">Premium Member</p>
                    </div>
                  </div>

                  <Link
                    to="/myprofile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                  >
                    <FaUserCircle /> My Profile
                  </Link>

                  <Link
                    to="/myappointments"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                  >
                    <FaCalendarAlt /> My Appointments
                  </Link>

                  {/* <Link
                    to="/ChangePassword"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition"
                  >
                    <FaCog /> Change Password
                  </Link> */}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-sm text-zinc-200 hover:bg-red-600 hover:text-white transition w-full"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full rounded-lg border border-red-600 bg-red-600 px-4 py-2 text-left text-sm text-white hover:bg-red-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 block w-full rounded-lg border border-red-600 px-4 py-2 text-left text-sm text-white hover:bg-red-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </nav>
  );
}

export default Navbar;
