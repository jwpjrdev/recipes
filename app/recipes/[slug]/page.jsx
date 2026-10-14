import { notFound } from 'next/navigation';
import { allRecipes } from 'contentlayer/generated';
import ContentHolder from 'components/content-holder';
import { recipeCategories } from 'lib/recipe-categories';

export async function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = allRecipes.find((post) => post.slug === slug);

  return {
    title: recipe?.title ?? 'Not Found',
  };
}

export default async function Recipe({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const recipe = allRecipes.find((post) => post.slug === slug);

  if (!recipe) {
    notFound();
  }

  // options: half, single, double.
  // if it's not one of those, use single.
  let quantity = resolvedSearchParams.quantity || "single";
  switch (quantity) {
    case "half":
    case "single":
    case "double":
      break;
    default:
      quantity = "single";
      break;
  }

  const halvable =
    recipe.halvable ?? recipeCategories[recipe.category]?.halvable ?? false;

  return (
    <section>
      <ContentHolder recipe={recipe} quantity={quantity} halvable={halvable} />
    </section>
  );
}
