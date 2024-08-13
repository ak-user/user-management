import * as React from 'react';
import dayjs from 'dayjs';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { UserDialog } from '@/components/dialog/userDialog';
import { useMemo, useState } from 'react';

export function UserTable({
  users,
  totalPages,
  currentPage,
  onEditUser,
  onDeleteUser,
  fetchData,
}) {
  const [sorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div>{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => (
          <div>{dayjs(row.getValue('createdAt')).format('MMMM D, YYYY')}</div>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 80,
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="space-x-2 flex justify-center">
              <UserDialog
                triggerText="Edit"
                buttonVariant="outline"
                user={user}
                onSave={(updatedUser) => onEditUser(user, updatedUser)}
              />
              <Button onClick={() => onDeleteUser(user)}>Delete</Button>
            </div>
          );
        },
      },
    ],
    [onEditUser, onDeleteUser],
  );

  const table = useReactTable({
    data: users,
    columns,
    pageCount: totalPages,
    state: {
      pagination: { pageIndex: currentPage },
      sorting,
    },
    onPaginationChange: ({ pageIndex }) => {
      fetchData({ pageIndex, sorting });
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  const handlePageChange = (newPageIndex) => {
    if (newPageIndex < 0 || newPageIndex >= totalPages) return;
    fetchData({ pageIndex: newPageIndex, sorting });
  };

  return (
    <div className="w-full h-full">
      <div className="h-[calc(100vh-213px)] overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={header.column.id === 'actions' ? 'w-[80px]' : ''}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.id === 'actions' ? 'w-[80px]' : ''}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-[calc(100vh-213px)] text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 0) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={
                currentPage === 0 ? 'opacity-50 pointer-events-none' : ''
              }
            />
          </PaginationItem>

          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={currentPage === page}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 3 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages - 1) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={
                currentPage === totalPages - 1
                  ? 'opacity-50 pointer-events-none'
                  : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
