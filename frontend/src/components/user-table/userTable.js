'use client';

import * as React from 'react';
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

export function UserTable({
  users,
  totalPages,
  onEditUser,
  onDeleteUser,
  fetchData,
}) {
  const columns = React.useMemo(
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
        cell: ({ row }) => <div>{row.getValue('createdAt')}</div>,
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

  const [pageIndex, setPageIndex] = React.useState(0);
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data: users,
    columns,
    pageCount: totalPages,
    state: {
      pagination: { pageIndex },
      sorting,
    },
    onPaginationChange: ({ pageIndex }) => {
      setPageIndex(pageIndex);
      fetchData({ pageIndex, sorting });
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  const currentPage = pageIndex + 1;

  const handlePageChange = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    setPageIndex(pageIndex);
    fetchData({ pageIndex, sorting });
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                  className="h-24 text-center"
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
                if (currentPage > 1) {
                  handlePageChange(pageIndex - 1);
                }
              }}
              className={
                currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
              }
            />
          </PaginationItem>

          {[...Array(totalPages).keys()].map((page) => (
            <PaginationItem key={page + 1}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={currentPage === page + 1}
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
                if (currentPage < totalPages) {
                  handlePageChange(pageIndex + 1);
                }
              }}
              className={
                currentPage === totalPages
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
