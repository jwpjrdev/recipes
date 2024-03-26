import Link from 'next/link';
import { allRecipes } from 'contentlayer/generated';

export default async function HomePage() {

  let recipesCategories = {
    "bread": "Quick Breads",
    "brownies": "Brownies",
    "cookies": "Cookies",
    "pie": "Pies",
    "muffins": "Muffins",
    "ingredient": "Ingredients",
    "other": "Other",
  };

  let recipes = new Map(); // in rust, this would be Map<String, Vec<Recipe>>
  // todo: make this safe
  for (let recipe of allRecipes) {
    if (recipes.has(recipe.category)) {
      let arr = recipes.get(recipe.category);
      arr.push(recipe);
      recipes.set(recipe.category, arr);
    } else {
      let arr = [];
      arr.push(recipe);
      recipes.set(recipe.category, arr);
    }
  }

  return (
    <section>
      <h1 className="font-bold text-3xl tfont-serif mb-4">Josh's Recipes</h1>
      <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...recipes.keys()].sort((a, b) => {
          // display names
          let a2 = recipesCategories[a];
          let b2 = recipesCategories[b];
          if (a2 < b2) {
            return -1;
          }
          if (a2 > b2) {
            return 1;
          }
          return 0;
        }).map(category => (
          <div className="w-full flex flex-col">
            <div className="mb-14">
              <h1 className="font-bold text-2xl mb-3">{recipesCategories[category]}</h1>
              {recipes.get(category).map(recipe => (
                <Link
                  key={recipe.slug}
                  className="flex flex-col space-y-1 mb-3"
                  href={`/recipes/${recipe.slug}`}
                >
                  <div className="w-full flex flex-col">
                    <p>{recipe.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {/* <p className="text-lg">{recipe.title}</p> */}

        {/* <div className="mb-14">
          <h1 className="font-bold text-2xl mb-3">Cookies</h1>

          <p className="text-lg">Chocolate Chip Cookies</p>
          <p className="text-lg">test</p>
          <p className="text-lg">test</p>
        </div> */}
      </div>
      {/* {allRecipes
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
              <p>{recipe.title} {recipe.category}</p>
            </div>
          </Link>
        ))} */}
    </section>
  );
}
