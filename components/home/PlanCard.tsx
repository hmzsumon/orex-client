import React from 'react';

const PlanCard = () => {
	return (
		<div>
			<div className='single-investment-plan'>
				<img
					className='investment-plan-icon'
					src='https://oxetrade.com/assets/global/images/lRHKODtVav3aEegZhZGW.png'
					alt=''
				/>
				<div className='feature-plan'>Standard</div>

				<h3>Standard</h3>
				<p>Daily 0.7%</p>
				<ul>
					<li>
						Investment <span className='special'>$25-$500</span>
					</li>
					<li>
						Capital Back <span>Yes</span>
					</li>
					<li>
						Return Type <span>Lifetime</span>
					</li>
					<li>
						Number of Period
						<span>Unlimited Times</span>
					</li>
					<li>
						Profit Withdraw <span>Anytime</span>
					</li>
					<li>
						Cancel <span> No</span>
					</li>
				</ul>
				<div className='holidays'>
					<span className='star'>*</span> Saturday, Sunday are Holidays
				</div>

				<button className='grad-btn px-10 py-2 rounded-xl font-bold mt-4 '>
					Invest Now
				</button>
			</div>
		</div>
	);
};

export default PlanCard;
