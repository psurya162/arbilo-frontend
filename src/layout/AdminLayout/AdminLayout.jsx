import { useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { IoMdMenu, IoMdPerson, IoMdHome, IoMdStats, IoMdPeople } from 'react-icons/io';
import { AdminAuthContext } from '../../context/AdminAuthContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminLayout = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { admin, setAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    setAdmin({ user: null, token: null });
    navigate('/admin-login');
  };

  const adminNavLinks = [
    { path: '/admin-dashboard', icon: <IoMdHome size={20} />, label: 'Dashboard' },
    { path: '/admin-dashboard/users', icon: <IoMdPeople size={20} />, label: 'Users' },
    { path: '/admin-dashboard/statistics', icon: <IoMdStats size={20} />, label: 'Create ' },
    { path: '/admin-dashboard/profile', icon: <IoMdPerson size={20} />, label: 'Profile' },
  ];

  if (!admin.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fixed */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white fixed inset-0 z-10 h-full">
        <div className="p-4 border-b border-gray-800">
          <NavLink to="/admin-dashboard">
            <img
              src="/assets/images/logo2.png"
              alt="company_logo"
              loading="lazy"
              className="w-32"
            />
          </NavLink>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {adminNavLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}` 
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow-lg p-4">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <IoMdMenu size={24} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Admin Menu</SheetTitle>
                    <SheetDescription>Navigation and settings</SheetDescription>
                  </SheetHeader>
                  <nav className="mt-6">
                    <ul className="space-y-2">
                      {adminNavLinks.map((link) => (
                        <li key={link.path}>
                          <NavLink
                            to={link.path}
                            className={({ isActive }) =>
                              `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-gray-100' : 'hover:bg-gray-100'}` 
                            }
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {link.icon}
                            <span>{link.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <div className="ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100">
                    <Avatar>
                      <AvatarImage src="/path/to/avatar.jpg" alt={admin.user.name} />
                      <AvatarFallback>{admin.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{admin.user.name}</span>
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Admin Settings</SheetTitle>
                    <SheetDescription>Manage your admin account</SheetDescription>
                  </SheetHeader>
                  <div className="p-4">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
