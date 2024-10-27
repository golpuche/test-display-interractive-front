import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Orders from "./page";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Orders Component', () => {

  it('renders orders data in a table when API request succeeds', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      {
        last_name: 'Doe',
        purchase_identifier: 122,
        product_id: 15,
        quantity: 20,
        price: 10,
        currency: 'euros',
        date: '20/12/2024'
      },
      {
        last_name: 'Doe',
        purchase_identifier: 1220,
        product_id: 150,
        quantity: 10,
        price: 5,
        currency: 'euros',
        date: '25/12/2024'
      },
    ]));

    const { container } = render(await Orders({params: Promise.resolve({customerId: '1'})}));

    await waitFor(() => {
      const lastnames = screen.getAllByText('Doe')
      expect(lastnames[0]).toBeInTheDocument()
      expect(screen.getByText('122')).toBeInTheDocument();
      expect(screen.getByText('15')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      const currencies = screen.getAllByText('euros')
      expect(currencies[0]).toBeInTheDocument()
      expect(screen.getByText('20/12/2024')).toBeInTheDocument();
      expect(container.getElementsByClassName('total-orders').item(0)).toHaveTextContent("250");
    });
  });

  it('displays an error message when API request fails', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    render(await Orders({params: Promise.resolve({customerId: '1'})}));

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue sur cette page')).toBeInTheDocument();
    });
  });

  it('displays an error message when response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    render(await Orders({params: Promise.resolve({customerId: '1'})}));

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue sur cette page')).toBeInTheDocument();
    });
  });
});