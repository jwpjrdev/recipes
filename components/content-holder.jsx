'use client';

import { Mdx } from 'components/mdx';
import { ThemeToggle } from 'components/theme-toggle';
import Link from 'next/link';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';

export default function ContentHolder({ recipe, quantity, halvable }) {
    const [selectedQuantity, setSelectedQuantity] = useQueryParam('quantity', withDefault(StringParam, quantity));
    const [selectedMode, setSelectedMode] = useQueryParam('mode', StringParam);
    const mode = selectedMode === 'concise' ? 'concise' : 'detailed';
    if (!halvable && selectedQuantity == "half") {
        setSelectedQuantity("single");
    }

    function handleQuantityChange(event) {
        setSelectedQuantity(event.target.value);
    };

    function numericalQuantity(quantity) {
        switch (quantity) {
            case "half":
                return 0.5;
            case "single":
            default:
                return 1;
            case "double":
                return 2;
        }
    }
    
    const printBatchLabel = selectedQuantity === "half"
        ? "half batch"
        : selectedQuantity === "double"
            ? "double batch"
            : null;
    const printTitleSuffix = [
        printBatchLabel,
        mode === 'concise' ? 'concise' : null,
    ].filter(Boolean).join(', ');

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h1 className="min-w-0 font-bold text-3xl font-serif">
                    {recipe.title}{printTitleSuffix && <span className="print-title-suffix">—{printTitleSuffix}</span>}
                </h1>
                <ThemeToggle />
            </div>
            <div className="recipe-controls grid grid-cols-[auto_1fr_auto] items-center mt-4 mb-8 font-mono text-sm">
                <Link className="recipe-home-link justify-self-start" key={recipe.slug} href={`/`}>
                    <div className="whitespace-nowrap rounded-md border border-neutral-200 px-2 py-1 tracking-tighter transition-colors duration-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 max-[420px]:px-1.5 max-[420px]:text-xs">
                        <span className="max-[420px]:hidden">back to home</span>
                        <span className="hidden items-center gap-1 max-[420px]:flex">
                            <svg aria-hidden="true" className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                                <path d="M10 6H2m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                            Recipes
                        </span>
                    </div>
                </Link>
                <div className="recipe-controls-divider h-[0.2em] bg-neutral-50 dark:bg-neutral-800 mx-2" />
                <div className="flex items-center gap-2 max-[420px]:gap-1">
                    <div className="relative">
                        <select aria-label="Recipe detail level" value={mode} onChange={(event) => setSelectedMode(event.target.value)} className="appearance-none rounded-md border border-neutral-200 bg-transparent pl-2 pr-7 py-1 tracking-tighter transition-colors duration-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 max-[420px]:pl-1.5 max-[420px]:pr-5 max-[420px]:text-xs">
                            <option value="concise">Concise</option>
                            <option value="detailed">Detailed</option>
                        </select>
                        <svg aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 max-[420px]:right-1.5 max-[420px]:h-2.5 max-[420px]:w-2.5" viewBox="0 0 12 12" fill="none">
                            <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </div>
                    <div className="relative">
                        <select aria-label="Batch size" value={selectedQuantity} onChange={handleQuantityChange} onKeyUp={handleQuantityChange} className="appearance-none rounded-md border border-neutral-200 bg-transparent pl-2 pr-7 py-1 tracking-tighter transition-colors duration-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 max-[420px]:pl-1.5 max-[420px]:pr-5 max-[420px]:text-xs">
                            {halvable ? <option key="half" value="half">Half batch</option> : null}
                            <option key="single" value="single">Single batch</option>
                            <option key="double" value="double">Double batch</option>
                        </select>
                        <svg aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 max-[420px]:right-1.5 max-[420px]:h-2.5 max-[420px]:w-2.5" viewBox="0 0 12 12" fill="none">
                            <path d="m2 4 4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>
            </div>

            <Mdx code={recipe.body.code} quantity={numericalQuantity(selectedQuantity)} mode={mode} />
        </>
    );
};