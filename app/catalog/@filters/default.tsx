import Filters from '@/components/Filters/Filters';
import { getCamperFilters } from '@/lib/api';

export default async function CatalogFilters() {
  const options = await getCamperFilters();

  return <Filters options={options} />;
}
