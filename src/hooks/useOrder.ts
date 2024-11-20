import { useState } from "react";
import type { OrderItem, MenuItem } from "../types";

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [tip, setTip] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 10;

  const addItem = (item: MenuItem) => {
    const itemExists = order.find((orderItem) => orderItem.id === item.id);

    if (itemExists) {
      if (itemExists.quantity >= MAX_ITEMS) {
        return;
      }
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );

      setOrder(updatedOrder);
    } else {
      const newItem: OrderItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    }
  };

  const removeItem = (itemId: MenuItem["id"]) => {
    const newOrder = order.filter((orderItem) => orderItem.id !== itemId);
    setOrder(newOrder);
  };

  const decreaseItemQuantity = (itemId: MenuItem["id"]) => {
    const newOrder = order.map((orderItem) =>
      orderItem.id === itemId
        ? { ...orderItem, quantity: orderItem.quantity - 1 }
        : orderItem
    );

    if (
      newOrder.find((orderItem) => orderItem.id === itemId)!.quantity <
      MIN_ITEMS
    ) {
      removeItem(itemId);
      return;
    }

    setOrder(newOrder);
  };

  const placeOrder = () => {
    setOrder([]);
    setTip(0);

    //Guardar pedido

    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  return {
    order,
    tip,
    showModal,
    setTip,
    addItem,
    removeItem,
    decreaseItemQuantity,
    placeOrder,
  };
}
