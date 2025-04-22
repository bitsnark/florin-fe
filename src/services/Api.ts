
import { Position, Reservation } from "@/types";

const POSITIONS_KEY = 'florin_positions';
const RESERVATIONS_KEY = 'florin_reservations';

function withDelay<T>(result: T, delay: number = 500): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(result), delay));
}

function parseBigIntFields<T>(data: T): T {
  return JSON.parse(JSON.stringify(data), (_, value) => {
    if (typeof value === 'string' && /^\d+n$/.test(value)) {
      return BigInt(value.slice(0, -1));
    }
    return value;
  });
}

export class FlorinApiService {
  private static getPositions(): Position[] {
    const data = localStorage.getItem(POSITIONS_KEY);
    return data ? parseBigIntFields(JSON.parse(data)) : [];
  }

  private static savePositions(positions: Position[]) {
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions));
  }

  private static getReservations(): Reservation[] {
    const data = localStorage.getItem(RESERVATIONS_KEY);
    return data ? parseBigIntFields(JSON.parse(data)) : [];
  }

  private static saveReservations(reservations: Reservation[]) {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
  }

  static async getGreeting(): Promise<string> {
    return withDelay('This is the Florin API index');
  }

  static async getPositionsByOwner(ownerId: string, finalityFlag?: boolean): Promise<Position[]> {
    const positions = this.getPositions();
    return withDelay(
      positions.filter(p =>
        p.ownerAddress === ownerId &&
        (finalityFlag === undefined || p.finality === 'FINAL')
      )
    );
  }

  static async getActivePositions(finalityFlag?: boolean): Promise<Position[]> {
    const positions = this.getPositions();
    return withDelay(
      positions.filter(p =>
        p.state === 'ACTIVE' &&
        (finalityFlag === undefined || p.finality === 'FINAL')
      )
    );
  }

  static async getPositionById(id: string, finalityFlag?: boolean): Promise<Position | undefined> {
    const positions = this.getPositions();
    return withDelay(
      positions.find(p =>
        p.positionId === id &&
        (finalityFlag === undefined || p.finality === 'FINAL')
      )
    );
  }

  static async getReservationsByOwner(ownerId: string, finalityFlag?: boolean): Promise<Reservation[]> {
    const reservations = this.getReservations();
    return withDelay(
      reservations.filter(r =>
        r.ownerAddress === ownerId &&
        (finalityFlag === undefined || r.finality === 'FINAL')
      )
    );
  }

  static async getActiveReservations(finalityFlag?: boolean): Promise<Reservation[]> {
    const reservations = this.getReservations();
    return withDelay(
      reservations.filter(r =>
        r.state === 'PENDING' &&
        (finalityFlag === undefined || r.finality === 'FINAL')
      )
    );
  }

  static async getReservationById(id: string, finalityFlag?: boolean): Promise<Reservation | undefined> {
    const reservations = this.getReservations();
    return withDelay(
      reservations.find(r =>
        r.reservationId === id &&
        (finalityFlag === undefined || r.finality === 'FINAL')
      )
    );
  }

  static async addPosition(position: Position): Promise<void> {
    const positions = this.getPositions();
    this.savePositions([...positions, position]);
    return withDelay(undefined);
  }

  static async addReservation(reservation: Reservation): Promise<void> {
    const reservations = this.getReservations();
    this.saveReservations([...reservations, reservation]);
    return withDelay(undefined);
  }

  static async getBitcoinTaprootAddress(): Promise<string> {
    return withDelay('0x9f3c9346dd5edc74032aef79b3e4585f7a4dffb51aa3780704e63f87c4170dd3');
  }

  static async getMaxAmount(): Promise<bigint> {
    return withDelay(BigInt(1000000));
  }

  static clearAllMockData(): void {
    localStorage.removeItem(POSITIONS_KEY);
    localStorage.removeItem(RESERVATIONS_KEY);
  }
}
