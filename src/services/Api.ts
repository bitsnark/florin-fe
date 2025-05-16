import { env } from '@/config/env';
import { Position, Reservation, TransactionHistory } from '@/types';
import { formatEther, parseEther } from 'viem';

const API_BASE_URL = env.VITE_API_BASE_URL;

function serializeBigInt<T>(data: T): string {
  return JSON.stringify(data, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

export class FlorinApiService {
  static async getGreeting(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch greeting: ${response.statusText}`);
    }
    return response.text();
  }

  static async getPositionsByOwner(
    ownerId: string | undefined,
    finalityFlag?: boolean
  ): Promise<Position[]> {
    if (!ownerId) {
      const response = await fetch(`${API_BASE_URL}/positions`);
      if (!response.ok) {
        throw new Error(`Failed to fetch positions: ${response.statusText}`);
      }
      return response.json();
    }

    const response = await fetch(
      `${API_BASE_URL}/positions?ownerId=${ownerId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch positions: ${response.statusText}`);
    }
    const positions = await response.json();
    const normalizedPositions = positions.map((p: Position) => ({
      ...p,
      amount: formatEther(BigInt(p.amount)),
      receivedAmount: formatEther(BigInt(p.receivedAmount || '0')),
    }));

    return finalityFlag === undefined
      ? normalizedPositions
      : normalizedPositions.filter((p: Position) => p.finality === 'FINAL');
  }

  static async getActivePositions(finalityFlag?: boolean): Promise<Position[]> {
    const response = await fetch(`${API_BASE_URL}/positions/active`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch active positions: ${response.statusText}`
      );
    }
    const positions = await response.json();
    return finalityFlag === undefined
      ? positions
      : positions.filter((p: Position) => p.finality === 'FINAL');
  }

  static async getPositionById(
    id: string | undefined,
  ): Promise<Position | null> {
    if (!id) return null;

    const response = await fetch(`${API_BASE_URL}/position/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch position: ${response.statusText}`);
    }
    const position = await response.json();
    return position;
  }

  static async getReservationsByOwner(
    ownerId: string | undefined,
    finalityFlag?: boolean
  ): Promise<Reservation[]> {
    if (!ownerId) {
      const response = await fetch(`${API_BASE_URL}/reservations`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
      }
      return response.json();
    }

    const response = await fetch(
      `${API_BASE_URL}/reservations?ownerId=${ownerId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch reservations: ${response.statusText}`);
    }
    const reservations = await response.json();
    const normalizedReservations = reservations.map((r: Reservation) => ({
      ...r,
      amount: formatEther(BigInt(r.amount)),
      receivedAmount: formatEther(BigInt(r.receivedAmount || '0')),
    }));
    return finalityFlag === undefined
      ? normalizedReservations
      : normalizedReservations.filter(
          (r: Reservation) => r.finality === 'FINAL'
        );
  }

  static async getActiveReservations(): Promise<Reservation[]> {
    const response = await fetch(`${API_BASE_URL}/reservations/active`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch active reservations: ${response.statusText}`
      );
    }
    return response.json();
  }

  static async getReservationById(
    id: string | undefined,
  ): Promise<{ data: Reservation; blockCount: number } | null> {
    if (!id) return null;

    const response = await fetch(`${API_BASE_URL}/reservation/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reservation: ${response.statusText}`);
    }
    const reservation = await response.json();
    return reservation;
  }

  static async updateReservation(
    reservation: Reservation
  ): Promise<Reservation> {
    const response = await fetch(
      `${API_BASE_URL}/reservations/${reservation.reservationId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: serializeBigInt({
          ...reservation,
          amount: parseEther(reservation.amount),
          receivedAmount: parseEther(reservation.receivedAmount || '0'),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update reservation: ${response.statusText}`);
    }
    return response.json();
  }

  static async addReservation(reservation: Reservation): Promise<Reservation> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: serializeBigInt(reservation),
    });

    if (!response.ok) {
      throw new Error(`Failed to add reservation: ${response.statusText}`);
    }
    return response.json();
  }

  static async getBitcoinTaprootAddress(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/bitcoin/taproot-address`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch taproot address: ${response.statusText}`
      );
    }
    return response.text();
  }

  static async finPositionIdForAmount(amount: bigint): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/positions/find-for-amount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: serializeBigInt({ amount }),
    });

    if (!response.ok) {
      throw new Error(`Failed to find position: ${response.statusText}`);
    }
    const data = await response.json();
    return data.positionId;
  }

  static async getMaxAmount(): Promise<{
    maxAmount: number;
    minAmount: number;
  }> {
    //const response = await fetch(`${API_BASE_URL}/positions/max-min-amount`);
    /*  if (!response.ok) {
      throw new Error(`Failed to fetch max amount: ${response.statusText}`);
    } */
    // const data = await response.json();

    return {
      maxAmount: 3,
      minAmount: 0.0004,
    };
  }

  static async seed(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/seed`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to seed data: ${response.statusText}`);
    }
  }

  static async clearAllMockData(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/clear`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to clear data: ${response.statusText}`);
    }
  }

  static async getTransactionHistory(
    ownerAddress: string | undefined
  ): Promise<TransactionHistory> {
    if (!ownerAddress) {
      throw new Error('Owner address is required');
    }

    const response = await fetch(
      `${env.VITE_API_BASE_URL}/history/${ownerAddress}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch transaction history: ${response.statusText}`
      );
    }
    return response.json();
  }
}
