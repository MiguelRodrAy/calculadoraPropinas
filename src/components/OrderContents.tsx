import type { OrderItem, MenuItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderContentsProps = {
  order: OrderItem[];
  removeItem: (id: MenuItem["id"]) => void;
  decreaseItemQuantity: (id: MenuItem["id"]) => void;
};

const OrderContents = ({
  order,
  removeItem,
  decreaseItemQuantity,
}: OrderContentsProps) => {
  return (
    <div>
      <div className="space-y-3 mt-5">
        {order.map((orderItem: OrderItem) => (
          <div
            key={orderItem.id}
            className="flex justify-between items-center border-t border-primary py-3 last-of-type:border-b group"
          >
            <p>
              {orderItem.quantity} x {orderItem.name} -{" "}
              {formatCurrency(orderItem.quantity * orderItem.price)}
            </p>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="font-black text-[11px] rounded-full px-[12px] py-[6px] bg-slate-600 text-white"
                onClick={() => decreaseItemQuantity(orderItem.id)}
              >
                -
              </button>

              <button
                className="font-black text-[11px] rounded-full px-[11px] py-[6px] bg-red-600 text-white"
                onClick={() => removeItem(orderItem.id)}
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
