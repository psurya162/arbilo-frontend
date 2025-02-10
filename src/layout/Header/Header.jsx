import React, { useState, useEffect } from 'react';
import { IoMdLogIn, IoMdMenu, IoMdClose } from 'react-icons/io';
import { Transition } from '@headlessui/react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <aside className="announcement-bar">
        <div className="main-container">
          <div className="announcement-contents">
            <div className="announcement-text-copy">
              ✹ Limited-Time Offer: Huge Discount for the First 250 Subscribers!              -&gt; &nbsp;
              <Link  to="pricing-section"
                    smooth={true}
                    duration={500}
                     className=" cursor-pointer nav-item notification_link nav-link hover:underline">View All Prices</Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Navigation Bar */}
      <nav className={`text-white p-4 transition-all duration-300 z-10 ${isSticky ? 'sticky top-0 bg-white shadow-lg' : ''}`}>
        <div className="flex justify-between items-center">
          {/* Logo and Links */}
          <div className="flex items-center gap-3">
            <Link to="home-section" smooth={true} duration={500}>
              <img
                src="/assets/images/logo2.png"
                alt="company_logo"
                loading="lazy"
                className="w-32 md:w-20 cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex">
              <ul className="flex gap-4">
                <li>
                  <Link
                    to="Signals-section"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    Signals
                  </Link>
                </li>
                <li>
                  <Link
                    to="how-it-works-section"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="pricing-section"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="faq-section"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="tips"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    Tips
                  </Link>
                </li>

                <li>
                  <Link
                    to="contact-section"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer nav-item"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4">
              <button onClick={handleSignupClick} className="bg-black text-white border-2 border-gray-300 rounded-md p-2 md:p-2 flex items-center hover:bg-slate-300 hover:text-black">
                Sign up<IoMdLogIn className="ml-2" />
              </button>
              <button onClick={handleLoginClick} className="bg-white text-black border-2 border-gray-300 rounded-md p-2 md:p-2 flex items-center hover:bg-slate-300 hover:text-black">
                Log In <IoMdLogIn className="ml-2" />
              </button>
            </div>
            <button className="md:hidden text-black" onClick={toggleDrawer}>
              {isDrawerOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <Transition
          show={isDrawerOpen}
          enter="transition-transform duration-300 ease-in-out"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300 ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="fixed inset-0 z-40"
          as="div"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleDrawer}></div>
          <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg p-6 z-50">
            <button onClick={toggleDrawer} className="text-black mb-4">
              <IoMdClose size={24} />
            </button>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="home-section"
                  smooth={true}
                  duration={500}
                  onClick={toggleDrawer}
                  className="cursor-pointer nav-item"
                >
                  Signals
                </Link>
              </li>
              <li>
                <Link
                  to="how-it-works-section"
                  smooth={true}
                  duration={500}
                  onClick={toggleDrawer}
                  className="cursor-pointer nav-item"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="pricing-section"
                  smooth={true}
                  duration={500}
                  onClick={toggleDrawer}
                  className="cursor-pointer nav-item"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="faq-section"
                  smooth={true}
                  duration={500}
                  onClick={toggleDrawer}
                  className="cursor-pointer nav-item"
                >
                  FAQs
                </Link>
              </li>
              <li>
                  <Link
                    to="tips"
                    smooth={true}
                    duration={500}
                    onClick={toggleDrawer}
                    className="cursor-pointer nav-item"
                  >
                    Tips
                  </Link>
                </li>
              <li>
                <Link
                  to="contact-section"
                  smooth={true}
                  duration={500}
                  onClick={toggleDrawer}
                  className="cursor-pointer nav-item"
                >
                  Contact Us
                </Link>
              </li>
              <li className="md:hidden">
                <button onClick={handleSignupClick} className="bg-black text-white border-2 border-gray-300 rounded-md p-2 flex items-center hover:bg-slate-300 hover:text-black">
                  Sign up<IoMdLogIn className="ml-2" />
                </button>
              </li>
              <li className="md:hidden">
                <button onClick={handleLoginClick} className="bg-white text-black border-2 border-gray-300 rounded-md p-2 flex items-center hover:bg-slate-300 hover:text-black">
                  Log In <IoMdLogIn className="ml-2" />
                </button>
              </li>
            </ul>
          </div>
        </Transition>
      </nav>
    </>
  );
};

export default Header;