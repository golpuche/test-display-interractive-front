import {ReactElement} from "react";
import Link from "next/link";

type Customer = {
  id: string;
  title: string;
  lastname?: string
  firstname?: string;
  postal_code?: string;
  city?: string;
  email?: string;
}

export default async function Customers(): Promise<ReactElement> {
  let response;

  try {
    response = await fetch(`${process.env.API_URI}/customers`);
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

  const data: Customer[] = await response.json();

  return (
      <div className="ml-6 mt-6">
        <table className="table-auto">
          <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Title</th>
            <th className="border px-2 py-1">Lastname</th>
            <th className="border px-2 py-1">Firstname</th>
            <th className="border px-2 py-1">Postal code</th>
            <th className="border px-2 py-1">City</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
          </thead>
          <tbody>
          {data.map((customer: Customer, index: number) => (
              <tr key={index}>
                <td className="border px-2 py-1">{customer.id}</td>
                <td className="border px-2 py-1">{customer.title}</td>
                <td className="border px-2 py-1">{customer.lastname}</td>
                <td className="border px-2 py-1">{customer.firstname}</td>
                <td className="border px-2 py-1">{customer.postal_code}</td>
                <td className="border px-2 py-1">{customer.city}</td>
                <td className="border px-2 py-1">{customer.email}</td>
                <td className="border px-2 py-1"><Link href={`customers/${customer.id}/orders`}>Voir orders</Link></td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}
