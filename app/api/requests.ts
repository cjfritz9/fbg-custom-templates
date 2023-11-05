import {
  FormattedProduct,
  FormattedProductResponse,
  QueryResult
} from '@/@types/api';
import { FilterMethods, NewReviewData } from '@/@types/shop';
import { cache } from 'react';
import ShopifyBuy, {
  CheckoutLineItem,
  CheckoutLineItemUpdateInput
} from 'shopify-buy';

export const getHomeContent = cache(async () => {
  const response = await fetch(`/api/content/home`);
  const result = await response.json();

  return result;
});

export const getAboutContent = cache(async () => {
  const response = await fetch(`${process.env.BASE_API_URL}/content/about`);
  const result = await response.json();

  return result;
});

export const getProducts = cache(
  async (): Promise<FormattedProductResponse> => {
    const response = await fetch(`/api/products`);
    const results = await response.json();

    return results;
  }
);

export const getPaginatedProducts = cache(
  async (query: string): Promise<FormattedProductResponse> => {
    const response = await fetch(`/api/products?${query}`);
    const results = await response.json();

    return results;
  }
);

export const getProductByHandle = cache(
  async (handle: string): Promise<FormattedProduct> => {
    const response = await fetch(
      `${process.env.BASE_API_URL}/products/${handle}`
    );
    const result = await response.json();

    return result;
  }
);

export const getProductsByTag = cache(
  async (tag: FilterMethods): Promise<FormattedProductResponse> => {
    const response = await fetch(`/api/products/tags/${tag}`);
    const results = await response.json();

    return results;
  }
);

export const getProductsByQuery = cache(
  async (query: string): Promise<QueryResult[]> => {
    const response = await fetch(`/api/products/search?query=${query}`);
    const results = await response.json();

    return results;
  }
);

export const getReviewsByProductHandle = cache(
  async (handle: string): Promise<any> => {
    const response = await fetch(
      `/api/reviews?handle=${handle}&page=1&perPage=1000`
    );
    const results = await response.json();

    return results;
  }
);

export const createReviewByProductHandle = cache(
  async (reviewData: NewReviewData): Promise<any> => {
    const response = await fetch(`/api/reviews?handle=${reviewData.handle}`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
    const results = await response.json();

    return results;
  }
);

export const getCheckout = cache(
  async (checkoutId: string): Promise<ShopifyBuy.Checkout> => {
    const response = await fetch(`/api/checkout?id=${checkoutId}`);
    const result = await response.json();

    return result;
  }
);

export const createCheckout = cache(async (): Promise<ShopifyBuy.Checkout> => {
  const response = await fetch(`/api/checkout`, {
    method: 'POST'
  });
  const result = await response.json();

  return result;
});

export const addItemsToCheckout = cache(
  async (
    checkoutId: string,
    lineItems: any[]
  ): Promise<ShopifyBuy.Checkout> => {
    const response = await fetch(`/api/checkout/add-items?id=${checkoutId}`, {
      method: 'POST',
      body: JSON.stringify({ lineItems })
    });
    const result = await response.json();

    return result;
  }
);

export const removeItemsFromCheckout = cache(
  async (
    checkoutId: string,
    lineItemIds: string[]
  ): Promise<ShopifyBuy.Checkout> => {
    const response = await fetch(
      `/api/checkout/remove-items?id=${checkoutId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ lineItemIds })
      }
    );
    const result = await response.json();

    return result;
  }
);

export const updateItemsInCheckout = cache(
  async (
    checkoutId: string,
    lineItems: ShopifyBuy.CheckoutLineItemUpdateInput[]
  ): Promise<ShopifyBuy.Checkout> => {
    const response = await fetch(
      `/api/checkout/remove-items?id=${checkoutId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ lineItems })
      }
    );
    const result = await response.json();

    return result;
  }
);

export const postCaptchaResult = cache(async (token: string): Promise<any> => {
  const response = await fetch('/api/auth/recaptcha', {
    method: 'POST',
    body: JSON.stringify(token)
  });

  const result = await response.json();

  return result;
});
