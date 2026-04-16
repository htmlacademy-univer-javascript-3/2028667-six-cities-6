const offerTypeLabels: Record<string, string> = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel',
};

export function getOfferTypeLabel(type: string): string {
  return offerTypeLabels[type] ?? type;
}

export function getBedroomLabel(count: number): string {
  return `${count} ${count === 1 ? 'Bedroom' : 'Bedrooms'}`;
}

export function getAdultLabel(count: number): string {
  return `Max ${count} ${count === 1 ? 'adult' : 'adults'}`;
}
