// Define the structure of a cart item
import { CartItem } from "./types";

// Utility functions for managing the cart using localStorage
export const CartUtils = {
  // Add an item to the cart
  addToCart: (item: CartItem): void => {
    // Retrieve existing cart or initialize empty array
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // If item is new, add to cart
      cart.push(item);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  
  // Retrieve the entire cart
  getCart: (): CartItem[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  },
  
  // Remove a specific item from the cart
  removeFromCart: (itemId: string): void => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    // Filter out the item with the matching ID
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
  },
  
  // Clear the entire cart
  clearCart: (): void => {
    localStorage.removeItem('cart');
  }
};