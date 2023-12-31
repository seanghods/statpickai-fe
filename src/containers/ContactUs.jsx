import { useState } from 'react';
import { Footer, Header } from '../components';
import { API_ROUTES } from '../utils/constants';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState(false);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(API_ROUTES.contactUs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('success');
      } else {
        setMessage('error');
      }
    } catch (error) {
      console.error('Error sending email', error);
      setMessage('error');
    }
  }
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
            <div className="relative max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
              <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
                <p className="text-white text-3xl font-semibold sm:text-4xl">
                  Get in touch
                </p>
                <p className="text-gray-300">
                  We’d love to hear from you! Please fill out the form below.
                </p>
              </div>
              <div className="mt-12 mx-auto px-4 p-8 sm:max-w-lg sm:px-8 sm:rounded-xl">
                <form onSubmit={e => handleSubmit(e)} className="space-y-5">
                  <div>
                    <label className="text-white font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={e => handleChange(e)}
                      placeholder="Name..."
                      required
                      className="w-full mt-2 px-3 py-2 outline-none focus:border-gray-800 shadow-sm bg-gray-800 text-white font-gamebold  border-2 border-gray-700 rounded-sm p-1"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={e => handleChange(e)}
                      placeholder="Email..."
                      required
                      className="w-full mt-2 px-3 py-2 outline-none focus:border-gray-800 shadow-sm bg-gray-800 text-white font-gamebold  border-2 border-gray-700 rounded-sm p-1"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-white">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={e => handleChange(e)}
                      placeholder="Your Message..."
                      required
                      className="w-full mt-2 px-3 py-2 outline-none focus:border-gray-800 shadow-sm bg-gray-800 text-white font-gamebold  border-2 border-gray-700 rounded-sm h-[150px]"
                    ></textarea>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2">
                      Submit
                    </button>
                    {message == 'success' ? (
                      <p className="text-center text-gray-300">
                        Your message has been sent. <br />
                        We&apos;ll get back to you as soon as we can!
                      </p>
                    ) : message == 'error' ? (
                      <p className="text-center text-gray-300">
                        There was an error sending the message. <br />
                        We have been alerted, please try again later.
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
