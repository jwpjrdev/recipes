'use client';

import Balancer from 'react-wrap-balancer';
import Link from 'next/link';

export default function NotFound() {
    return (
        <section>
            <h1 className="font-bold text-3xl">
                <Balancer>Page Not Found</Balancer>
            </h1>
            <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm">
                <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
            </div>
            <p>This page could not be found.</p>
            <article className="prose prose-quoteless prose-neutral dark:prose-invert">
                <Link href={`/`}>
                    <p>Back to Home</p>
                </Link>
            </article>
        </section>
    );
}
