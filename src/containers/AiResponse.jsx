import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header, Footer, AiAnalysis } from '../components';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from '../components/sub-components/LoadingAiModal';
import { ScrollToTop, capitalize } from '../utils/helpers';
import useResponse from '../context/useResponse';
import { LoadingAiIcon, LoadingIcon } from '../components/sub-components/Icons';
// import DOMPurify from 'dompurify';
import { Button, Table } from '@radix-ui/themes';
import logo from '../assets/logotransp.png';
import ShareModal from '../components/sub-components/ShareModal';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function AiResponse() {
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [response, setResponse] = useState({ fullStats: {} });
  useEffect(() => {
    console.log(response);
  }, [response]);
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
    document.title = response.player ? response.player : 'Response';
  }, [response]);
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
      console.log(data);
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
        case 'sb': {
          setStatName('Steals and Blocks');
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
        case 'sb': {
          setStatName('Steals and Blocks');
          break;
        }
      }
      setResponse(passedResponse);
    } else {
      fetchMessage();
    }
  }, [statName]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (response._id && !response.message) {
          const resp = await fetch(
            `${API_ROUTES.checkResponse}?id=${response._id}`,
            {
              credentials: 'include',
              withCredentials: true,
            },
          );
          if (!resp.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await resp.json();
          if (data.success) {
            setResponse(data);
            clearInterval(intervalId);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [response._id]);

  // function renderFormattedText(text) {
  //   const withStrongTags = text.replace(
  //     /\*\*(.*?)\*\*/g,
  //     '<strong>$1</strong>',
  //   );
  //   const sanitizedHtml = DOMPurify.sanitize(withStrongTags);
  //   return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  // }
  // const final = response.message ? response.message.split('\n') : null;
  // const finalMessage =
  //   final &&
  //   final.map((line, index) => {
  //     return index == 0 ? (
  //       <div className="border-b-2 border-gray-700 p-3" key={index}>
  //         {renderFormattedText(line)}
  //       </div>
  //     ) : index == final.length - 1 ? (
  //       <div className="border-t-2 border-gray-700 p-3">
  //         {renderFormattedText(line)}
  //       </div>
  //     ) : (
  //       <div key={index}>{renderFormattedText(line)}</div>
  //     );
  //   });

  return (
    <>
      <ScrollToTop />
      {loadingAi && <LoadingAiModal />}
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col bg-image">
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
              <h1
                className={`ticker-three font-bold text-2xl md:text-3xl md:mb-10 text-center brightness-125`}
              >
                {response.player ? (
                  <div>
                    {response.player} +/- <br className="md:hidden" />
                    {response.line}{' '}
                    {statName ||
                      (response.stat ? capitalize(response.stat) : null)}
                  </div>
                ) : (
                  'Retrieving'
                )}
              </h1>
            </div>
            <div className="flex-1 w-full h-full shadow-lg shadow-gray-700 text-gray-200">
              <div className="w-full flex justify-center my-5">
                <img src={logo} alt="pic of logo" className="w-12 h-12" />
              </div>
              <div className="w-full flex justify-center my-5">
                {/* <ShareModal response={response} /> */}
              </div>
              <div className="flex-1 md:mx-10 flex md:text-lg rounded-lg flex-col justify-center items-center">
                <div className="flex flex-col gap-4 p-4 md:p-12Z">
                  {loadingAuth ? (
                    <div className="flex justify-center w-full">
                      <LoadingIcon />
                    </div>
                  ) : loggedIn ? (
                    user.responses &&
                    user.responses.some(obj => obj._id === id) ? (
                      <>
                        {response.fullStats &&
                          response.fullStats.length > 0 && (
                            <div className="border-2 border-gray-700">
                              <div className="flex flex-col md:grid grid-cols-3 gap-2 p-3 rounded-lg border-gray-700">
                                {response.fullStats.map((column, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex flex-col gap-3"
                                    >
                                      <div className="w-full text-center">
                                        {/* {index == '0' ? (
                                        <strong className="ticker-three brightness-125 text-lg md:text-xl">
                                          {response.player}
                                        </strong>
                                      ) : index == '1' ? (
                                        <strong className="ticker-one brightness-125 text-lg md:text-xl">
                                          {response.playerTeam}
                                        </strong>
                                      ) : (
                                        <strong className="ticker-two brightness-125 text-lg md:text-xl">
                                          {response.opponentTeam}
                                        </strong>
                                      )} */}
                                      </div>
                                      <Table.Root variant="surface" size="1">
                                        <Table.Header>
                                          <Table.Row style={{ color: 'white' }}>
                                            {/* style={{ fontSize: isMobile && '12px' }} */}
                                            <Table.ColumnHeaderCell>
                                              {index == '0' ? (
                                                <strong className="ticker-three brightness-125 text-lg md:text-xl">
                                                  {response.player}
                                                </strong>
                                              ) : index == '1' ? (
                                                <strong className="ticker-one brightness-125 text-lg md:text-xl">
                                                  {response.playerTeam}
                                                </strong>
                                              ) : (
                                                <strong className="ticker-two brightness-125 text-lg md:text-xl">
                                                  {response.opponentTeam}
                                                </strong>
                                              )}
                                            </Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>
                                              <div
                                                className={`flex w-full h-full items-center justify-end pr-3`}
                                              >
                                                Stat
                                              </div>
                                            </Table.ColumnHeaderCell>
                                          </Table.Row>
                                        </Table.Header>
                                        <Table.Body className="text-white">
                                          {column.map((stat, index) => {
                                            return (
                                              <Table.Row key={index}>
                                                <Table.Cell>
                                                  <strong>{stat[0]}</strong>
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap flex justify-end !pr-5 !h-full">
                                                  {stat[0].includes('Rank') ? (
                                                    <>
                                                      <strong>{stat[1]}</strong>
                                                      {'  '}
                                                      <span className="text-[10px] flex items-end">
                                                        / 30
                                                      </span>
                                                    </>
                                                  ) : (
                                                    stat[1]
                                                  )}
                                                </Table.Cell>
                                              </Table.Row>
                                            );
                                          })}
                                        </Table.Body>
                                      </Table.Root>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="flex flex-col w-full items-end pl-2 pr-2 text-xs md:text-sm italic">
                                <div className="text-right w-full flex justify-between">
                                  <div className="flex items-end">
                                    Stat Pick AI
                                  </div>
                                  <div>
                                    L10 = Last 10 Games{' '}
                                    <span className="hidden md:inline-flex">
                                      |
                                    </span>{' '}
                                    <br className="md:hidden" /> L15 = Last 15
                                    Games{' '}
                                    <span className="hidden md:inline-flex">
                                      |
                                    </span>{' '}
                                    <br className="md:hidden" />
                                    SZN = This Season
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        {response.message ? (
                          <AiAnalysis response={response} />
                        ) : (
                          // <div className="md:mx-28 flex flex-col items-center justify-center">
                          //   <div className="transition duration-200 ease-in-out hover:scale-125">
                          //     <KeyboardDoubleArrowRightIcon
                          //       sx={{ fontSize: 50, color: 'skyblue' }}
                          //       className="cursor-pointer"
                          //       onClick={() => {
                          //         setShowAnalysis(true);
                          //       }}
                          //     />
                          //   </div>
                          //   <div className="italic cursor-default text-sky-100">
                          //     Click to view the AI Analysis
                          //   </div>
                          // </div>
                          <div className="md:mx-28 flex flex-col items-center justify-center">
                            <div className="">
                              <LoadingAiIcon />
                            </div>
                            <div className="italic">
                              Your AI Response is currently generating. This may
                              take up to a minute.
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-center w-full">
                        {`Please ensure your account has completed the analysis for 
                ${response.player} +/- ${response.line}
                ${response.stat ? capitalize(response.stat) : null}.`}
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
