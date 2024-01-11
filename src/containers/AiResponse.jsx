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
import logo from '../assets/logotransp.png';

export default function AiResponse() {
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [response, setResponse] = useState({ message: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [statName, setStatName] = useState('');
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
      console.log(data.stat);
      switch (data.stat) {
        case '3pm': {
          setStatName('3 Point FG');
          break;
        }
        case 'pr': {
          setStatName('Points and Rebounds');
          break;
        }
        case 'pa': {
          setStatName('Points and Assists');
          break;
        }
        case 'pra': {
          setStatName('Points, Rebounds and Assists');
          break;
        }
        case 'ra': {
          setStatName('Rebounds and Assists');
          break;
        }
      }
      setResponse(data);
      setLoadingAi(false);
    }
    if (state) {
      const passedResponse = state.response;
      switch (passedResponse.stat) {
        case '3pm': {
          setStatName('3 Point FG');
          break;
        }
        case 'pr': {
          setStatName('Points and Rebounds');
          break;
        }
        case 'pa': {
          setStatName('Points and Assists');
          break;
        }
        case 'pra': {
          setStatName('Points, Rebounds, and Assists');
          break;
        }
        case 'ra': {
          setStatName('Rebounds and Assists');
          break;
        }
      }
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
          <section className="mt-10 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className={`ticker-two font-bold text-3xl mb-14 text-center`}>
                {response.message ? (
                  <div>
                    {response.player} +/- <br className="md:hidden" />
                    {response.line} {statName || capitalize(response.stat)}
                  </div>
                ) : (
                  'Retrieving'
                )}
              </h1>
            </div>
            <div className="flex-1 w-full h-full shadow-lg shadow-gray-700 text-gray-300">
              <div className="w-full flex justify-center my-5">
                <img src={logo} alt="pic of logo" className="w-12 h-12" />
              </div>
              <div className="flex-1 md:mx-28 flex md:text-lg rounded-lg flex-col justify-center items-center">
                <div className="flex flex-col gap-4 p-4 md:p-12Z">
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
                  <div className="text-center mt-8">
                    <Button onClick={() => navigate(-1)}>GO BACK</Button>
                  </div>
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
