import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
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
} from "@/components/ui/alert-dialog"; // Ensure correct import path
import config from "@/config.js/config";

export default function ProfileForm() {
  const { auth, setAuth } = useContext(AuthContext);
  const [name, setName] = useState(auth.user.name);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);

  const handleConfirmUpdate = async () => {
    if (name.trim() === auth.user.name) {
      toast.error("No changes detected");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${config.API_URL}/api/auth/update-name`,
        { newName: name.trim() },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Ensure token is valid
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Name updated successfully");

        // Update AuthContext state
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: { ...prevAuth.user, name: response.data.newName },
        }));

        setIsDialogOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred while updating the name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* Name Field */}
          <div className="sm:col-span-3 flex items-center">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-900 mr-4">
              Name:
            </label>
            <div className="mt-2 flex-grow">
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black sm:text-sm"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="sm:col-span-4 flex items-center">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mr-4">
              Email address:
            </label>
            <div className="mt-2 flex-grow">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-black sm:text-sm"
                value={auth.user.email}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* Update Button with Modal */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </AlertDialogTrigger>

          {/* Confirmation Modal */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Profile Update</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update your name to "{name}"?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmUpdate}>
                {isLoading ? "Updating..." : "Confirm"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Toaster />
    </form>
  );
}
