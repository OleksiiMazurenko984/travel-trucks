'use client';

import { useQuery } from '@tanstack/react-query';
import { FaStar } from 'react-icons/fa6';
import { getCamperReviews } from '@/lib/api';
import BookingForm from '@/components/BookingForm/BookingForm';
import css from './Reviews.module.css';

interface ReviewsProps {
  camperId: string;
}

const MAX_RATING = 5;

const getAvatarLetter = (name: string) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return '?';
  }

  return trimmedName.charAt(0).toUpperCase();
};

export default function Reviews({ camperId }: ReviewsProps) {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['camperReviews', camperId],
    queryFn: () => getCamperReviews(camperId),
  });

  return (
    <section className={css.section}>
      <h2 className={css.title}>Reviews</h2>

      <div className={css.contentRow}>
        <div className={css.reviewsColumn}>
          {isLoading && <p className={css.status}>Loading reviews...</p>}

          {error && (
            <p className={css.status}>
              Something went wrong while loading reviews.
            </p>
          )}

          {!isLoading && !error && (
            <ul className={css.list}>
              {reviews?.map(review => (
                <li key={review.id} className={css.item}>
                  <header className={css.header}>
                    <div className={css.avatar}>
                      {getAvatarLetter(review.reviewer_name)}
                    </div>

                    <div className={css.meta}>
                      <p className={css.name}>{review.reviewer_name}</p>

                      <ul className={css.stars}>
                        {Array.from({ length: MAX_RATING }).map((_, index) => (
                          <li key={index} className={css.starItem}>
                            <FaStar
                              className={
                                index < review.reviewer_rating
                                  ? css.starFilled
                                  : css.starEmpty
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </header>

                  <p className={css.comment}>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <BookingForm camperId={camperId} />
      </div>
    </section>
  );
}
