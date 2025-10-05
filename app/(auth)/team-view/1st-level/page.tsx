'use client';
import React from 'react';
import { useGet1LevelUserQuery } from '@/redux/features/auth/authApi';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DataTable } from './data-table';
import { columns } from './columns';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const LevelOneTeamPage = () => {
	const { data, error, isLoading } = useGet1LevelUserQuery(undefined);
	const { users } = data || { users: [] };
	console.log(users);
	const { count, sales } = data || { count: 0, sales: 0 };

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={users} />
		</div>
	);
};

export default LevelOneTeamPage;
