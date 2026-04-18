export type CamperForm =
  | 'alcove'
  | 'panel_van'
  | 'integrated'
  | 'semi_integrated';

export type CamperTransmission = 'automatic' | 'manual';

export type CamperEngine = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export type CamperAmenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: CamperTransmission;
  engine: CamperEngine;
  amenities: CamperAmenity[];
  gallery: CamperGalleryItem[];
  createdAt: string;
  updatedAt: string;
};

export type CamperGalleryItem = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};
