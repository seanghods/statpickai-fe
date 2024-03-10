import { Footer, Header } from '../components';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../utils/constants';
import useResponse from '../context/useResponse';
import { PaymentForm } from '../components';
import { Button } from '@radix-ui/themes';
import LogInButton from '../components/sub-components/LogInButton';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function SignUpPage() {
  const { user } = useResponse();
  const [loadingTransition, setLoadingTransition] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showLoggedInMsg, setShowLoggedInMsg] = useState(false);
  const [accountInfo, setAccountInfo] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);
  useEffect(() => {
    user.username ? setShowLoggedInMsg(true) : null;
  }, [user]);
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
        } else if (form.email.value.contains('@permmail.com')) {
          newErrors.email = 'Invalid email domain.';
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
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="mb-6 md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="ticker-two h-[50px] font-bold text-3xl">
                Sign Up
              </h1>
            </div>
            <div className="w-full flex justify-center min-h-[650px]">
              <div className="md:w-3/4 transform overflow-hidden rounded-lg py-6 md:p-6 text-left align-middle flex flex-col items-center gap-4 relative">
                <div className="text-2xl border-b-2 border-gray-700 w-full font-bold leading-6 flex justify-center items-center pb-8 md:pb-12">
                  Register
                </div>
                {showLoggedInMsg ? (
                  <>
                    <div className="font-saira_bold text-lg">
                      You are logged in.
                    </div>
                    <div>
                      If you just registered, check your email ({user.email})
                      for a verification link to start analyzing picks.
                    </div>
                    <Button onClick={() => navigate('/games')}>
                      Visit Today&apos;s Games
                    </Button>
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
                        <div
                          className="flex flex-col px-4 pb-3 md:px-12 md:pb-3 gap-2"
                          noValidate
                          id="sign-up"
                          onSubmit={handleSignUp}
                        >
                          <label htmlFor="username">Username*</label>
                          <input
                            className="bg-gray-800 text-white font-gamebold  border-2 border-gray-700 rounded-sm p-1"
                            name="username"
                            type="text"
                            placeholder="user"
                            autoComplete="off"
                            required
                            minLength="3"
                          />
                          {formErrors.username && (
                            <div className="error-message text-red-300 italic">
                              {formErrors.username}
                            </div>
                          )}
                          <label htmlFor="email">Email*</label>
                          <input
                            className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm p-1"
                            name="email"
                            type="email"
                            autoComplete="off"
                            required
                            placeholder="user@gmail.com"
                          />
                          {formErrors.email && (
                            <div className="error-message text-red-300 italic">
                              {formErrors.email}
                            </div>
                          )}

                          <label htmlFor="password">Password*</label>
                          <input
                            className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm p-1"
                            name="password"
                            type="password"
                            placeholder="***"
                            required
                            minLength="6"
                          />
                          {formErrors.password && (
                            <div className="error-message text-red-300 italic">
                              {formErrors.password}
                            </div>
                          )}
                          <div className="button text-center mt-5">
                            {' '}
                            <div className="reg-msg font-game text-sm my-6 md:my-8 ">
                              *By registering I agree to the{' '}
                              <NavLink
                                to="/terms-of-service"
                                className="text-blue-400 w-4/5 md:w-1/2"
                              >
                                Terms of Service
                              </NavLink>{' '}
                              and{' '}
                              <NavLink
                                to="/privacy-policy"
                                className="text-blue-400 w-4/5 md:w-1/2 text-right"
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
                            <div className="pw-msg font-game text-sm my-3 md:my-6 ">
                              Your privacy and security are important to us. We
                              use industry-standard security measures to protect
                              your personal information, including secure
                              handling of passwords.
                            </div>
                          </div>
                        </div>
                        <div className="button text-center font-game flex flex-col gap-3 items-center justify-center">
                          Already Registered?
                          <div className="bg-gray-600 w-[80px] px-4 py-1 rounded-lg ">
                            <LogInButton />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            {user.username && <div className="flex-1"></div>}
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
