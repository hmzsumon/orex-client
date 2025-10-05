'use client';

import { formDateWithTime } from '@/lib/functions';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	name: string;
	customer_id: string;
	amount: number;
	is_active: boolean;
	email: string;
	_id: string;
	createdAt: string; // Ensure createdAt is a string that can be parsed as a date
	description: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'createdAt',
		header: 'Date',
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt);
			return <span>{formDateWithTime(date)}</span>; // Format as DD/MM/YYYY
		},
	},

	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row }) => {
			return <span className=' text-base-color'>${row.original.amount}</span>;
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
];
