export enum Role {
  USER = 'User',
  BUSINESS = 'Driver',
  ADMIN = 'Admin',
}

export enum BookingStatus {
  REQUESTED = 1,
  ACCEPTED = 2,
  OUTFORDELIVERY = 3,
  REACHED = 4,
  PINVERIFIED = 5,
  DELIVERED = 6,
  RATINGDONE = 7,
  CANCELLED = 8,
}

export enum NotificationType {
  Booking = '1',
  Chat = '3',
  Payment = '2',
  Request = '4',
}

export const getStatusName = (status: number): string | undefined => {
  if (
    status === BookingStatus.DELIVERED ||
    status === BookingStatus.RATINGDONE
  ) {
    return 'DELIVERED';
  } else if (status === BookingStatus.PINVERIFIED) {
    return 'REACHED';
  } else if (status === BookingStatus.OUTFORDELIVERY) {
    return 'Out for delivery';
  }
  return BookingStatus[status] as string | undefined;
};
