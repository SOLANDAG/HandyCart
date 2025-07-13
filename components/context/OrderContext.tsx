import React, { createContext, useContext, useState } from 'react';
import { CartItem } from './CartContext';

// Represents an individual order with a unique ID, items in the cart, and its status.
type Order = {
  id: number;
  items: CartItem[];
  status: 'active' | 'cancelled' | 'delivered';
};

// Defines the structure of the order context, exposing state and actions.
type OrderContextType = {
  orders: Order[];
  addOrder: (items: CartItem[]) => void;
  cancelOrder: (id: number) => void;
  markOrderDelivered: (id: number) => void;
};


// Context Initialization
const OrderContext = createContext<OrderContextType | undefined>(undefined);
let nextOrderId = 1; // Keeps track of the next unique order ID

// Wraps children with order state management using context.
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

// Adds a new order with the current cart items and assigns an ID.
  const addOrder = (items: CartItem[]) => {
    const newOrder: Order = {
      id: nextOrderId++,
      items,
      status: 'active',
    };
    setOrders((prev) => [...prev, newOrder]);
  };

// Updates the order status to 'cancelled'.
  const cancelOrder = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: 'cancelled' } : order
      )
    );
  };

// Updates the order status to 'delivered'.
  const markOrderDelivered = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: 'delivered' } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder, markOrderDelivered }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the order context. Throws error if not wrapped in OrderProvider.
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};