import axios from 'axios';

import type {
  CamperListItem,
  CamperDetails,
  CamperCatalogFilters,
  CamperFiltersResponse,
} from '@/types/campers';
import type { CamperReview } from '@/types/reviews';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

interface CampersListResponse {
  campers: CamperListItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

interface GetCampersParams extends CamperCatalogFilters {
  page?: number;
  perPage?: number;
}

interface CreateBookingRequestResponse {
  message: string;
}

export const getCampers = async (params: GetCampersParams = {}) => {
  const { data } = await api.get<CampersListResponse>('/campers', { params });
  return data;
};

export const getCamperFilters = async () => {
  const { data } = await api.get<CamperFiltersResponse>('/campers/filters');
  return data;
};

export const getCamperById = async (camperId: string) => {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
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
