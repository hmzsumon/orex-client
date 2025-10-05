import React from 'react';
import Image from 'next/image';
import HeroImg from '@/public/assets/images/hero/gold_bar.png';
import localFont from 'next/font/local';
import Container from '../layout/Container';

const beaufortLol = localFont({
	src: '../../app/fonts/BeaufortforLOL-Regular.ttf',
});

const HeroSection = () => {
	return (
		<div className='hero pt-10 relative'>
			{/* Background with Overlay */}
			<div className='absolute inset-0 bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-green-900/5 before:content-[""] z-0'></div>

			<Container>
				<div className='relative grid md:grid-cols-2 gap-4'>
					{/* Left Section */}
					<div className='space-y-4 z-10'>
						<div className='space-y-2'>
							<h1 className={`text-4xl md:text-6xl font-bold leading-tight`}>
								Invest for Future in Stable Platform
							</h1>
							<h1
								className={`text-3xl md:text-6xl font-bold leading-tight text-[#cca354]`}
							>
								and Make Fast Money
							</h1>
						</div>
						<p className='tracking-wide text-white font-semibold opacity-100 leading-relaxed'>
							Invest in an Industry Leader, Professional, and Reliable Company.
							We provide you with the most necessary features that will make
							your experience better. Not only we guarantee the fastest and the
							most exciting returns on your investments, but we also guarantee
							the security of your investment.
						</p>
						{/* <button className='grad-btn px-10 py-2 rounded-xl font-bold'>
							Start Trading
						</button> */}
						<button className='cmn-btn font-bold'>Start Trading</button>
					</div>

					{/* Right Section */}
					<div className='flex items-center justify-center mt-6 z-10'></div>
				</div>
			</Container>
		</div>
	);
};

export default HeroSection;
