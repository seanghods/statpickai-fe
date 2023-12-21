import { Footer, Header, PaymentForm } from '../components';
import { LoadingIcon } from '../components/sub-components/Icons';
import useResponse from '../context/useResponse';
import { API_ROUTES } from '../utils/constants';
import { capitalize } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { Table } from '@radix-ui/themes';
import LogInButton from '../components/sub-components/LogInButton';

export default function Profile() {
  const { user } = useResponse();
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
          <section className="mt-12 md:mt-24 mx-auto max-w-screen-xl md:pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl xl:text-[44px] mb-14 md:mb-24">
                {user.username ? user.username.toUpperCase() : 'Profile'}
              </h1>
            </div>
            {loading ? (
              <div className="flex justify-center w-full">
                <LoadingIcon />
              </div>
            ) : loggedIn && user.username ? (
              <div className="flex items-center flex-col gap-3">
                <div className="text-2xl mb-5 font-bold">
                  Profile Information
                </div>
                <Table.Root variant="surface" size="3">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Plan</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Picks Used Today
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Picks Per Day
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Cost</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell className="hidden md:block">
                        Started
                      </Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body className="text-white">
                    <Table.Row>
                      <Table.Cell>
                        {capitalize(user.subscriptionStatus)}
                      </Table.Cell>
                      <Table.Cell>{user.plan.name}</Table.Cell>
                      <Table.Cell>{user.picksUsed}</Table.Cell>
                      <Table.Cell>{user.plan.picksPerDay}</Table.Cell>
                      <Table.Cell>${user.plan.price} / Month</Table.Cell>
                      <Table.Cell className="hidden md:block">
                        {new Date(user.subscriptionStartDate).toDateString()}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
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
              <div className="w-full text-center">
                <div className="font-saira_bold ">
                  Please log in to view your profile.
                </div>
                <LogInButton />
              </div>
            )}
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
