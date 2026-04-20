'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createBookingRequest } from '@/lib/api';
import css from './BookingForm.module.css';

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { mutateAsync: sendBookingRequest, isPending } = useMutation({
    mutationFn: ({
      selectedCamperId,
      userName,
      userEmail,
    }: {
      selectedCamperId: string;
      userName: string;
      userEmail: string;
    }) => createBookingRequest(selectedCamperId, userName, userEmail),
    onSuccess: response => {
      toast.success(response.message || 'Booking request sent successfully.');
      setName('');
      setEmail('');
    },
    onError: () => {
      toast.error('Failed to send booking request. Please try again.');
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    await sendBookingRequest({
      selectedCamperId: camperId,
      userName: trimmedName,
      userEmail: trimmedEmail,
    });
  };

  return (
    <div className={css.frame}>
      <div className={css.content}>
        <h3 className={css.title}>Book your campervan now</h3>
        <p className={css.subtitle}>
          Stay connected! We are always ready to help you.
        </p>

        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="name"
            placeholder="Name*"
            value={name}
            onChange={event => setName(event.target.value)}
            minLength={2}
            maxLength={60}
            required
            disabled={isPending}
          />

          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Email*"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
            disabled={isPending}
          />

          <button
            className={css.submitButton}
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
