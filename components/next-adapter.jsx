// I couldn't figure out how to import it so I just copy+pasted it
// https://github.com/amannn/next-query-params/blob/main/packages/next-query-params/src/NextAdapterApp.tsx

'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {memo, useMemo} from 'react';

function NextAdapter({children}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const adapter = useMemo(() => {
    function getUrl(location) {
      let url = pathname;
      if (location.search) {
        url += location.search;
      }
      if (window.location.hash) {
        url += window.location.hash;
      }

      return url;
    }

    return {
      replace(location) {
        router.replace(getUrl(location));
      },
      push(location) {
        router.push(getUrl(location));
      },
      location: {
        search: searchParams.toString()
      }
    };
  }, [searchParams, pathname, router]);

  return children(adapter);
}

export default memo(NextAdapter);