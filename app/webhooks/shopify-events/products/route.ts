import { CACHE_TAG_PRODUCTS } from '@/app/api/requests';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export const POST = async (_req: NextRequest) => {
  console.info('Products cache updating.');
  revalidateTag(CACHE_TAG_PRODUCTS);
  return new Response(null, { status: 200 });
};
