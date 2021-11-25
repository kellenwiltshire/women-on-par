import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default function FunctionCards({ details }) {
	const [image, setImage] = useState('/brand/logoNoText.jpg');
	const length = 100;
	const shortBody = details.details.substring(0, length) + '...';

	useEffect(() => {
		if (details.image) {
			setImage(details.image.url);
		}
	}, []);
	return (
		<div>
			<Link
				href={{
					pathname: `/special/${details.id}`,
					query: { slug: details.id },
				}}
			>
				<a>
					<p className='text-3xl font-semibold text-gray-900 mb-2 text-center'>{details.name}</p>
					<div className='w-full aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
						<img
							src={image}
							alt='Drawstring top with elastic loop closure and textured interior padding.'
							className='w-full h-96 object-center object-cover'
						/>
					</div>
					<p className='mt-8 text-base text-gray-500'>
						<ReactMarkdown children={shortBody} />
					</p>
				</a>
			</Link>
		</div>
	);
}
