import { tipOptions } from "../data/tips";
import { Dispatch, SetStateAction } from "react";

type TipInputProps = {
  setTip: Dispatch<SetStateAction<number>>;
  tip : number;
};

const TipInput = ({ setTip, tip }: TipInputProps) => {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina:</h3>

      <form className="flex gap-x-5 mt-3">
        {tipOptions.map((tipOptions) => (
          <div key={tipOptions.id} className="flex items-center">
            <input
              type="radio"
              name="tip"
              id={tipOptions.id}
              value={tipOptions.value}
              onChange={(e) => setTip(Number(+e.target.value))}
              checked={tip === tipOptions.value}
            />
            <label htmlFor={tipOptions.id} className="ml-2">
              {tipOptions.label}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default TipInput;
