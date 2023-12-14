import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Footer } from '../components';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from '../components/sub-components/LoadingAiModal';
import { ScrollToTop } from '../utils/helpers';
// import Typewriter from 'typewriter-effect';

export default function AiResponse() {
  const [loadingAi, setLoadingAi] = useState(false);
  const [response, setResponse] = useState({ message: '' });
  const { path } = useParams();
  const date = path.substring(0, 10);
  const id = path.substring(11);
  useEffect(() => {
    async function fetchMessage() {
      setLoadingAi(true);
      const response = await fetch(
        `${API_ROUTES.message}?date=${date}&id=${id}`,
      );
      const data = await response.json();
      setResponse(data);
      setLoadingAi(false);
    }
    fetchMessage();
  }, [id]);
  const finalMessage = response.message
    .split('\n')
    .map((line, index) => <div key={index}>{line}</div>);
  return (
    <>
      <ScrollToTop />
      {loadingAi && <LoadingAiModal />}
      <div className="hero h-[700px] w-full trapezoid-ball-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-5xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            {response.message
              ? `${response.player} +/- ${response.line} ${
                  response.stat.charAt(0).toUpperCase() + response.stat.slice(1)
                }`
              : 'Retrieving'}
          </div>
        </div>
      </div>
      <div className="flex-1 mx-24 flex font-inter bg-gray-300 p-5 rounded-lg my-5 flex-col justify-center items-center">
        <div className="w-4/5 flex my-12 flex-col gap-4">
          {/* {response.message && (
            <Typewriter
              options={{ delay: 25, cursor: '#' }}
              onInit={typewriter => {
                typewriter.typeString(finalMessage).start();
              }}
            />
          )} */}
          {finalMessage}
        </div>
      </div>
      <Footer />
    </>
  );
}
