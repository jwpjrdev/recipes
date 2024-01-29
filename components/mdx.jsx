'use client';

import * as React from 'react';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Fraction from 'fraction.js';

function CustomLink(props) {
  const href = props.href;
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

// TODO: handle things like '1 cups'
function AdjustValue(props) {
  if (props.multiplier == 1) {
    return props.children;
  } else if (props.multiplier == 1/2) {
    return new Fraction(props.children).div(2).toFraction(true);
  } else {
    return new Fraction(props.children).mul(parseFloat(props.multiplier)).toFraction(true);
  }
}

function Tip(props) {
  return (
    <div className="flex bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 my-8">
      <div className="flex items-center w-4 mr-4">💡</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}

export function Mdx({ code, quantity }) {
  const Component = useMDXComponent(code);

  return (
    <>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
        <Component components={{ 
          a: CustomLink,
          code: (props) => <AdjustValue multiplier={quantity} {...props} />,
          Tip,
         }} />
      </article>
    </>
  );
}
