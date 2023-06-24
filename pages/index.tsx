import type { NextPage } from 'next';
import * as React from 'react';
import { Navbar } from '../components/navbar';

const Home: NextPage = () => {
  const [amount, setAmount] = React.useState<string>('0');
  const [percentage, setPercentage] = React.useState<string>('5');
  const [tip, setTip] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);


  const onSubmit = (event: any) => {
    event.preventDefault();
    
    const value = Number(amount) * (Number(percentage) / 100);
    setTip(value);
    setTotal(Number(amount) +  value);
   
  }

  return (
    <>
      <Navbar section='calculator' />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Percentage Calculator
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmit}>
          <div>
              <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="percentage" className="block text-sm font-medium leading-6 text-gray-900">
                Percentage
              </label>
              <div className="mt-2">
                <select
                  id="percentage"
                  name="percentage"
                  required
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={5}
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                >
                  <option value={5}>5 %</option>
                  <option value={10}>10 %</option>
                  <option value={15}>15 %</option>
                </select>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Calculate
              </button>
            </div>
          </form>
          <div
            className="relative mt-3 flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-lg text-gray-900">Total tip: {tip}</p>
              <p className="truncate text-xl text-gray-900">Total amount: {total}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
