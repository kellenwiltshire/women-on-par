import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function FunctionPage({ specialFunction }) {
	const [image, setImage] = useState('/brand/logoNoText.jpg');

	useEffect(() => {
		if (specialFunction.image) {
			setImage(specialFunction.image.url);
		}
	}, []);
	return (
		<div className='bg-white overflow-hidden'>
			<div className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
				{/* <div className='hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen' /> */}
				<div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
					<div>
						<h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-2'>
							{specialFunction.name}
						</h3>
						<p className=' text-gray-700 mb-2'>Date: {specialFunction.date}</p>
					</div>
				</div>
				<div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
					<div className='relative lg:row-start-1 lg:col-start-2'>
						{/* <svg
							className='hidden lg:block absolute top-0 right-0 -mt-20 -mr-20'
							width={404}
							height={384}
							fill='none'
							viewBox='0 0 404 384'
							aria-hidden='true'
						>
							<defs>
								<pattern
									id='de316486-4a29-4312-bdfc-fbce2132a2c1'
									x={0}
									y={0}
									width={20}
									height={20}
									patternUnits='userSpaceOnUse'
								>
									<rect
										x={0}
										y={0}
										width={4}
										height={4}
										className='text-gray-200'
										fill='currentColor'
									/>
								</pattern>
							</defs>
							<rect
								width={404}
								height={384}
								fill='url(#de316486-4a29-4312-bdfc-fbce2132a2c1)'
							/>
						</svg> */}
						<div className='relative text-base mx-auto max-w-prose lg:max-w-none'>
							<figure>
								<div className='aspect-w-12 aspect-h-7 lg:aspect-none'>
									<img className='rounded-lg shadow-lg ' src={image} alt='' />
								</div>
							</figure>
						</div>
					</div>
					<article className='prose'>
						<ReactMarkdown children={specialFunction.details} />
					</article>
				</div>
			</div>
		</div>
	);
}
