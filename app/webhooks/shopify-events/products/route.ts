import { CACHE_TAG_PRODUCTS } from '@/app/api/requests';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const data = await req.text();

  console.log('Webhook received...')
  const hmacHeader = req.headers.get('X-Shopify-Hmac-Sha256');
  const digest = crypto
    .createHmac(
      process.env.HASH_HMAC_ALGORITHM!,
      process.env.SHOPIFY_WEBHOOK_SIGNATURE!
    )
    .update(data)
    .digest(process.env.HASH_HMAC_ENCODING! as crypto.BinaryToTextEncoding);
  
  if (hmacHeader === digest) {
    console.log('Webhook validated...')
    console.log('products cache updating.')
    revalidateTag(CACHE_TAG_PRODUCTS);
    return new Response(null, { status: 200 });
  } else {
    return new Response('Unauthorized Request', {
      status: 401
    })
  }
};
