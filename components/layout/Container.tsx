import React from 'react';
import localFont from 'next/font/local';

const josefinSans = localFont({
	src: '../../app/fonts/JosefinSans-Regular.ttf',
});

const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={`max-w-[1920px] w-full mx-auto xl:px-20 px-4 py-4 ${josefinSans.className}`}
		>
			{children}
		</div>
	);
};

export default Container;
