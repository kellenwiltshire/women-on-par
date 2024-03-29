import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Articles({ news }): JSX.Element {
	const [image, setImage] = useState('/brand/logoNoText.jpg');

	console.log(news);

	useEffect(() => {
		if (news.media.length > 0) {
			setImage(news.media[0].url);
		}
	}, [news.media]);
	return (
		<div className='bg-white overflow-hidden'>
			<div className='relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
				<div className='mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none'>
					<div>
						<h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
							{news.title}
						</h3>
					</div>
				</div>
				<div className='mt-8 lg:grid lg:grid-cols-2 lg:gap-8'>
					<div className='relative lg:row-start-1 lg:col-start-2'>
						<img className='rounded-lg shadow-lg w-2/3' src={image} alt='' />
					</div>
					<article className='prose'>
						<ReactMarkdown>{news.body}</ReactMarkdown>
					</article>
				</div>
				{news.media.length > 1 ? (
					<div className='flex flex-row flex-wrap w-full'>
						{news.media.map((image) => {
							return (
								<div key={image.url} className='w-full lg:w-1/4 m-2'>
									<img src={image.url} alt='' className='m-2' />
								</div>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
}
