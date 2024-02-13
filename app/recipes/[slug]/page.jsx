import { notFound } from 'next/navigation';
import { allRecipes } from 'contentlayer/generated';
import ContentHolder from 'components/content-holder';

export async function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function Recipe({ params, searchParams }) {
  const recipe = allRecipes.find((post) => post.slug === params.slug);

  if (!recipe) {
    notFound();
  }

  // options: half, single, double, triple, quadruple.
  // if it's not one of those, use single.
  let quantity = searchParams.quantity || "single";
  switch (quantity) {
    case "half":
    case "single":
    case "double":
    case "triple":
    case "quadruple":
      break;
    default:
      quantity = "single";
      break;
  }

  let halvable;
  switch (recipe.category) {
    case "ingredient":
      halvable = recipe.halvable;
      break;
    case "cookies":
    case "cupcakes":
      halvable = true;
      break;
    case "bread":
    case "cake":
    case "pie":
    case "muffins":
    case "brownies":
    default:
      halvable = false;
      break;
  }

  // TODO: rewrite this terrible system
  // this is a temporary workaround for a cookie recipe that can be made into bars
  if (recipe.title == "Lemon Glaze Cookies") {
    halvable = false;
  }

  return (
    <section>
      <ContentHolder recipe={recipe} quantity={quantity} halvable={halvable} />
    </section>
  );
}
