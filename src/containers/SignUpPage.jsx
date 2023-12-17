import { Footer, Header } from '../components';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { API_ROUTES } from '../utils/constants';
import useResponse from '../context/useResponse';
import { PaymentForm } from '../components';

export default function SignUpPage() {
  const { user, setShowLogInModal } = useResponse();
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showLoggedInMsg, setShowLoggedInMsg] = useState(false);
  const [accountInfo, setAccountInfo] = useState('');
  useEffect(() => {
    user.username && setShowLoggedInMsg(true);
  }, []);
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    email: '',
    message: '',
  });
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const form = e.target;
      if (!form.checkValidity()) {
        const newErrors = {
          username: '',
          password: '',
          email: '',
          message: '',
        };
        if (!form['username'].checkValidity()) {
          newErrors.username = 'Username must be at least 3 characters';
        }
        if (!form['password'].checkValidity()) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (!form['email'].checkValidity()) {
          newErrors.email = 'Email is invalid';
        }
        setFormErrors(newErrors);
      } else {
        const response = await fetch(API_ROUTES.signUp, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          withCredentials: true,
          body: JSON.stringify({
            username: form.username.value,
            password: form.password.value,
            email: form.email.value,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setLoadingTransition(true);
          setAccountInfo(data.user);
          setTimeout(() => {
            setLoadingTransition(false);
            setShowPaymentForm(true);
          }, 350);
        } else {
          {
            const newErrors = {
              username: '',
              password: '',
              email: '',
              message: data.message,
            };
            setFormErrors(newErrors);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="hero h-[400px] md:h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-4xl md:text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            Sign Up
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center min-h-[650px]">
        <div className="w-5/6 md:w-1/2 mb-12 transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle flex flex-col items-center gap-4 relative">
          <div className="text-lg w-full font-bold leading-6 text-gray-900 flex justify-center items-center border-b-2 pb-8">
            Sign Up
          </div>
          {showLoggedInMsg ? (
            <>
              <div className="font-saira_bold">You are logged in.</div>
              <NavLink
                to="/profile"
                className="bg-gray-300 font-saira_bold px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
              >
                Visit Your Profile
              </NavLink>
            </>
          ) : (
            <>
              {showPaymentForm ? (
                <PaymentForm accountInfo={accountInfo} />
              ) : (
                <div
                  className={`${
                    loadingTransition ? 'animate-slide-out-left' : ''
                  } flex w-full md:w-3/4 flex-col px-4 pb-3 md:px-12 md:pb-3 gap-2`}
                >
                  <form
                    className="flex flex-col px-4 pb-3 md:px-12 md:pb-3 gap-2"
                    noValidate
                    id="sign-up"
                    onSubmit={handleSignUp}
                  >
                    <label htmlFor="username">Username*</label>
                    <input
                      className="bg-gray-100 font-gamebold  outline-1 outline rounded-md p-1"
                      name="username"
                      type="text"
                      placeholder="user"
                      autoComplete="off"
                      required
                      minLength="3"
                    />
                    {formErrors.username && (
                      <div className="error-message">{formErrors.username}</div>
                    )}
                    <label htmlFor="password">Password*</label>
                    <input
                      className="bg-gray-100 font-gamebold outline-1 outline rounded-md p-1"
                      name="password"
                      type="password"
                      placeholder="***"
                      required
                      minLength="6"
                    />
                    {formErrors.password && (
                      <div className="error-message">{formErrors.password}</div>
                    )}
                    <label htmlFor="email">Email*</label>
                    <input
                      className="bg-gray-100 font-gamebold outline-1 outline rounded-md p-1"
                      name="email"
                      type="email"
                      autoComplete="off"
                      required
                      placeholder="user@gmail.com"
                    />
                    {formErrors.email && (
                      <div className="error-message">{formErrors.email}</div>
                    )}

                    <div className="button text-center mt-5">
                      {' '}
                      <div className="reg-msg font-game text-xs mb-3 ">
                        *By registering I agree to the{' '}
                        <NavLink
                          to="/terms-of-service"
                          className="text-blue-700 w-4/5 md:w-1/2"
                        >
                          Terms of Service
                        </NavLink>{' '}
                        and{' '}
                        <NavLink
                          to="/privacy-policy"
                          className="text-blue-700 w-4/5 md:w-1/2 text-right"
                        >
                          Privacy Policy
                        </NavLink>
                        ”
                      </div>
                      <button className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-lg w-1/2 text-center px-3 py-2">
                        Sign Up
                      </button>
                      {formErrors.message && (
                        <div className="error-message w-full text-center font-gamebold text-red-600 mt-2">
                          {formErrors.message}
                        </div>
                      )}
                      <div className="pw-msg font-game text-xs mt-2 ">
                        Your privacy and security are important to us. We use
                        industry-standard security measures to protect your
                        personal information, including secure handling of
                        passwords.
                      </div>
                    </div>
                  </form>
                  <div className="button text-center m-2 font-game flex justify-center">
                    <button
                      className="inline-flex font-gamebold justify-center rounded-md border border-transparent bg-gray-200 px-3 py-1 text-sm text-indigo-600 font-bold hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={e => {
                        e.stopPropagation();
                        setShowLogInModal(true);
                      }}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {user.username && <div className="flex-1"></div>}
      <Footer />
    </>
  );
}
