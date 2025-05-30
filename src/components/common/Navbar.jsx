import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { PhoneIcon, EnvelopeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { FaFacebookF, FaHistory, FaTruck, FaTwitter, FaYoutube } from "react-icons/fa";

import {
  RiArrowDropDownLine,
  RiLoginBoxLine,
  RiUserLine,
  RiSettings3Line,
  RiLogoutBoxLine,
} from "react-icons/ri";
import {
  HomeIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  NewspaperIcon,
  InformationCircleIcon,
  UserGroupIcon,
  FlagIcon,
  ChatBubbleLeftIcon,
  TrashIcon,
  BuildingLibraryIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import logo from "../../assets/logo.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  });
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Company",
      subItems: [
        { name: "Team", path: "/team" },
        { name: "Mission", path: "/mission" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      name: "Services",
      subItems: [
        { name: "Residential Waste", path: "/services" },
        { name: "Industrial Waste", path: "/industrial" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch user data from localStorage or API
    const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   setUserData(JSON.parse(storedUser));
    // } else {
      // Set default user data
      localStorage.setItem("user", JSON.stringify(userData));
    // }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
    setSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
    toast.success("Logout successfully!!");
    setUserDropdownOpen(false);
  };

  const handleProfileNavigation = (path) => {
    navigate(path);
    setUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };
  const handleHistoryNavigation = (path) => {
    navigate(path);
    setUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header Section */}
      <header className="font-sans">
        <div className="bg-yellow-500 text-white text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-2 py-4 lg:py-2 px-4">
            {/* Contact Info */}
            <div className="w-full sm:w-auto flex-1">
              <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
                <div className="relative overflow-x-auto sm:overflow-visible flex-1">
                  <div className="flex items-center gap-3 sm:gap-4 animate-scroll-x sm:animate-none whitespace-nowrap w-max">
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <div className="relative">
                        <PhoneIcon className="w-4 h-4 text-black animate-pulse-slow" />
                        <div className="absolute -inset-1 border-2 border-yellow-300 rounded-full animate-ripple-continuous" />
                      </div>
                      <span className="flex items-center gap-1">
                        <b className="hidden xs:inline">Call Free:</b>
                        0761-8523-398
                      </span>
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <div className="relative">
                        <EnvelopeIcon className="w-4 h-4 text-black animate-pulse-slow" />
                        <div className="absolute -inset-1 border-2 border-yellow-300 rounded-full animate-ripple-continuous" />
                      </div>
                      <span className="flex items-center gap-1">
                        hello@domainsite.com
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile Social Icons */}
                <div className="flex gap-2 sm:hidden">
                  {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="p-1 rounded transition-colors duration-300 bg-white hover:bg-blue-600"
                    >
                      <Icon className="w-3 h-3 text-blue-600 hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Social Icons */}
            <div className="hidden sm:flex gap-2 lg:ml-4">
              {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-1.5 rounded transition-colors duration-300 bg-white hover:bg-blue-600"
                >
                  <Icon className="w-4 h-4 text-blue-600 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Section */}
      <div className="bg-white shadow-sm py-2 lg:py-4 px-4 sm:px-6 flex justify-between items-center relative">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-[#e4a400]" />
          ) : (
            <Bars3Icon className="h-10 w-10 text-[#e4a400]" />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-[#E4a400] transition-colors"
        >
          <img className="h-14 w-20" src={logo} alt="Company Logo" />
        </Link>

        <nav className="flex items-center space-x-6 lg:hidden">
          {/* Mobile Cart */}
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-500 transition-colors">
            <ShoppingBagIcon className="h-6 w-6" />
          </Link>
          
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <RiLoginBoxLine className="text-xl" />
            </Link>
          ) : (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 text-gray-800 hover:text-green-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center">
                  <RiUserLine className="text-lg" />
                </div>
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-5 w-48 bg-white border rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{userData.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                  </div>
                  <button
                    onClick={() => handleProfileNavigation("/user/profile")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <RiUserLine className="text-lg" /> My Profile
                  </button>
                 
                  <button
                    onClick={() => handleProfileNavigation("/user/dashboard")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaTruck className="text-lg" />  Dashboard
                  </button>
                  <button
                    onClick={() => handleHistoryNavigation("/user/History")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaHistory className="text-lg" /> Booking History
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <RiLogoutBoxLine className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-8 relative z-[99] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          ref={dropdownRef}
        >
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.subItems ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                    className="flex items-center gap-1 text-gray-600 hover:text-[#E4a400] transition-colors"
                  >
                    {item.name}
                    <RiArrowDropDownLine
                      className={`text-xl transition-transform duration-300 ${
                        openDropdown === item.name ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-3 pt-2 min-w-[200px] animate-dropdownFade">
                      <div className="absolute -top-2 left-4 w-3 h-3 bg-white border-t border-l border-gray-200 rotate-45 z-20 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]" />
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-10">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block px-4 py-3 text-sm relative hover:bg-green-50 transition-colors after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-gray-100 hover:after:opacity-0 group/item"
                          >
                            {subItem.name}
                            <span className="absolute bottom-0 left-0 right-0 h-px bg-green-500 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 hover:text-gray-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-green-500 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex items-center transition-all duration-300"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-gray-100 rounded-full py-2 pr-4 transition-all duration-300 ${
                  searchOpen ? "w-48 pl-4 opacity-100" : "w-0 pl-0 opacity-0"
                } outline-none focus:ring-2 focus:ring-green-500`}
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (!searchOpen) {
                    setTimeout(
                      () => searchRef.current.querySelector("input").focus(),
                      50
                    );
                  }
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors -ml-10"
              >
                <MagnifyingGlassIcon
                  className={`h-6 w-6 ${
                    searchOpen ? "text-green-500" : "text-gray-600"
                  } transition-colors`}
                />
              </button>
            </form>
          </div>

          {/* Desktop Shopping Cart */}
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-500 transition-colors">
            <ShoppingBagIcon className="h-6 w-6" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <RiLoginBoxLine className="text-xl" />
              </Link>
            ) : (
             <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 text-gray-800 hover:text-green-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center">
                  <RiUserLine className="text-lg" />
                </div>
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-7 w-48 bg-white border rounded-md shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{userData.name}</p>
                    <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                  </div>
                  <button
                    onClick={() => handleProfileNavigation("/user/profile")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <RiUserLine className="text-lg" /> My Profile
                  </button>
                 
                  <button
                    onClick={() => handleProfileNavigation("/user/dashboard")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaTruck className="text-lg" />  Dashboard
                  </button>
                  <button
                    onClick={() => handleHistoryNavigation("/user/History")}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaHistory className="text-lg" /> Booking History
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <RiLogoutBoxLine className="text-lg" /> Logout
                  </button>
                </div>
              )}
            </div>
            )}
          </nav>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" />
        )}

        {/* Mobile Menu Content */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-[#E4a400] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img className="h-14 w-20" src={logo} alt="Company Logo" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* User Profile Section in Mobile Menu */}
            {isLoggedIn && (
              <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed overflow-hidden">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="User" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RiUserLine className="w-full h-full p-2 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-sm text-gray-500">{userData.email}</p>
                </div>
              </div>
            )}

            <nav className="flex-1 space-y-4 overflow-y-auto">
              <Link
                to="/booking"
                className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-[#E4A400]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <TruckIcon className="w-5 h-5" />
                <span>Request Pickup</span>
              </Link>

              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 pb-4">
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() =>
                          setOpenMobileSubmenu(
                            openMobileSubmenu === item.name ? null : item.name
                          )
                        }
                        className="flex justify-between items-center w-full text-gray-600 hover:text-[#E4a400]"
                      >
                        <div className="flex items-center gap-2">
                          {item.name === "Home" && (
                            <HomeIcon className="w-5 h-5" />
                          )}
                          {item.name === "Company" && (
                            <BuildingOfficeIcon className="w-5 h-5" />
                          )}
                          {item.name === "Services" && (
                            <WrenchScrewdriverIcon className="w-5 h-5" />
                          )}
                          {item.name === "Blog" && (
                            <NewspaperIcon className="w-5 h-5" />
                          )}
                          {item.name === "Shop" && (
                            <ShoppingBagIcon className="w-5 h-5" />
                          )}
                          {item.name === "About" && (
                            <InformationCircleIcon className="w-5 h-5" />
                          )}
                          <span>{item.name}</span>
                        </div>
                        <RiArrowDropDownLine
                          className={`text-xl transform transition-transform ${
                            openMobileSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openMobileSubmenu === item.name && (
                        <div className="pl-4 mt-2 space-y-3">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="flex items-center gap-2 text-gray-600 hover:text-[#E4a400]"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name === "Team" && (
                                <UserGroupIcon className="w-5 h-5" />
                              )}
                              {subItem.name === "Mission" && (
                                <FlagIcon className="w-5 h-5" />
                              )}
                              {subItem.name === "Contact" && (
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                              )}
                              {subItem.name === "Residential Waste" && (
                                <TrashIcon className="w-5 h-5" />
                              )}
                              {subItem.name === "Industrial Waste" && (
                                <BuildingLibraryIcon className="w-5 h-5" />
                              )}
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#E4a400]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name === "Home" && <HomeIcon className="w-5 h-5" />}
                      {item.name === "Blog" && (
                        <NewspaperIcon className="w-5 h-5" />
                      )}
                      {item.name === "Shop" && (
                        <ShoppingBagIcon className="w-5 h-5" />
                      )}
                      {item.name === "About" && (
                        <InformationCircleIcon className="w-5 h-5" />
                      )}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Profile Actions */}
              {isLoggedIn && (
                <div className="mt-4 border-t pt-4">
                  <button
                    onClick={() => handleProfileNavigation("/profile")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#E4a400] w-full"
                  >
                    <RiUserLine className="w-5 h-5" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => handleProfileNavigation("/settings")}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#E4a400] w-full"
                  >
                    <RiSettings3Line className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 w-full"
                  >
                    <RiLogoutBoxLine className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}