'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { recipeCategories } from 'lib/recipe-categories';
import { ThemeToggle } from 'components/theme-toggle';

const categoryOrder = Object.keys(recipeCategories);

function CategoryCard({ category, recipes }) {
  return (
    <section className="break-inside-avoid rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <h2 className="mb-3 text-xl font-bold">{recipeCategories[category]?.label ?? category}</h2>
      <div className="flex flex-col gap-2">
        {recipes
          .filter(recipe => recipe.category === category)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map(recipe => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="w-fit hover:underline"
            >
              {recipe.title}
            </Link>
          ))}
      </div>
    </section>
  );
}

function getCategoryColumns(categories, recipes, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  const columnLoads = Array(columnCount).fill(0);
  const regularCategories = categories.filter(category => !recipeCategories[category]?.appearsLast);
  const lastCategories = categories.filter(category => recipeCategories[category]?.appearsLast);

  for (const category of [...regularCategories, ...lastCategories]) {
    const columnIndex = columnLoads.indexOf(Math.min(...columnLoads));
    const recipeCount = recipes.filter(recipe => recipe.category === category).length;
    columns[columnIndex].push(category);
    columnLoads[columnIndex] += recipeCount + 1;
  }

  return columns;
}

export function RecipeDirectory({ recipes }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecipes = recipes
    .filter(recipe => recipe.title.toLowerCase().includes(normalizedQuery));
  const categories = [...new Set(filteredRecipes.map(recipe => recipe.category))].sort((a, b) => {
    const appearsLastA = recipeCategories[a]?.appearsLast ?? false;
    const appearsLastB = recipeCategories[b]?.appearsLast ?? false;
    if (appearsLastA !== appearsLastB) return appearsLastA ? 1 : -1;

    const orderA = categoryOrder.indexOf(a);
    const orderB = categoryOrder.indexOf(b);
    if (orderA !== -1 || orderB !== -1) {
      return (orderA === -1 ? categoryOrder.length : orderA)
        - (orderB === -1 ? categoryOrder.length : orderB);
    }

    return (recipeCategories[a]?.label ?? a).localeCompare(recipeCategories[b]?.label ?? b);
  });

  return (
    <section>
      <header className="mb-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Josh's Recipes</h1>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-56 md:w-64">
              <label htmlFor="recipe-search" className="sr-only">Search recipes</label>
              <input
                ref={inputRef}
                id="recipe-search"
                type="text"
                role="searchbox"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search recipes"
                className="recipe-search-input h-9 w-full rounded-md border border-neutral-200 bg-transparent px-2 py-1 pr-9 font-mono text-[15px] tracking-tighter transition-colors duration-200 placeholder:text-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear recipe search"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-neutral-500 hover:bg-neutral-100 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                    <path d="m4 4 8 8m0-8-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                  </svg>
                </button>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
      </header>
      {categories.length > 0 ? (
        <>
        <div className="flex flex-col gap-6 sm:hidden">
          {categories.map(category => (
            <CategoryCard key={category} category={category} recipes={filteredRecipes} />
          ))}
        </div>
        <div className="hidden grid-cols-2 items-start gap-6 sm:grid xl:hidden">
          {getCategoryColumns(categories, filteredRecipes, 2).map((column, index) => (
            <div key={index} className="flex flex-col gap-6">
              {column.map(category => (
                <CategoryCard key={category} category={category} recipes={filteredRecipes} />
              ))}
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-3 items-start gap-6 xl:grid">
          {getCategoryColumns(categories, filteredRecipes, 3).map((column, index) => (
            <div key={index} className="flex flex-col gap-6">
              {column.map(category => (
                <CategoryCard key={category} category={category} recipes={filteredRecipes} />
              ))}
            </div>
          ))}
        </div>
        </>
      ) : (
        <p>No recipes match &ldquo;{query}&rdquo;.</p>
      )}
    </section>
  );
}
