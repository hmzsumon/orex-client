import { Copy } from 'lucide-react';
import React from 'react';

const ChooseCard = ({ choose }: any) => {
	return (
		<div>
			<div className='choose-card border-radius--5'>
				<div className='choose-card__header mb-3'>
					<div className='choose-card__icon'>{choose.icon}</div>
					<h4 className='choose-card__title base--color'>{choose.title}</h4>
				</div>
				<p>{choose.description}</p>
			</div>
		</div>
	);
};

export default ChooseCard;
