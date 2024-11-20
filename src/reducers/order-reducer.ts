import type { MenuItem, OrderItem } from "../types";

export type OrderActions =
  | { type: "ADD_ITEM"; payload: { item: MenuItem } }
  | { type: "REMOVE_ITEM"; payload: { id: MenuItem["id"] } }
  | { type: "PLACE_ORDER" }
  | { type: "SET_TIP"; payload: { value: number } }
  | { type: "DECREASE_ITEM_QUANTITY"; payload: { id: MenuItem["id"] } }
  | { type: "SWITCH_MODAL"; payload: boolean };

export type OrderState = {
  order: OrderItem[];
  tip: number;
  showModal: boolean;
};

export const initialState: OrderState = {
  order: [],
  tip: 0,
  showModal: false,
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 10;

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  switch (action.type) {
    case "ADD_ITEM":
      const itemExists = state.order.find(
        (orderItem) => orderItem.id === action.payload.item.id
      );

      let updatedOrder: OrderItem[] = [];

      if (itemExists) {
        if (itemExists.quantity >= MAX_ITEMS) {
          return state;
        }

        updatedOrder = state.order.map((orderItem) =>
          orderItem.id === action.payload.item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        const newItem: OrderItem = {
          ...action.payload.item,
          quantity: 1,
        };

        updatedOrder = [...state.order, newItem];
      }

      return {
        ...state,
        order: updatedOrder,
      };
    case "REMOVE_ITEM":
      const newOrder = state.order.filter(
        (orderItem) => orderItem.id !== action.payload.id
      );

      return {
        ...state,
        order: newOrder,
      };

    case "DECREASE_ITEM_QUANTITY":
      let order: OrderItem[] = [];

      order = state.order.map((orderItem) =>
        orderItem.id === action.payload.id
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      );

      if (
        order.find((orderItem) => orderItem.id === action.payload.id)!
          .quantity < MIN_ITEMS
      ) {
        order = state.order.filter(
          (orderItem) => orderItem.id !== action.payload.id
        );
      }

      return {
        ...state,
        order,
      };

    case "PLACE_ORDER":
      return {
        ...state,
        order: [],
        tip: 0,
        showModal: true,
      };
    case "SET_TIP":
      const tip = action.payload.value;

      return {
        ...state,
        tip,
      };

    case "SWITCH_MODAL":
      const showModal = action.payload;
      return {
        ...state,
        showModal,
      };
    default:
      return state;
  }
};
