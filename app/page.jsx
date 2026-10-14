import { allRecipes } from 'contentlayer/generated';
import { RecipeDirectory } from 'components/recipe-directory';

export default function HomePage() {
  return (
    <RecipeDirectory
      recipes={allRecipes.map(({ slug, title, category }) => ({ slug, title, category }))}
    />
  );
}
