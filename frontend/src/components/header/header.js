'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserDialog } from '@/components/dialog/userDialog';

export function Header({ onCreateUser, onUploadXlsx }) {
  const handleCreateUser = (newUser) => {
    onCreateUser({
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0],
    });
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
      <UserDialog triggerText="Create New" onSave={handleCreateUser} />

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
