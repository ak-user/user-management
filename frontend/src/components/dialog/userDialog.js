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
  const [errors, setErrors] = useState({ name: '', email: '' });

  useEffect(() => {
    if (user) {
      setUserForm(user);
    } else {
      setUserForm({ name: '', email: '' });
    }
  }, [user]);

  const validate = () => {
    let tempErrors = { name: '', email: '' };
    let isValid = true;

    if (!userForm.name.trim()) {
      tempErrors.name = 'Name is required';
      isValid = false;
    }

    if (!userForm.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userForm.email)) {
      tempErrors.email = 'Email is not valid';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(userForm);
      setUserForm({ name: '', email: '' });
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({ name: '', email: '' });
    if (triggerText === 'Create New') {
      setUserForm({ name: '', email: '' });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setUserForm({ name: '', email: '' });
          setErrors({ name: '', email: '' });
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
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
          )}
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
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
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
