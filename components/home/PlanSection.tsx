import React from 'react';
import PlanCard from './PlanCard';
import { clsx } from 'clsx';

const PlanSection = () => {
	return (
		<div className=' space-y-4'>
			<div>
				<h1>Our Investment Plans</h1>
				<h1>The plans we offer is specifically made for you.</h1>
			</div>
			<div className='grid md:grid-cols-4 gap-4'>
				<PlanCard />
				<PlanCard />
				<PlanCard />
				<PlanCard />
			</div>
		</div>
	);
};

export default PlanSection;
