import * as React from 'react';
import Image from 'next/image';
import Bag_1 from '@/public/fdw.png';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function DashboardCard({
	title,
	amount,
	icon,
	is_btn,
	btn_text,
	url,
}: any) {
	return (
		<Card className='w-full px-4 py-3 flex gap-x-4 bg-gray-900 border border-base-color rounded-md '>
			<div>
				<Image src={icon} alt='Bag' className='w-16' />
			</div>
			<div className=' space-y-2'>
				<h1>{title}</h1>
				<p>
					<span className='font-bold'>
						$
						{amount.toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</span>
				</p>
				{is_btn && (
					<Button className='w-full' variant='secondary'>
						<Link href={url}>{btn_text}</Link>
					</Button>
				)}
			</div>
		</Card>
	);
}
