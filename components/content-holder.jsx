'use client';

import Balancer from 'react-wrap-balancer';
import { Mdx } from 'components/mdx';
import Link from 'next/link';
import { useQueryParam, StringParam, withDefault } from 'use-query-params';

export default function ContentHolder({ recipe, quantity, halvable }) {
    const [selectedQuantity, setSelectedQuantity] = useQueryParam('quantity', withDefault(StringParam, quantity));
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
            case "triple":
                return 3;
            case "quadruple":
                return 4;
        }
    }
    

    return (
        <>
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
                <select value={selectedQuantity} onChange={handleQuantityChange} onKeyUp={handleQuantityChange} className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-2 py-1 tracking-tighter">
                    {halvable ? <option key="half" value="half">Half batch</option> : null}
                    <option key="single" value="single">Single batch</option>
                    <option key="double" value="double">Double batch</option>
                    <option key="triple" value="triple">Triple batch</option>
                    <option key="quadruple" value="quadruple">Quadruple batch</option>
                </select>
            </div>

            <Mdx code={recipe.body.code} quantity={numericalQuantity(selectedQuantity)} />
        </>
    );
};