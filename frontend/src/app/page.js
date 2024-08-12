'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header/Header';
import { UserTable } from '@/components/user-table/UserTable';
import {
  createUser,
  fetchUsers,
  importUsers,
} from '@/app/services/userService';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };

    loadUsers();
  }, []);

  const handleCreateUser = async (newUser) => {
    await createUser(newUser);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleUploadXlsx = async (file) => {
    await importUsers(file);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <Header onCreateUser={handleCreateUser} onUploadXlsx={handleUploadXlsx} />
      <UserTable users={users} />
    </main>
  );
}
