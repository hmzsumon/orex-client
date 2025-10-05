'use client';
import React from 'react';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/baseUrl';
import { useSelector } from 'react-redux';
import { useGetNotificationsQuery } from '@/redux/features/notify/notificationApi';
import { formDateWithTime } from '@/lib/functions';

const NotificationsPage = () => {
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading, isSuccess, isError, error, refetch } =
		useGetNotificationsQuery(undefined);
	const { notifications } = data || [];
	return (
		<div>
			<h2 className=' text-center font-bold text-2xl my-2'>
				Notifications: {notifications?.length}
			</h2>
			<div className='grid md:grid-cols-3 gap-2'>
				{notifications?.map((notification: any) => (
					<div
						key={notification?._id}
						className=' bg-base-color p-2 my-2 rounded'
					>
						<h2 className=' font-bold text-gray-50'>{notification.title}</h2>
						<div className='text-xs font-bold text-gray-900 mt-1'>
							<p>{formDateWithTime(notification?.createdAt)}</p>
							<p>{notification?.message}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotificationsPage;
