import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { useMemo } from "react";
import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalProp = {
  order: OrderItem[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

const OrderTotal = ({ order, tip, dispatch }: OrderTotalProp) => {
  //useMemo() y useCallback() --> con useCallback hay que estar llamando como funciones
  // Pej: const total = useCallBack(() => subTotal() + tipTotal(), [subTotal, tipTotal]);

  const subTotal = useMemo(
    () =>
      order.reduce(
        (total, orderItem) => total + orderItem.price * orderItem.quantity,
        0
      ),
    [order]
  );
  const tipTotal = useMemo(() => subTotal * tip, [subTotal, tip]);
  const total = useMemo(() => subTotal + tipTotal, [subTotal, tipTotal]);

  return (
    <>
      <div>
        <h2 className='font-black text-2xl'>Total y Propina</h2>

        <div className='mt-2 flex items-center justify-between'>
          <p className='font-bold'>Total:</p>
          <div className='flex-grow border-t border-dotted mx-2'></div>
          <p>{formatCurrency(subTotal)}</p>
        </div>

        {tip > 0 && (
          <>
            <div className='mt-2 flex items-center justify-between'>
              <p className='font-bold'>Propina:</p>
              <div className='flex-grow border-t border-dotted mx-2'></div>
              <p>{formatCurrency(tipTotal)}</p>
            </div>

            <div className='mt-2 flex items-center justify-between'>
              <p className='font-bold'>Total a pagar:</p>
              <div className='flex-grow border-dotted '></div>
              <p>{formatCurrency(total)}</p>
            </div>
          </>
        )}
      </div>

      <button
        className='w-full bg-primary text-white font-black rounded-md uppercase p-3
        disabled:bg-disabled'
        disabled={tip === 0}
        onClick={() => dispatch({ type: "PLACE_ORDER" })}
      >
        Realizar pedido
      </button>
    </>
  );
};

export default OrderTotal;
