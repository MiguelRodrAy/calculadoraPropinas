import { tipOptions } from "../data/tips";
import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

type TipInputProps = {
  dispatch: Dispatch<OrderActions>;
  tip: number;
};

const TipInput = ({ dispatch, tip }: TipInputProps) => {
  return (
    <div>
      <h3 className='font-black text-2xl'>Propina:</h3>

      <form className='flex gap-x-5 mt-3'>
        {tipOptions.map((tipOptions) => (
          <div key={tipOptions.id} className='flex items-center'>
            <input
              type='radio'
              name='tip'
              id={tipOptions.id}
              value={tipOptions.value}
              onChange={(e) => {
                dispatch({
                  type: "SET_TIP",
                  payload: { value: Number(e.target.value) },
                });
              }}
              checked={tip === tipOptions.value}
            />
            <label htmlFor={tipOptions.id} className='ml-2'>
              {tipOptions.label}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default TipInput;
