import { getCampers } from '@/lib/api';
import CampersList from '@/components/CampersList/CampersList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const PER_PAGE = 4;

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', PER_PAGE],
    queryFn: ({ pageParam }) =>
      getCampers({ page: pageParam as number, perPage: PER_PAGE }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CampersList perPage={PER_PAGE} />
    </HydrationBoundary>
  );
}
