import { Position, Reservation } from './types';

const API_BASE_URL = '/api';

/**
 * Utility class for interacting with the Florin API
 */
export const FlorinAPI = {
  /**
   * Get positions by owner address
   */
  async getPositionsByOwner(ownerAddress: string): Promise<Position[]> {
    const response = await fetch(
      `${API_BASE_URL}/positions/owner/${ownerAddress}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch positions: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get all active positions
   */
  async getActivePositions(): Promise<Position[]> {
    const response = await fetch(`${API_BASE_URL}/positions/active`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch active positions: ${response.statusText}`
      );
    }
    return response.json();
  },

  /**
   * Get a position by ID
   */
  async getPositionById(positionId: string): Promise<Position> {
    const response = await fetch(`${API_BASE_URL}/positions/${positionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch position: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get reservations by owner address
   */
  async getReservationsByOwner(ownerAddress: string): Promise<Reservation[]> {
    const response = await fetch(
      `${API_BASE_URL}/reservations/owner/${ownerAddress}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch reservations: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get a reservation by ID
   */
  async getReservationById(reservationId: string): Promise<Reservation> {
    const response = await fetch(
      `${API_BASE_URL}/reservations/${reservationId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch reservation: ${response.statusText}`);
    }
    return response.json();
  },
};
