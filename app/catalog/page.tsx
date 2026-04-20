import { getCampers } from '@/lib/api';
import CampersList from '@/components/CampersList/CampersList';
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

const PER_PAGE = 4;

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CampersList perPage={PER_PAGE} filters={filters} />
    </HydrationBoundary>
  );
}
