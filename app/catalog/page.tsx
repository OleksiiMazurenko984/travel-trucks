import { getCamperFilters, getCampers } from '@/lib/api';
import CampersList from '@/components/CampersList/CampersList';
import Filters from '@/components/Filters/Filters';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type {
  CamperCatalogFilters,
  CamperEngine,
  CamperForm,
  CamperTransmission,
} from '@/types/campers';
import type { Metadata } from 'next';
import css from './page.module.css';

const PER_PAGE = 4;

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse all available campers, apply filters, and find the best vehicle for your trip.',
  alternates: {
    canonical: '/catalog',
  },
};

interface CatalogPageProps {
  searchParams?: Promise<{
    location?: string;
    form?: CamperForm;
    transmission?: CamperTransmission;
    engine?: CamperEngine;
  }>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const filters: CamperCatalogFilters = {
    location: params?.location?.trim() || undefined,
    form: params?.form || undefined,
    transmission: params?.transmission || undefined,
    engine: params?.engine || undefined,
  };
  const queryClient = new QueryClient();

  const filterOptionsPromise = getCamperFilters();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', PER_PAGE, filters],
    queryFn: ({ pageParam }) =>
      getCampers({
        page: pageParam as number,
        perPage: PER_PAGE,
        ...filters,
      }),
    initialPageParam: 1,
  });

  const filterOptions = await filterOptionsPromise;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.container}>
        <div className={css.filters}>
          <Filters options={filterOptions} />
        </div>

        <div className={css.trucks}>
          <CampersList perPage={PER_PAGE} filters={filters} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
