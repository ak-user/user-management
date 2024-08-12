'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Header({ onCreateUser, onUploadXlsx }) {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleCreateUser = () => {
    onCreateUser({
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date().toISOString().split('T')[0],
    });

    setNewUser({ name: '', email: '' });
    setOpen(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await onUploadXlsx(file);
      e.target.value = null;
    }
  };

  return (
    <div className="w-full mb-4 flex justify-end space-x-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create New</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleCreateUser}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="hidden"
          id="xlsx-upload"
        />
        <Label htmlFor="xlsx-upload" className="cursor-pointer">
          <Button variant="outline" asChild>
            <span>Upload XLSX</span>
          </Button>
        </Label>
      </div>
    </div>
  );
}
