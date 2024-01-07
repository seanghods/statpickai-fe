import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { Footer, Header } from '../components';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    setToken(token);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(API_ROUTES.resetPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error, please try again.');
    }
  }

  return (
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
        <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1 flex flex-col">
          <div className="md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
            <h1 className="text-white font-bold text-4xl xl:text-[44px]">
              Reset Password
            </h1>
          </div>
          <form
            className="flex flex-col px-4 pb-3 md:px-12 md:pb-3 gap-2 md:w-1/2"
            noValidate
            id="sign-up"
            onSubmit={e => handleSubmit(e)}
          >
            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm p-1"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="***"
              required
              minLength="6"
            />
            <label htmlFor="email">Confirm Password</label>
            <input
              className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm p-1"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              placeholder="***"
            />
            <div className="button text-center mt-5">
              {' '}
              <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2">
                Reset Password
              </button>
              <div className="pw-msg font-game text-xs mt-2 ">
                Your privacy and security are important to us. We use
                industry-standard security measures to protect your personal
                information, including secure handling of passwords.
              </div>
              <div className="my-5">{message}</div>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
}
