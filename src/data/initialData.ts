import { Reservation } from '../types';

export const TOTAL_SEATS = 1000;

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-seed-1',
    fullName: 'David Sterling',
    email: 'd.sterling@northstarcapital.com',
    phone: '+1 (612) 555-0192',
    seatNumber: 844,
    ticketCode: 'TWC-2026-0844',
    registeredAt: '2026-10-25T14:32:00Z',
  },
  {
    id: 'res-seed-2',
    fullName: 'Elena Rostova',
    email: 'e.rostova@twincitiesadvisory.org',
    phone: '+1 (651) 555-0148',
    seatNumber: 845,
    ticketCode: 'TWC-2026-0845',
    registeredAt: '2026-10-25T16:15:00Z',
  },
  {
    id: 'res-seed-3',
    fullName: 'Marcus Vance',
    email: 'marcus@vanceenterprises.io',
    phone: '+1 (952) 555-0821',
    seatNumber: 846,
    ticketCode: 'TWC-2026-0846',
    registeredAt: '2026-10-26T01:10:00Z',
  },
];
