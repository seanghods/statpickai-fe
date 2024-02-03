import { useEffect, useState } from 'react';
import { Footer, Header } from '../components';
import { API_ROUTES } from '../utils/constants';
import useResponse from '../context/useResponse';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('');
  const { setUser } = useResponse();
  useEffect(() => {
    document.title = 'Verify Email';
  }, []);
  useEffect(() => {
    const verifyEmail = async () => {
      // Extract the token from the URL
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');

      if (!token) {
        setVerificationStatus('Invalid verification link.');
        return;
      }

      try {
        const response = await fetch(
          `${API_ROUTES.verifyEmail}?token=${token}`,
        );
        const data = await response.json();
        setVerificationStatus(data.message);
        setUser(data.user);
      } catch (error) {
        setVerificationStatus('Failed to verify email. Please try again.');
      }
    };

    verifyEmail();
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
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
            <div className="md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl xl:text-[44px]">
                Verify Email
              </h1>
            </div>
            <div className="w-full text-center font-bold text-xl flex flex-col gap-12 items-center justify-center my-12 md:my-0">
              {verificationStatus}
              <div>Thank you.</div>
              <div className="w-[200px]">
                <Button onClick={() => navigate('/games')}>
                  Visit Today&apos;s Games
                </Button>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
