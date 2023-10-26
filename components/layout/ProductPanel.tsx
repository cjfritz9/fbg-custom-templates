'use client';

import { ProductPanelProps } from '@/@types/props';
import React, { Fragment, useState } from 'react';
import ReviewStars from '../UI/ReviewStars';
import Border from './Border';
import Button from '../actions/Button';
import { IoBookmarkOutline } from 'react-icons/io5';
import { Listbox, Transition } from '@headlessui/react';
import {
  HiChevronUpDown,
  HiOutlineCheck,
  HiOutlineCheckBadge
} from 'react-icons/hi2';

const ProductPanel: React.FC<ProductPanelProps> = ({ product }) => {
  const [variant, setVariant] = useState(
    product.variants ? product.variants[0] : 'Default Title'
  );

  return (
    <div className='flex flex-col gap-8 max-w-[40rem]'>
      <div>
        <h2 className='text-4xl font-bold'>{product.title}</h2>
        <ReviewStars reviews={product.reviews} styles='!text-2xl' showCount />
      </div>
      {product.variants && product.variants.length > 1 && (
        <>
          <Border />
          <p className='uppercase font-semibold text-xl'>SELECT OPTION</p>

          <Listbox value={variant} onChange={setVariant}>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full rounded-md bg-base-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-lg'>
                <span className='block truncate'>{variant}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <HiChevronUpDown
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-lg z-50'>
                  {product.variants.map((variant) => (
                    <Listbox.Option
                      key={variant}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={variant}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {variant}
                          </span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                              <HiOutlineCheckBadge
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </>
      )}
      <Border />
      <div className='flex flex-col gap-4 py-4 -my-4 xl:sticky xl:top-0 bg-base-100'>
        <h4 className='text-2xl xl:text-3xl font-bold tracking-widest'>
          ${product.minPrice}
        </h4>
        <div className='flex gap-4 '>
          <Button styles='btn-primary grow h-16 font-bold text-lg fixed bottom-0 -mx-4 z-30 xl:static xl:mx-0'>
            ADD TO CART
          </Button>
          <div
            className='hidden xl:inline-block tooltip'
            data-tip='Bookmark this item'
          >
            <Button styles='btn-base-200 border border-primary h-16 font-bold text-2xl !w-24 hover:bg-base-100'>
              <IoBookmarkOutline />
            </Button>
          </div>
        </div>
      </div>
      <Border />
      <div>
        <p className='uppercase font-semibold text-xl pb-4'>DESCRIPTION</p>
        <div className='custom-scroll overflow-y-auto text-lg'>
          <p>{product.description}</p>
        </div>
      </div>
      {product.includes && product.includes.length > 0 && (
        <>
          <Border />
          <div>
            <p className='uppercase font-semibold text-xl pb-4'>INCLUDES</p>
            <ul className='custom-scroll list-disc pl-5 overflow-y-auto text-lg'>
              {product.includes.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      {product.specs && product.specs.length > 0 && (
        <>
          <Border />
          <div>
            <p className='uppercase font-semibold text-xl pb-4'>Specs</p>
            <ul className='custom-scroll list-disc pl-5 overflow-y-auto text-lg'>
              {product.specs.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPanel;