import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
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
} from "@/components/ui/alert-dialog"; 
import config from '@/config.js/config';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          toast.error('Admin not authenticated!');
          return;
        }

        const response = await axios.get(`${config.API_URL}/api/admin/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          toast.error('Invalid users data received');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  const handleToggleActiveStatus = (user) => {
    setSelectedUser(user);
  };

  const confirmToggle = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Admin not authenticated!');
        return;
      }

      setLoading(true);
      const newStatus = selectedUser.is_active === 1 ? 0 : 1;

      const response = await axios.put(
        `${config.API_URL}/api/admin/users/${selectedUser.id}/toggle-active`,
        { is_active: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, is_active: newStatus } : user
          )
        );
        toast.success(response.data.message || 'User status updated successfully');
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error toggling user status');
    } finally {
      setLoading(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <Table className=" border border-gray-200">
        
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 text-left text-gray-700">Name</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Email</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Status</TableHead>
            <TableHead className="px-4 py-2 text-left text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-4 text-gray-500">No users found</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="border-b">
                <TableCell className="px-4 py-2">{user.name}</TableCell>
                <TableCell className="px-4 py-2">{user.email}</TableCell>
                <TableCell className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-white ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <AlertDialog open={selectedUser === user} onOpenChange={(open) => open ? setSelectedUser(user) : setSelectedUser(null)}>
                    <AlertDialogTrigger asChild>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        disabled={loading}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogDescription>
                        Do you want to {user.is_active ? 'deactivate' : 'activate'} this user?
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedUser(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={confirmToggle}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
