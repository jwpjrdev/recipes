import { allRecipes } from 'contentlayer/generated';

// Currently, params isn't correctly passted to `generateMetadata`.
// Once that's fixed, I can remove `head.tsx`.
export async function generateMetadata({ params }) {
  const post = allRecipes.find((post) => post.slug === params.slug);
  const {
    title: postTitle,
    slug,
  } = post;
  const title = `Josh Price - ${postTitle}`;

  return {
    title,
  };
}
