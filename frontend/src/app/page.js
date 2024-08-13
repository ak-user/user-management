'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header/Header';
import { UserTable } from '@/components/user-table/UserTable';
import {
  createUser,
  fetchUsers,
  importUsers,
  updateUser,
  deleteUser,
} from '@/app/services/userService';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  const loadUsers = async (page = 0) => {
    const response = await fetchUsers({ page });
    setUsers(response.users);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    loadUsers(pageIndex);
  }, [pageIndex]);

  const handleCreateUser = async (newUser) => {
    await createUser(newUser);
    loadUsers(pageIndex);
  };

  const handleUploadXlsx = async (file) => {
    await importUsers(file);
    loadUsers(pageIndex);
  };

  const handleEditUser = async (currentUser, updatedUser) => {
    const userId = currentUser.id;
    await updateUser(userId, updatedUser);
    loadUsers(pageIndex);
  };

  const handleDeleteUser = async (currentUser) => {
    const userId = currentUser.id;
    await deleteUser(userId);
    loadUsers(pageIndex);
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
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        fetchData={fetchData}
      />
    </main>
  );
}
