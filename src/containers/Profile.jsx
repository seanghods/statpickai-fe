import { Footer, Header, PaymentForm } from '../components';
import { LoadingIcon } from '../components/sub-components/Icons';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';
import { capitalize } from '../utils/helpers';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user, setShowLogInModal } = useResponse();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setLoading(true);
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
      setLoading(false);
    }
    checkAuthenticationStatus();
  }, [user]);
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            {user.username ? user.username.toUpperCase() : 'PROFILE'}
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full mb-12 flex-col items-center">
        {loading ? (
          <div>
            <LoadingIcon />
          </div>
        ) : loggedIn && user.username ? (
          <div className="flex items-center w-1/2 flex-col gap-3">
            <div className="text-4xl mb-5 font-bold">Profile Information</div>
            <div className="flex flex-col gap-3">
              <div>
                <span className="font-bold">Status:</span>{' '}
                {capitalize(user.subscriptionStatus)}
              </div>
              <div>
                <span className="font-bold">Plan:</span> {user.plan.name}
              </div>
              <div>
                <span className="font-bold">Picks Used Today:</span>{' '}
                {user.picksUsed}
              </div>
              <div>
                <span className="font-bold">Picks Per Day:</span>{' '}
                {user.plan.picksPerDay}
              </div>
              <div>
                <span className="font-bold">Cost:</span> ${user.plan.price} /
                Month
              </div>
              <div>
                <span className="font-bold">Started:</span>{' '}
                {new Date(user.subscriptionStartDate).toDateString()}
              </div>
            </div>
            {user.plan.price == 0 ? (
              <PaymentForm />
            ) : (
              <div>
                Update your subscription plan or billing information{' '}
                <a
                  href="https://billing.stripe.com/p/login/5kAbJd1PW5bi1OMfYY"
                  alt="Stripe Link"
                  className="font-bold text-blue-800"
                >
                  here via Stripe.
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="w-1/3 text-center">
            {console.log(loggedIn)}
            <div className="font-saira_bold ">
              Please log in to view your profile.
            </div>
            <button
              onClick={() => setShowLogInModal(true)}
              className="bg-gray-300 font-saira_bold px-3 py-1 rounded-lg font-bold text-indigo-500"
            >
              Log In
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
