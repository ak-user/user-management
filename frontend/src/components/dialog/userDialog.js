'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function UserDialog({ triggerText, user, onSave, buttonVariant = '' }) {
  const [open, setOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) {
      setUserForm(user);
    } else {
      setUserForm({ name: '', email: '' });
    }
  }, [user]);

  const handleSave = () => {
    onSave(userForm);
    setUserForm({ name: '', email: '' });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setUserForm({ name: '', email: '' });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setUserForm({ name: '', email: '' });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={buttonVariant}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Create New User'}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={userForm.email}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
