/** @format */

import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1 className='mb-8 text-4xl font-medium text-accent-400'>
        Any question? Shoot us a message
      </h1>

      <form className='max-w-5xl py-10 mx-auto space-y-6 text-lg bg-primary-900 px-14'>
        <div className='space-y-2'>
          <label>Full name</label>
          <input
            required
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
            name='fullName'
          />
        </div>

        <div className='space-y-2'>
          <label>Email address</label>
          <input
            type='email'
            name='email'
            required
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
          />
        </div>

        <div className='space-y-2'>
          <label>Subject</label>
          <select
            required
            name='subject'
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
          >
            <option value=''>Select subject...</option>
            <option value='booking-enquiry'>Booking enquiry</option>
            <option value='cabin-information'>Cabin information</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div className='space-y-2'>
          <label>Message</label>
          <textarea
            name='message'
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
            rows={3}
          />
        </div>

        <div className='flex items-center justify-between text-red-500'>
          <button className='px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
            Send message
          </button>
        </div>
      </form>
    </div>
  );
}
