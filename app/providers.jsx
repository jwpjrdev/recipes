'use client';

import { Suspense } from 'react';

// import { NextAdapterApp } from "next-query-params/app";
import NextAdapter from 'components/next-adapter';
import { QueryParamProvider } from 'use-query-params';

export default function Providers({ children }) {
    return (
        <Suspense fallback={null}>
            <QueryParamProvider adapter={NextAdapter}>
                {children}
            </QueryParamProvider>
        </Suspense>
    );
}