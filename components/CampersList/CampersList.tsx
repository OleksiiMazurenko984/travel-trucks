'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getCampers } from '@/lib/api';
import { FaStar, FaVanShuttle } from 'react-icons/fa6';
import { LuFuel } from 'react-icons/lu';
import { TbManualGearbox } from 'react-icons/tb';
import { FiMap } from 'react-icons/fi';
import css from './CampersList.module.css';
import type { CamperCatalogFilters } from '@/types/campers';

type CampersListProps = {
  perPage: number;
  filters: CamperCatalogFilters;
};

const formatTagLabel = (value: string) =>
  value
    .split('_')
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    )
    .join(' ');

export default function CampersList({ perPage, filters }: CampersListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['campers', perPage, filters],
      queryFn: ({ pageParam }) =>
        getCampers({ page: pageParam as number, perPage, ...filters }),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const campers = data?.pages.flatMap(page => page.campers) ?? [];

  if (isLoading) {
    return <p className={css.status}>Loading campers...</p>;
  }

  return (
    <section className={css.section}>
      <ul className={css.list}>
        {campers.map(camper => (
          <li className={css.card} key={camper.id}>
            <Image
              className={css.image}
              src={camper.coverImage}
              alt={camper.name}
              width={219}
              height={240}
              unoptimized
            />

            <div className={css.content}>
              <div className={css.headingRow}>
                <h2 className={css.name}>{camper.name}</h2>
                <p className={css.price}>
                  &#8364;
                  {camper.price}
                </p>
              </div>

              <p className={css.meta}>
                <span className={css.metaItem}>
                  <FaStar className={css.ratingIcon} />
                  {camper.rating}({camper.totalReviews} Reviews)
                </span>

                <span className={css.metaItem}>
                  <FiMap className={css.metaIcon} />
                  {camper.location}
                </span>
              </p>

              <p className={css.description}>
                {camper.description
                  ? camper.description.length > 60
                    ? `${camper.description.slice(0, 60)}...`
                    : camper.description
                  : ''}
              </p>

              <div className={css.tags}>
                <span className={css.tag}>
                  <LuFuel className={css.tagIcon} />
                  {formatTagLabel(camper.engine)}
                </span>

                <span className={css.tag}>
                  <TbManualGearbox className={css.tagIcon} />
                  {formatTagLabel(camper.transmission)}
                </span>

                <span className={css.tag}>
                  <FaVanShuttle className={css.tagIcon} />
                  {formatTagLabel(camper.form)}
                </span>
              </div>

              <Link
                className={css.button}
                href={`/catalog/${camper.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Show more
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={css.loadMore}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </section>
  );
}
