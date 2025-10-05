'use client';
import React from 'react';
import Image from 'next/image';
import Man from '@/public/men.png';
import CopyToClipboard from '@/lib/CopyToClipboard';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RWebShare } from 'react-web-share';
import { maskEmail } from '@/lib/functions';

const DashboardTop = () => {
	const { user } = useSelector((state: any) => state.auth);

	// get host
	const host = window.location.host;
	// create referral link wit user customer_id
	let referralLink = '';
	if (process.env.NODE_ENV === 'development') {
		referralLink = `http://${host}/sign-up?referral_code=${user?.customer_id}`;
	} else {
		referralLink = `https://${host}/sign-up?referral_code=${user?.customer_id}`;
	}
	// short referral link
	const shortReferralLink = referralLink.slice(0, 22) + '...';
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			{/* Start User Section */}
			<div className='flex items-center gap-6'>
				<div className='space-y-2'>
					<Image src={Man} alt='User' className=' w-14 ' />
					<div>
						<span className='bg-base-color py-1 px-3 rounded text-gray-800 font-bold '>
							User
						</span>
					</div>
				</div>

				<div className='space-y-1'>
					<h1 className='text-xl font-bold'>{user?.name}</h1>
					<div className='flex items-center'>
						<p className='text-sm text-gray-500 space-x-1'>
							<span>UID:</span>
							<span>{user?.customer_id}</span>
						</p>
						<CopyToClipboard text={user?.customer_id} />
					</div>
					<div className='flex items-center'>
						<p className='text-sm text-gray-500 space-x-1'>
							<span>Email:</span>
							<span>{maskEmail(user?.email)}</span>
						</p>
						<CopyToClipboard text={user?.email} />
					</div>
					<p className='text-sm text-gray-500 space-x-1'>
						<span>Account Status:</span>
						{user?.is_active ? (
							<span className='text-green-500'>Active</span>
						) : (
							<span className='text-red-500'>Inactive</span>
						)}
					</p>
				</div>
			</div>

			{/* Start invitation Link */}
			<div className='mt-4 text-gray-400 space-y-2'>
				<div>
					<h1 className='text-xl font-bold'>Invitation Link</h1>
					<p className='text-xs '>
						Copy your Invitation Link & Share with your Friends. Increase your
						Earning.
					</p>
				</div>
				<div className='flex items-center '>
					<p>
						<span>Your invitation Code:</span> <span>{user?.customer_id}</span>
					</p>
					<CopyToClipboard text={user?.customer_id} />
				</div>

				<div className='flex items-center '>
					<p>
						<span>Your invitation Link:</span> <span>{shortReferralLink}</span>
					</p>
					<CopyToClipboard text={referralLink} />
				</div>

				<div>
					<RWebShare
						data={{
							title: 'Join Us',
							text: 'Join Us',
							url: referralLink,
						}}
					>
						<button className='cmn-btn w-full font-bold'>Share</button>
					</RWebShare>
				</div>
			</div>
		</div>
	);
};

export default DashboardTop;
