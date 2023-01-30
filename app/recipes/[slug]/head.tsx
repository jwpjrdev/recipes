import { allRecipes } from 'contentlayer/generated';

export default async function Head({ params }) {
  const recipe = allRecipes.find((recipe) => recipe.slug === params.slug) || {
    title: 'Not Found',
    summary: 'This page could not be found.',
  };

  return (
    <>
      <title>{`Josh's Recipes - ${recipe.title}`}</title>
      <meta content={recipe.summary} name="description" />
    </>
  );
}
