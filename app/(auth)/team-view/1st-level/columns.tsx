'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	name: string;
	customer_id: string;
	total_investment: number;
	is_active: boolean;
	email: string;
	_id: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'customer_id',
		header: 'Customer ID',
	},

	{
		accessorKey: 'total_investment',
		header: 'Investment',
		cell: ({ row }) => {
			return (
				<span className=' text-base-color'>
					${row.original.total_investment}
				</span>
			);
		},
	},
	{
		accessorKey: 'is_active',
		header: 'Status',
		cell: ({ row }) => {
			return (
				<span className=' text-base-color'>
					{row.original.is_active ? 'Active' : 'Inactive'}
				</span>
			);
		},
	},
];
