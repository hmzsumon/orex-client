import React from 'react';

const PackageCard = ({ pkg }: any) => {
	return (
		<div>
			<div className='package-card text-center bg_img'>
				<h4 className='package-card__title base--color mb-2'>{pkg.title}</h4>
				<ul className='package-card__features mt-4'>
					<li> Return: {pkg.return}</li>
					<li>{pkg.days}</li>
					<li>{pkg.duration}</li>
					<li>{pkg.total_return}</li>
				</ul>
				<div className='package-card__range mt-5 base--color'>${pkg.price}</div>
				<button className='cmn-btn font-bold'>Invest Now</button>
			</div>
		</div>
	);
};

export default PackageCard;
