import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { NavLink } from 'react-router-dom';
import { API_ROUTES } from '../utils/constants';
import { LoadingIcon } from '../components/sub-components/Icons';

export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPlans() {
      setLoading(true);
      const response = await fetch(API_ROUTES.plans);
      const data = await response.json();
      setPlans(data);
      setLoading(false);
    }
    getPlans();
  }, []);
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
        <div className="flex-1 flex flex-col">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`ticker-three h-[50px] font-bold text-3xl mb-6 text-center`}
              >
                Pricing
              </h1>
            </div>
            <div className="max-w-screen-xl mx-auto md:px-8">
              <div className="relative max-w-xl mx-auto sm:text-center">
                <h3 className="text-2xl text-center md:text-3xl font-semibold sm:text-4xl">
                  Choose your Level
                </h3>
                <div className="mt-3 max-w-xl">
                  <p>
                    Pay for the number of picks you need analysis on. Get the
                    same amount of analysis each day for the month you are
                    subscribed.
                  </p>
                </div>
              </div>
              {loading ? (
                <div className="flex-1 flex justify-center h-[350px]">
                  <LoadingIcon />
                </div>
              ) : (
                <div className="mt-4 md:mt-16 space-y-6 justify-center sm:grid sm:grid-cols-2 sm:space-y-0 gap-4 lg:grid-cols-4">
                  {plans
                    // .filter(plan => plan.price > 0)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className={`relative flex-1 flex items-stretch flex-col px-5 py-8 rounded-xl border-2 ${
                          item.name == 'Starter' && 'border-green-500 border-4'
                        }`}
                      >
                        <div>
                          <span className="text-[#369326] font-medium">
                            {item.name}{' '}
                            <span
                              className={`text-white ${
                                item.name !== 'Starter' && 'hidden'
                              }`}
                            >
                              (Most Popular)
                            </span>
                          </span>
                          <div className="mt-4 text-3xl font-semibold">
                            ${item.price}{' '}
                            <span className="text-xl font-normal">/mo </span>
                          </div>
                        </div>
                        <ul className="py-8 space-y-3">
                          {item.features.map((featureItem, idx) => (
                            <li key={idx} className="flex items-center gap-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[#4DE234]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              {featureItem}
                            </li>
                          ))}
                        </ul>
                        <div className="flex-1 flex items-end">
                          <NavLink
                            to={`/sign-up/${item.id}`}
                            className="text-center px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-[#4DE234] hover:bg-[#379c26] active:bg-green-700"
                          >
                            Get Started
                          </NavLink>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
