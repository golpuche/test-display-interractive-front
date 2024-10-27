import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Customers from "./page";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Customers Component', () => {

  it('renders customer data in a table when API request succeeds', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
      {
        id: '1',
        title: 'M.',
        lastname: 'Doe',
        firstname: 'John',
        postal_code: '12345',
        city: 'Paris',
        email: 'john.doe@example.com',
      },
    ]));

    render(await Customers());

    await waitFor(() => {
      expect(screen.getByText('M.')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('12345')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  it('displays an error message when API request fails', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    render(await Customers());

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue sur cette page')).toBeInTheDocument();
    });
  });

  it('displays an error message when response is not ok', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });

    render(await Customers());

    await waitFor(() => {
      expect(screen.getByText('Une erreur est survenue sur cette page')).toBeInTheDocument();
    });
  });
});