import Link from 'next/link';
import { allRecipes } from 'contentlayer/generated';

export default async function HomePage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-5">Recipes</h1>
      {allRecipes
        .sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
        .map((recipe) => (
          <Link
            key={recipe.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/recipes/${recipe.slug}`}
          >
            <div className="w-full flex flex-col">
              <p>{recipe.title}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}
