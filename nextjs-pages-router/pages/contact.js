/** @format */

import Head from "next/head";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    // Prepare data
    const formData = new FormData(event.target);

    const contactData = Object.fromEntries(formData.entries());
    console.log(contactData);

    // POST REQUEST
    setIsSubmitting(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
    // Get result
    const { success, message } = await response.json();
    setMessage(message);
    setSuccess(success);
    // Set state
    setIsSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>Contact | The Wild Oasis</title>
      </Head>
      <div>
        <h1 className='mb-8 text-4xl font-medium text-accent-400'>
          Any question? Shoot us a message
        </h1>

        {success === true ? (
          <p className='text-lg text-center'>{message}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='max-w-5xl py-10 mx-auto space-y-6 text-lg bg-primary-900 px-14'
          >
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
                required
              />
            </div>

            <div className='flex items-center justify-between text-red-500'>
              {!success && message ? <p>{message}</p> : <p></p>}
              <button
                className='px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
