export type BookStatus = 'available' | 'borrowed' | 'processing' | 'reserved' | 'lost';
export type MemberStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type SeatStatus = 'available' | 'reserved' | 'occupied';
export type ParkingStatus = 'available' | 'reserved' | 'occupied';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  status: BookStatus;
  genre: string;
  publicationYear: number;
  description?: string;
  isbn?: string;
  publisher?: string;
  language?: string;
  pages?: number;
  totalCheckouts?: number;
  totalReservations?: number;
  checkoutHistory?: {
    id: string;
    memberId: string;
    memberName: string;
    checkedOutDate: string;
    dueDate: string;
    returnDate?: string;
  }[];
}

export interface Member {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  status: MemberStatus;
  booksCheckedOut: number;
  memberSince: Date;
  phone?: string;
  address?: string;
  birthdate?: Date;
  overdueBooks?: number;
  feesDue?: number;
  notes?: string;
  currentCheckouts?: Checkout[];
  checkoutHistory?: Checkout[];
}

export interface Checkout {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover?: string;
  memberId: string;
  memberName: string;
  checkedOutDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'overdue' | 'returned';
}

export interface Seat {
  id: string;
  number: string;
  section: string;
  status: SeatStatus;
  currentReservation?: SeatReservation;
}

export interface SeatReservation {
  id: string;
  seatId: string;
  memberId: string;
  memberName: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
}

export interface ParkingSpot {
  id: string;
  number: string;
  section: string;
  type: 'standard' | 'handicap' | 'electric';
  status: ParkingStatus;
  currentReservation?: ParkingReservation;
}

export interface ParkingReservation {
  id: string;
  spotId: string;
  memberId: string;
  memberName: string;
  vehicleNumber: string;
  startTime: Date;
  endTime: Date;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthdate: Date;
  occupation: string;
  membershipType: 'standard' | 'student' | 'senior';
  idProof: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}