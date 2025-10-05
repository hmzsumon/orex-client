'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchBaseQueryError } from '@/redux/services/helpers';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';
import { useCreatePackageMutation } from '@/redux/features/package/packageApi';

const PlanCard = ({ pkg }: any) => {
	const router = useRouter();

	// call create package mutation
	const [
		createPackage,
		{
			isLoading: isCreating,
			isError: isCreatingError,
			isSuccess: isCreateSuccess,
			error: createError,
		},
	] = useCreatePackageMutation();

	// handle create package
	const handleCreatePackage = async (packageId: any) => {
		console.log('packageId', packageId);
		const data = {
			packageId,
		};
		createPackage(data);
	};

	// useEffect for create package
	useEffect(() => {
		if (isCreateSuccess) {
			toast.success('Package created successfully');
			router.push('/my-plans');
		}
		if (isCreatingError) {
			toast.error((createError as fetchBaseQueryError).data?.message);
		}
	}, [isCreateSuccess, isCreatingError, createError]);

	const [isOpen, setIsOpen] = useState(false); // State to control the drawer
	const openDrawer = () => setIsOpen(true); // Function to open the drawer
	const closeDrawer = () => {
		if (!isCreating) {
			// Prevent closing if isCreating is true
			setIsOpen(false);
		}
	};

	const [sPackage, setSPackage] = useState(pkg); // State to store the package

	// handle select package
	const handleSelectPackage = (pkg: any) => {
		openDrawer();
		setSPackage(pkg);
	};

	return (
		<div>
			<div className='package-card text-center bg_img'>
				<h4 className='package-card__title base--color mb-2'>{pkg.title}</h4>
				<ul className='package-card__features mt-4'>
					<li>Return: {pkg.return}</li>
					<li>{pkg.days}</li>
					<li>{pkg.duration}</li>
					<li>{pkg.total_return}</li>
				</ul>
				<div className='package-card__range mt-5 base--color'>${pkg.price}</div>
				{/* Button to open the drawer */}
				<button
					className='cmn-btn font-bold'
					onClick={() => handleSelectPackage(pkg)}
				>
					Invest Now
				</button>
			</div>
			{/* Drawer component */}
			<Drawer
				open={isOpen}
				onOpenChange={(open) => !isCreating && setIsOpen(open)}
			>
				<DrawerContent className='drawer-card border-t-2 border-l-2 border-r-2 border-[#cca354]'>
					<div className='mx-auto w-full max-w-sm'>
						<DrawerHeader>
							<DrawerTitle className='text-base-color'>
								Are you sure you want to invest?
							</DrawerTitle>
							<DrawerDescription>
								<span className='text-gray-50'>Investing in this plan </span>
								<span className='text-base-color font-semibold'>
									{pkg.title}
								</span>
							</DrawerDescription>
						</DrawerHeader>

						<DrawerFooter>
							<button
								className='cmn-btn font-bold disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={() => handleCreatePackage(sPackage._id)}
								disabled={isCreating}
							>
								{isCreating ? <PulseLoader color='#fff' size={8} /> : 'Confirm'}
							</button>
							<DrawerClose asChild>
								<Button
									variant='destructive'
									onClick={closeDrawer}
									disabled={isCreating} // Disable the button during creation
								>
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default PlanCard;
