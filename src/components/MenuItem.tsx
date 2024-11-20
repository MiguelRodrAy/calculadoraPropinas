import type { MenuItem } from "../types";
import { formatCurrency } from "../helpers";
import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

type MenuItemProps = {
  item: MenuItem;
  dispatch: Dispatch<OrderActions>;
};

const MenuItem = ({ item, dispatch }: MenuItemProps) => {
  return (
    <>
      <button
        className='border-2 border-primary hover:bg-primaryLight rounded-md w-full p-3 flex justify-between'
        onClick={() => dispatch({ type: "ADD_ITEM", payload: { item } })}
      >
        <p>{item.name}</p>
        <p className='font-black'>{formatCurrency(item.price)}</p>
      </button>
    </>
  );
};

export default MenuItem;
