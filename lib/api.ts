import axios from 'axios';

import type {
  Camper,
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from '@/types/campers';
import type { CamperReview } from '@/types/reviews';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

type CampersListResponse = {
  items: Camper[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

type GetCampersParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmission;
  engine?: CamperEngine;
};

type CamperFiltersResponse = {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
};

type CreateBookingRequestResponse = {
  id: string;
  camperId: string;
  name: string;
  email: string;
  createdAt: string;
};

export const getCampers = async (params: GetCampersParams = {}) => {
  const { data } = await api.get<CampersListResponse>('/campers', { params });
  return data;
};

export const getCamperFilters = async () => {
  const { data } = await api.get<CamperFiltersResponse>('/campers/filters');
  return data;
};

export const getCamperById = async (camperId: string) => {
  const { data } = await api.get<Camper>(`/campers/${camperId}`);
  return data;
};

export const getCamperReviews = async (camperId: string) => {
  const { data } = await api.get<CamperReview[]>(
    `/campers/${camperId}/reviews`
  );
  return data;
};

export const createBookingRequest = async (
  camperId: string,
  name: string,
  email: string
) => {
  const { data } = await api.post<CreateBookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    {
      name,
      email,
    }
  );

  return data;
};
