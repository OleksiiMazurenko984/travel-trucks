'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa6';
import { FiMap } from 'react-icons/fi';
import { getCamperById } from '@/lib/api';
import css from './CamperDetails.module.css';
import type {
  CamperAmenity,
  CamperDetails as CamperDetailsType,
} from '@/types/campers';

const formatValue = (value: string) =>
  value
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getFeatureTags = ({
  transmission,
  engine,
  amenities,
}: CamperDetailsType) => {
  const priorityAmenities: CamperAmenity[] = ['ac', 'kitchen', 'radio'];
  const featureAmenities = priorityAmenities.filter(item =>
    amenities.includes(item)
  );

  return [
    formatValue(transmission),
    formatValue(engine),
    ...featureAmenities.map(formatValue),
  ];
};

export default function CamperDetails() {
  const { camperId } = useParams<{ camperId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['camperById', camperId],
    queryFn: () => getCamperById(camperId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p className={css.status}>Loading camper details...</p>;
  }

  if (error || !data) {
    return (
      <p className={css.status}>
        Something went wrong while loading the camper.
      </p>
    );
  }

  const tags = getFeatureTags(data);

  return (
    <section className={css.page}>
      <div className={css.content}>
        <div className={css.galleryColumn}>
          {data.gallery[0] && (
            <Image
              className={css.mainImage}
              src={data.gallery[0].original}
              alt={data.name}
              width={638}
              height={505}
              unoptimized
            />
          )}

          <ul className={css.thumbsList}>
            {data.gallery.slice(0, 4).map(item => (
              <li className={css.thumbItem} key={item.id}>
                <Image
                  className={css.thumbImage}
                  src={item.thumb}
                  alt={`${data.name} view ${item.order + 1}`}
                  width={136}
                  height={144}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={css.infoColumn}>
          <article className={css.mainCard}>
            <h1 className={css.name}>{data.name}</h1>

            <p className={css.meta}>
              <span className={css.metaItem}>
                <FaStar className={css.ratingIcon} />
                {data.rating}({data.totalReviews} Reviews)
              </span>
              <span className={css.metaItem}>
                <FiMap className={css.locationIcon} />
                {data.location}
              </span>
            </p>

            <p className={css.price}>
              &#8364;
              {data.price}
            </p>

            <p className={css.description}>{data.description}</p>
          </article>

          <article className={css.detailsCard}>
            <h2 className={css.detailsTitle}>Vehicle details</h2>

            <ul className={css.tagsList}>
              {tags.map(tag => (
                <li key={tag} className={css.tag}>
                  {tag}
                </li>
              ))}
            </ul>

            <dl className={css.specList}>
              <div className={css.specRow}>
                <dt>Form</dt>
                <dd>{formatValue(data.form)}</dd>
              </div>
              <div className={css.specRow}>
                <dt>Length</dt>
                <dd>{data.length}</dd>
              </div>
              <div className={css.specRow}>
                <dt>Width</dt>
                <dd>{data.width}</dd>
              </div>
              <div className={css.specRow}>
                <dt>Height</dt>
                <dd>{data.height}</dd>
              </div>
              <div className={css.specRow}>
                <dt>Tank</dt>
                <dd>{data.tank}</dd>
              </div>
              <div className={css.specRow}>
                <dt>Consumption</dt>
                <dd>{data.consumption}</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
