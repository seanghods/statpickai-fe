// import { useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import useResponse from '../context/useResponse';

export default function LogInModal() {
  const navigate = useNavigate();
  const { setShowLogInModal } = useResponse();
  const { setLoggedIn } = useResponse();
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    message: '',
  });
  async function handleLogIn(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      const newErrors = {
        username: '',
        password: '',
        message: '',
      };
      if (!form['username'].checkValidity()) {
        newErrors.logIn.username = 'Username is required';
      }
      if (!form['password'].checkValidity()) {
        newErrors.logIn.password = 'Password is required';
      }
      setFormErrors(newErrors);
    } else {
      const response = await fetch(API_ROUTES.logIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({
          username: form.username.value,
          password: form.password.value,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLoggedIn(true);
        setShowLogInModal(false);
      } else {
        const newErrors = {
          logIn: {
            username: '',
            password: '',
            message: 'Incorrect Username / Password',
          },
          signUp: {},
        };
        setFormErrors(newErrors);
      }
    }
  }
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setShowLogInModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 flex justify-center items-center border-b-2 pb-3"
                >
                  Log In
                </Dialog.Title>
                <div className="mt-4 flex justify-end"></div>

                <form
                  className="flex flex-col p-12 pt-0 gap-2 font-gamebold"
                  id="log-in"
                  noValidate
                  onSubmit={handleLogIn}
                >
                  <label htmlFor="username">Username / Email</label>
                  <input
                    className="bg-gray-100 font-gamebold outline outline-1 rounded-md p-1 "
                    name="username"
                    type="text"
                    placeholder="user"
                    required
                    autoComplete="off"
                  />
                  {formErrors.username && (
                    <div className="error-message">{formErrors.username}</div>
                  )}
                  <label htmlFor="password">Password</label>
                  <input
                    className="bg-gray-100 font-gamebold outline outline-1 rounded-md p-1"
                    name="password"
                    type="password"
                    placeholder="***"
                    required
                  />
                  {formErrors.password && (
                    <div className="error-message">{formErrors.password}</div>
                  )}
                  <div className="button text-center mt-5">
                    {' '}
                    <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2 ">
                      Log In
                    </button>
                  </div>
                  {formErrors.message && (
                    <div className="error-message w-full text-center font-gamebold text-red-600 mt-2">
                      {formErrors.message}
                    </div>
                  )}
                </form>
                <div className="button text-center m-2 font-game flex justify-center">
                  <button
                    className="inline-flex bg-gray-200 font-gamebold justify-center rounded-md border border-transparent px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={e => {
                      e.stopPropagation();
                      setShowLogInModal(false);
                      navigate('/sign-up');
                    }}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="inline-flex mt-1 justify-self-end rounded-md border border-transparent bg-gray-200 px-2 py-1 font-gamebold text-sm font-medium text-black hover:bg-gray-400"
                    onClick={() => {
                      setShowLogInModal(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
