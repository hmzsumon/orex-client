'use client';
import PlanCard from '@/components/auth/plans/PlanCard';
import PackageCard from '@/components/home/PackageCard';
import Container from '@/components/layout/Container';
import Loader from '@/components/layout/Loader';

import { useGetAllPackagesQuery } from '@/redux/features/package/packageApi';

import React from 'react';

const AllPlansPage = () => {
	const { data, error, isLoading, isSuccess, isError } =
		useGetAllPackagesQuery(undefined);
	const { packages } = data || { packages: [] };
	return (
		<div>
			<div className=' py-10'>
				{isLoading ? (
					<Loader />
				) : (
					<div>
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
									<PlanCard key={pkg._id} pkg={pkg} />
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllPlansPage;
