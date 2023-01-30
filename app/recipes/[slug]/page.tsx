import { notFound } from 'next/navigation';
import { Mdx } from 'components/mdx';
import { allRecipes } from 'contentlayer/generated';
import Balancer from 'react-wrap-balancer';
import Link from 'next/link';

export async function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function Recipe({ params }) {
  const recipe = allRecipes.find((post) => post.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">
        <Balancer>{recipe.title}</Balancer>
      </h1>
      <div className="grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm">
        <Link
          key={recipe.slug}
          href={`/`}
        >
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
            <p>back to home</p>
          </div>
        </Link>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
      </div>
      <Mdx code={recipe.body.code} />
    </section>
  );
}
