import type { MenuItem } from "../types";
import { formatCurrency } from "../helpers";

type MenuItemProps = {
  item: MenuItem;
  addItem: (item : MenuItem) => void
};

const MenuItem = ({ item, addItem }: MenuItemProps) => {
  return (
    <>
    <button className="border-2 border-primary hover:bg-primaryLight rounded-md w-full p-3 flex justify-between"
    onClick={() => addItem(item)}>
      <p>{item.name}</p>
      <p className="font-black">{formatCurrency(item.price)}</p>
      </button>
    </>
  );
};

export default MenuItem;
