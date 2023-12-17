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
      <div className="hero h-[400px] md:h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-3xl md:text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            PRICING
          </div>
        </div>
      </div>
      <section className="">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h3 className="text-gray-800 md:text-3xl font-semibold sm:text-4xl">
              Choose your Level
            </h3>
            <div className="mt-3 max-w-xl">
              <p>
                Pay for the number of picks you need analysis on. Get the same
                amount of analysis each day for the month you are subscribed.
              </p>
            </div>
          </div>
          {loading ? (
            <div className="flex-1 flex justify-center h-[350px]">
              <LoadingIcon />
            </div>
          ) : (
            <div className="mt-4 md:mt-16 space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
              {plans
                .filter(plan => plan.price > 0)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="relative flex-1 flex items-stretch flex-col p-2 md:p-8 rounded-xl border-2"
                  >
                    <div>
                      <span className="text-[#369326] font-medium">
                        {item.name}
                      </span>
                      <div className="mt-4 text-gray-800 text-3xl font-semibold">
                        ${item.price}{' '}
                        <span className="text-xl text-gray-600 font-normal">
                          /mo
                        </span>
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
      <Footer />
    </>
  );
}
