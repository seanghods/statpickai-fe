import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header, Footer } from '../components';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from '../components/sub-components/LoadingAiModal';
import { ScrollToTop, capitalize } from '../utils/helpers';
import useResponse from '../context/useResponse';
import { LoadingIcon } from '../components/sub-components/Icons';
import DOMPurify from 'dompurify';
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
      <div className="hero h-[400px] md:h-[700px] w-full trapezoid-ball-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-2xl md:text-5xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24 uppercase">
            {response.message
              ? `${response.player} +/- ${response.line} ${response.stat}`
              : 'Retrieving'}
          </div>
        </div>
      </div>
      <div className="flex-1 w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
        <div className="flex-1 md:mx-28 flex font-saira text-black md:text-lg p-3 md:p-5 rounded-lg my-5 flex-col justify-center items-center">
          <div className="md:w-4/5 flex md:my-12 flex-col gap-4 bg-gray-300 shadow-lg p-4 md:p-12 shadow-black rounded-lg">
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
              user.responses && user.responses.some(obj => obj._id === id) ? (
                finalMessage
              ) : (
                <div className="flex justify-center w-full font-saira_bold uppercase">
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
      <Footer />
    </>
  );
}
