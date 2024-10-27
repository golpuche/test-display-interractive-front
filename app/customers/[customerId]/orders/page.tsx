import {ReactElement} from "react";
import Link from "next/link";

type Order = {
  last_name: string;
  purchase_identifier: string;
  product_id?: string
  quantity: number;
  price: number
  currency: string;
  date: string;
}

export default async function Orders({params}: { params: Promise<{ customerId: string }>}): Promise<ReactElement> {
  const {customerId} = await params

  let response;

  try {
    response = await fetch(`${process.env.API_URI}/customers/${customerId}/orders`);
  } catch {
    return (
        <div className="ml-6 mt-6">
          Une erreur est survenue sur cette page
        </div>
    )
  }

  if(!response.ok) {
    return (
        <div className="ml-6 mt-6">
          Une erreur est survenue sur cette page
        </div>
    )
  }

  const data: Order[] = await response.json();

  const totalOrders = data.reduce((total: number, {quantity, price}: Order) => total + quantity * price, 0);

  return (
      <div className="ml-6 mt-6">
        <table className="table-auto">
          <thead>
          <tr>
            <th className="border px-2 py-1">Lastname</th>
            <th className="border px-2 py-1">Purchase identifier</th>
            <th className="border px-2 py-1">Product ID</th>
            <th className="border px-2 py-1">Quantity</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Currency</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
          </thead>
          <tbody>
          {data.map((order: Order, index: number) => (
              <tr key={index}>
                <td className="border px-2 py-1">{order.last_name}</td>
                <td className="border px-2 py-1">{order.purchase_identifier}</td>
                <td className="border px-2 py-1">{order.product_id}</td>
                <td className="border px-2 py-1">{order.quantity}</td>
                <td className="border px-2 py-1">{order.price}</td>
                <td className="border px-2 py-1">{order.currency}</td>
                <td className="border px-2 py-1">{order.date}</td>
              </tr>
          ))}
          </tbody>
        </table>
        <div className='my-5'>Total orders: <b className="total-orders">{totalOrders}</b></div>
        <Link href="/">Retour</Link>
      </div>
  );
}

