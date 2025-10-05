import React from 'react';
import localFont from 'next/font/local';

const josefinSans = localFont({
	src: '../../app/fonts/JosefinSans-Regular.ttf',
});

const AccountContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={`max-w-[1920px] w-full mx-auto xl:px-20  py-4 ${josefinSans.className} account-section`}
		>
			{children}
		</div>
	);
};

export default AccountContainer;
