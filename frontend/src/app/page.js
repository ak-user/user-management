'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { UserTable } from '@/components/user-table/UserTable';
import {
  createUser,
  fetchUsers,
  importUsers,
  updateUser,
  deleteUser,
} from '@/app/services/userService';
import { toast } from 'sonner';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPageIndex = parseInt(searchParams.get('page')) || 0;

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);

  const loadUsers = async (page = 0) => {
    try {
      const response = await fetchUsers({ page });
      setUsers(response.users);
      setTotalPages(response.totalPages);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'There was an error loading the user list.';
      toast.error('Failed to load users', { description: errorMessage });
    }
  };

  useEffect(() => {
    loadUsers(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    router.replace(`?page=${pageIndex}`);
  }, [pageIndex, router]);

  const handleCreateUser = async (newUser) => {
    try {
      await createUser(newUser);
      loadUsers(pageIndex);
      toast('User Created', {
        description: `User ${newUser.name} has been created successfully.`,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'There was an error creating the user.';
      toast.error('Failed to create user', { description: errorMessage });
    }
  };

  const handleUploadXlsx = async (file) => {
    try {
      await importUsers(file);
      loadUsers(pageIndex);
      toast('Users Imported', {
        description: 'Users have been imported successfully.',
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'There was an error importing the users.';
      toast.error('Failed to import users', { description: errorMessage });
    }
  };

  const handleEditUser = async (currentUser, updatedUser) => {
    try {
      const userId = currentUser.id;
      await updateUser(userId, updatedUser);
      loadUsers(pageIndex);
      toast('User Updated', {
        description: `User ${updatedUser.name} has been updated successfully.`,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'There was an error updating the user.';
      toast.error('Failed to update user', { description: errorMessage });
    }
  };

  const handleDeleteUser = async (currentUser) => {
    try {
      const userId = currentUser.id;
      await deleteUser(userId);
      loadUsers(pageIndex);
      toast('User Deleted', {
        description: `User ${currentUser.name} has been deleted.`,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'There was an error deleting the user.';
      toast.error('Failed to delete user', { description: errorMessage });
    }
  };

  const fetchData = async ({ pageIndex }) => {
    setPageIndex(pageIndex);
    loadUsers(pageIndex);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <Header onCreateUser={handleCreateUser} onUploadXlsx={handleUploadXlsx} />
      <UserTable
        users={users}
        totalPages={totalPages}
        currentPage={pageIndex}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        fetchData={fetchData}
      />
    </main>
  );
}
