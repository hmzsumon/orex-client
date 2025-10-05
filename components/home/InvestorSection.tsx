import React from 'react';
import Container from '../layout/Container';

const InvestorSection = () => {
	return (
		<div className='investor-section relative py-20'>
			<Container>
				<div className='space-y-3 z-10 '>
					<h1 className='text-4xl md:text-6xl font-bold leading-tight text-center'>
						<span>Our Top</span> <b className='text-[#cca354]'>Investor</b>
					</h1>
					<p className='tracking-wide text-white font-semibold opacity-100 leading-relaxed'>
						Our top investors are the cornerstone of our success. They have
						shown extraordinary commitment and trust, helping us expand our
						vision and reach. Together, we are building a strong financial
						future powered by smart investments and strategic partnerships.
					</p>
				</div>
			</Container>
		</div>
	);
};

export default InvestorSection;
