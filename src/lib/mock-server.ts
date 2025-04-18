import { createServer, Model, Response } from 'miragejs';
import { mockPositions, mockReservations } from './mock-data';
import { Position, Reservation } from './types';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      position: Model,
      reservation: Model,
    },

    seeds(server) {
      // Add mock positions
      mockPositions.forEach((position) => {
        server.db.positions.insert(position);
      });

      // Add mock reservations
      mockReservations.forEach((reservation) => {
        server.db.reservations.insert(reservation);
      });
    },

    routes() {
      this.namespace = 'api';

      // Index greeting
      this.get('/', () => {
        return { message: 'This is the Florin API index' };
      });

      // Get positions by owner
      this.get('/positions/owner/:id', (schema, request) => {
        const ownerId = request.params.id;
        const positions = schema.db.positions.filter(
          (position: Position) => position.ownerAddress === ownerId
        );
        return positions;
      });

      // Get active positions
      this.get('/positions/active', (schema) => {
        const positions = schema.db.positions.filter(
          (position: Position) => position.state === 'ACTIVE'
        );
        return positions;
      });

      // Get position by ID
      this.get('/positions/:id', (schema, request) => {
        const id = request.params.id;
        const position = schema.db.positions.find(
          (position: Position) => position.positionId === id
        );

        if (!position) {
          return new Response(404, {}, { error: 'Position not found' });
        }

        return position;
      });

      // Get reservations by owner
      this.get('/reservations/owner/:id', (schema, request) => {
        const ownerId = request.params.id;
        const reservations = schema.db.reservations.filter(
          (reservation: Reservation) => reservation.ownerAddress === ownerId
        );
        return reservations;
      });

      // Get reservation by ID
      this.get('/reservations/:id', (schema, request) => {
        const id = request.params.id;
        const reservation = schema.db.reservations.find(
          (reservation: Reservation) => reservation.reservationId === id
        );

        if (!reservation) {
          return new Response(404, {}, { error: 'Reservation not found' });
        }

        return reservation;
      });

      // Pass through any unhandled requests
      this.passthrough();
    },
  });
}
