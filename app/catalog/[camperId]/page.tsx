import { getCamperById } from '@/lib/api';
import CamperDetails from '@/components/CamperDetails/CamperDetails';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

interface CamperPageProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({
  params,
}: CamperPageProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  return {
    title: `${camper.name} | TravelTrucks`,
    description: camper.description,
    alternates: {
      canonical: `/catalog/${camperId}`,
    },
  };
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['camperById', camperId],
    queryFn: () => getCamperById(camperId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetails />
    </HydrationBoundary>
  );
}
