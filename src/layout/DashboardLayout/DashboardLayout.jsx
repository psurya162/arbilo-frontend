import { useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IoMdMenu, IoMdPerson, IoMdHome } from 'react-icons/io';
import { AuthContext } from '../../context/AuthContext';
// Import Shadcn UI components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for Sheet
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token and user data from storage on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setAuth({ user: null, token: null });
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-lg p-4 text-black">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/">
            <img
              src="/assets/images/logo2.png"
              alt="company_logo"
              loading="lazy"
              className="w-32 md:w-20 cursor-pointer"
            />
          </NavLink>

          {/* Navigation and User Info */}
          <div className="flex items-center gap-4">
            {/* Navigation Links (Visible on Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`
                }
              >
                <IoMdHome size={20} />
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`
                }
              >
                <IoMdPerson size={20} />
                Profile
              </NavLink>
            </div>


            {/* User Avatar and Menu (Visible on Desktop and Mobile) */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                {/* Replaced <button> with a <div> to avoid button nesting issue */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-200 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/path/to/avatar.jpg" alt={auth.user.name} />
                    <AvatarFallback>{auth.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-semibold uppercase">
                    {auth.user.name.slice(0, 6)}
                  </span>

                  <IoMdMenu size={24} className="md:hidden" />
                </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="uppercase">Hi {auth.user.name.slice(0, 6)}</SheetTitle>

                  <SheetDescription>Manage your account settings</SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <ul className="flex flex-col gap-2">
                    {/* Dashboard Link */}
                    <li>
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          `block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded ${isActive ? 'bg-gray-200' : ''
                          }`
                        }
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    {/* Profile Link */}
                    <li>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          `block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded ${isActive ? 'bg-gray-200' : ''
                          }`
                        }
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Profile
                      </NavLink>
                    </li>
                    {/* Logout Button */}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 bg-black text-white rounded sm:w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;