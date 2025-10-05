'use client';
import React from 'react';
import { useGet2LevelUserQuery } from '@/redux/features/auth/authApi';
import { DataTable } from '../1st-level/data-table';
import { columns } from '../1st-level/columns';
// import CssBaseline from '@mui/material/CssBaseline';

const LevelTwoTeamPage = () => {
	const { data, error, isLoading } = useGet2LevelUserQuery(undefined);
	const { users } = data || { users: [] };
	const { count, sales } = data || { count: 0, sales: 0 };

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={users} />
		</div>
	);
};

export default LevelTwoTeamPage;
