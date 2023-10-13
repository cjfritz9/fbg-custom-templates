'use client';

import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { useDebounce } from 'use-debounce';
import { Products } from '@/@types/shopify';
import useIsClient from '@/lib/hooks/useIsClient';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Products>([]);
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        // TODO: USE SHOPIFY API QUERY HERE
        const response = { data: [] };
        const { data: results } = response;

        if (results.length === 0) {
          setProducts([{ title: 'No Results', slug: '' }]);
        } else {
          setProducts(results);
        }
      })();
      return () => {
        controller.abort();
      };
    } else {
      setProducts([]);
    }
  }, [debouncedQuery]);

  if (isClient) {
    <div className='form-control'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered border-secondary bg-primary-content w-24 md:w-auto disabled'
      />
    </div>;
  }

  const handleChange = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <div className='form-control'>
      <div className='relative'>
        <Combobox onChange={handleChange}>
          <Combobox.Input
            placeholder='Search...'
            className='input input-bordered border-secondary bg-primary-content w-24 md:w-auto'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Combobox.Options className='absolute bg-base-100 py-1 w-full'>
            {products.map((product: any) => (
              <Combobox.Option key={product.slug} value={product.slug}>
                {({ active }) => (
                  <span
                    className={`block px-2 truncate w-full text-primary-content ${
                      active && product[0]
                        ? 'bg-neutral text-base-100'
                        : 'bg-base-100 text-neutral'
                    }`}
                  >
                    {product.title}
                  </span>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
};

export default SearchBar;