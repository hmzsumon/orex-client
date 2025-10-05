'use client';
import React from 'react';
import Container from '../layout/Container';
import PackageCard from './PackageCard';
import { useGetAllPackagesQuery } from '@/redux/features/package/packageApi';

const PackageSection = () => {
	const { data, error, isLoading, isSuccess, isError } =
		useGetAllPackagesQuery(undefined);
	const { packages } = data || { packages: [] };
	return (
		<div className=' py-20'>
			<Container>
				<div className=' flex flex-col gap-3 items-center justify-center'>
					<h1 className='text-4xl md:text-6xl font-bold leading-tight'>
						<span>Investment</span> <b className='text-[#cca354]'>Plans</b>
					</h1>
					<p>
						To make a solid investment, you have to know where you are
						investing. Find a plan which is best for you.
					</p>
				</div>

				<div className=' my-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
						{packages.map((pkg: { _id: any }) => (
							<PackageCard key={pkg._id} pkg={pkg} />
						))}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PackageSection;
