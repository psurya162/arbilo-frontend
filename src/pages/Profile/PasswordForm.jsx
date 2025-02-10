import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons
import config from '@/config.js/config';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Make sure the path is correct for your setup

export default function PasswordForm() {
  const { auth } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // States for password visibility toggles
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'currentPassword') {
      setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
    } else if (field === 'newPassword') {
      setIsNewPasswordVisible(!isNewPasswordVisible);
    } else if (field === 'confirmPassword') {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const validateInputs = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all the fields.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleConfirmPasswordChange = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsDialogOpen(false);

    // Use toast.promise to handle the loading, success, and error states
    toast.promise(
      axios.put(
        `${config.API_URL}/api/auth/change-password`,
        { currentPassword, newPassword, confirmPassword },
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
          },
        }
      ),
      {
        loading: 'Changing password...',
        success: (response) => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          return response.data.message; // Display backend message in toast
        },
        error: (err) => {
          return err.response?.data?.message || "An error occurred while changing the password.";
        },
      }
    );
  };

  return (
    <form>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
        <p className="text-sm text-gray-600">Enter your current password and choose a new one.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Current Password Field */}
          <div className="sm:col-span-3 flex items-center">
            <label htmlFor="current-password" className="block text-sm font-medium text-gray-900 mr-4">
              Current Password:
            </label>
            <div className="mt-2 flex-grow relative">
              <input
                id="current-password"
                name="currentPassword"
                type={isCurrentPasswordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black sm:text-sm"
                value={currentPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('currentPassword')}
              >
                {isCurrentPasswordVisible ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* New Password Field */}
          <div className="sm:col-span-3 flex items-center">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-900 mr-4">
              New Password:
            </label>
            <div className="mt-2 flex-grow relative">
              <input
                id="new-password"
                name="newPassword"
                type={isNewPasswordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black sm:text-sm"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                {isNewPasswordVisible ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="sm:col-span-3 flex items-center">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mr-4">
              Confirm Password:
            </label>
            <div className="mt-2 flex-grow relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black sm:text-sm"
                value={confirmPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {isConfirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
  <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    {/* Replaced <button> with <div> to avoid nested button issue */}
    <AlertDialogTrigger asChild>
      <div
        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setIsDialogOpen(true)}
      >
        Change Password
      </div>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Confirm Password Change</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to change your password?
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleConfirmPasswordChange}>
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>


      <Toaster />
    </form>
  );
}