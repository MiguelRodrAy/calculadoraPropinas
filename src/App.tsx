import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotal from "./components/OrderTotal";
import TipInput from "./components/TipInput";
import { menuItems } from "./data/db";
import { useMemo, useReducer } from "react";
import { orderReducer, initialState } from "./reducers/order-reducer";

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useMemo(() => {
    if (state.showModal) {
      setTimeout(() => {
        dispatch({ type: "SWITCH_MODAL", payload: false });
      }, 2000);
    }
  }, [state.showModal]);

  return (
    <>
      <header className='bg-primary text-white py-5'>
        <h1 className='text-center text-4xl font-black'>
          Calculadora de Propinas
        </h1>
      </header>

      <main className='max-w-6xl mx-auto py-20 grid md:grid-cols-2 gap-10'>
        <div className='p-5'>
          <h2 className='text-4xl font-black'>Menú</h2>

          <div className='space-y-3'>
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </div>
        </div>

        <div className='border border-dashed border-secondary p-5 rounded-lg space-y-10 m-3'>
          <h2 className='font-black text-4xl'> Cuenta</h2>

          {state.order.length > 0 ? (
            <>
              <OrderContents order={state.order} dispatch={dispatch} />

              <TipInput tip={state.tip} dispatch={dispatch} />

              <OrderTotal
                order={state.order}
                tip={state.tip}
                dispatch={dispatch}
              />
            </>
          ) : (
            <p className='text-center'>No hay nada en el pedido</p>
          )}
        </div>

        {state.showModal && (
          <div className='fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-md w-1/3'>
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>¡Pedido realizado!</h2>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  fill='currentColor'
                  className='bi bi-check-circle-fill text-primary ml-2'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                </svg>
              </div>

              <p className='mt-4'>Tu pedido ha sido completado exitosamente.</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
