'use client';
import React from 'react';
import {
	useGet2LevelUserQuery,
	useGet3LevelUserQuery,
} from '@/redux/features/auth/authApi';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataTable } from '../1st-level/data-table';
import { columns } from '../1st-level/columns';
// import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const LevelThreeTeamPage = () => {
	const { data, error, isLoading } = useGet3LevelUserQuery(undefined);
	const { users } = data || { users: [] };
	const { count, sales } = data || { count: 0, sales: 0 };

	return (
		<div className='container mx-auto py-10'>
			<DataTable columns={columns} data={users} />
		</div>
	);
};

export default LevelThreeTeamPage;
