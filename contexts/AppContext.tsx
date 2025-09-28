
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, User, Product, Order } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  wishlist: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: AppState = {
  user: null,
  cart: [],
  orders: [],
  wishlist: [],
  isAuthenticated: false,
  isLoading: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => 
        item.productId === action.payload.productId && 
        item.size.id === action.payload.size.id && 
        item.color.id === action.payload.color.id
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  getTotalCartAmount: () => number;
  getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToCart = (item: CartItem) => {
    console.log('Adding to cart:', item);
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId: string) => {
    console.log('Removing from cart:', itemId);
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    console.log('Updating cart item:', itemId, quantity);
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = () => {
    console.log('Clearing cart');
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (productId: string) => {
    console.log('Adding to wishlist:', productId);
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  };

  const removeFromWishlist = (productId: string) => {
    console.log('Removing from wishlist:', productId);
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const getTotalCartAmount = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value: AppContextType = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    getTotalCartAmount,
    getCartItemCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
