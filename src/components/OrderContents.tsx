import type { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";
import { Dispatch } from "react";

type OrderContentsProps = {
  order: OrderItem[];
  dispatch: Dispatch<OrderActions>;
};

const OrderContents = ({ order, dispatch }: OrderContentsProps) => {
  return (
    <div>
      <div className='space-y-3 mt-5'>
        {order.map((orderItem: OrderItem) => (
          <div
            key={orderItem.id}
            className='flex justify-between items-center border-t border-primary py-3 last-of-type:border-b group'
          >
            <p>
              {orderItem.quantity} x {orderItem.name} -{" "}
              {formatCurrency(orderItem.quantity * orderItem.price)}
            </p>

            <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
              <button
                className='font-black text-[11px] rounded-full px-[12px] py-[6px] bg-slate-600 text-white'
                onClick={() =>
                  dispatch({
                    type: "DECREASE_ITEM_QUANTITY",
                    payload: orderItem,
                  })
                }
              >
                -
              </button>

              <button
                className='font-black text-[11px] rounded-full px-[11px] py-[6px] bg-red-600 text-white'
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: orderItem })
                }
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderContents;
