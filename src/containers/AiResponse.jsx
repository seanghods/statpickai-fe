import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header, Footer } from '../components';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from '../components/sub-components/LoadingAiModal';
import { ScrollToTop, capitalize } from '../utils/helpers';
import useResponse from '../context/useResponse';
import { LoadingIcon } from '../components/sub-components/Icons';
import DOMPurify from 'dompurify';
import { Button } from '@radix-ui/themes';
// import Typewriter from 'typewriter-effect';

export default function AiResponse() {
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [response, setResponse] = useState({ message: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const { user } = useResponse();
  const location = useLocation();
  const { state } = location;
  const { path } = useParams();
  const date = path.substring(0, 10);
  const id = path.substring(11);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setLoadingAuth(true);
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
      setLoadingAuth(false);
    }
    checkAuthenticationStatus();
  }, []);
  useEffect(() => {
    async function fetchMessage() {
      setLoadingAi(true);
      const response = await fetch(
        `${API_ROUTES.message}?date=${date}&id=${id}`,
        { credentials: 'include', withCredentials: true },
      );
      const data = await response.json();
      setResponse(data);
      setLoadingAi(false);
    }
    if (state) {
      const passedResponse = state.response;
      setResponse(passedResponse);
    } else {
      fetchMessage();
    }
  }, [id]);
  function renderFormattedText(text) {
    const withStrongTags = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>',
    );
    const sanitizedHtml = DOMPurify.sanitize(withStrongTags);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
  const finalMessage = response.message
    .split('\n')
    .map((line, index) => <div key={index}>{renderFormattedText(line)}</div>);
  return (
    <>
      <ScrollToTop />
      {loadingAi && <LoadingAiModal />}
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
          <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl xl:text-[44px] mb-6 text-center">
                {response.message ? (
                  <div>
                    {response.player} +/- <br className="md:hidden" />
                    {response.line} {capitalize(response.stat)}
                  </div>
                ) : (
                  'Retrieving'
                )}
              </h1>
            </div>
            <div className="flex-1 w-full h-full">
              <div className="text-center mt-8">
                <Button onClick={() => navigate(-1)}>GO BACK</Button>
              </div>
              <div className="flex-1 md:mx-28 flex md:text-lg p-3 md:p-3 rounded-lg my-2 flex-col justify-center items-center">
                <div className="flex md:my-4 flex-col gap-4 p-4 md:p-12Z">
                  {/* {response.message && (
            <Typewriter
              options={{ delay: 25, cursor: '#' }}
              onInit={typewriter => {
                typewriter.typeString(finalMessage).start();
              }}
            />
          )} */}
                  {loadingAuth ? (
                    <div className="flex justify-center w-full">
                      <LoadingIcon />
                    </div>
                  ) : loggedIn ? (
                    user.responses &&
                    user.responses.some(obj => obj._id === id) ? (
                      finalMessage
                    ) : (
                      <div className="flex justify-center w-full">
                        {`Please ensure your account has completed the analysis for 
                ${response.player} +/- ${response.line}
                ${capitalize(response.stat)}.`}
                      </div>
                    )
                  ) : (
                    <div className="flex justify-center w-full font-saira_bold text-2xl uppercase">
                      Please log in to view this analysis.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
