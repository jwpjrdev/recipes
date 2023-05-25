'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<section>
			<h1 className="font-bold text-3xl">
				<Balancer>Something Went Wrong</Balancer>
			</h1>
			<div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm">
				<div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
			</div>
			<p>Try refreshing the page.</p>
		</section>
	);
}
