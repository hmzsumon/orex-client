'use client';
import { useGetTransactionsQuery } from '@/redux/features/transactions/transactionApi';
import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

const TransactionsPage = () => {
	const { data, error, isLoading } = useGetTransactionsQuery(undefined);
	const { transactions } = data || [];
	console.log(transactions);
	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={transactions} />
		</div>
	);
};

export default TransactionsPage;
