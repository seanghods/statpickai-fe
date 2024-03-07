import { useEffect } from 'react';
import { AllGamesComp, AllResponses, Footer, Header } from '../components';
import useResponse from '../context/useResponse';
import { useNavigate } from 'react-router-dom';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function UserHome() {
  const { user } = useResponse();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.username) navigate('/');
  }, []);
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="text-cyan-400 font-bold text-2xl md:text-3xl m-4 text-center">
              Today&apos;s Games
            </div>
            <AllGamesComp />
            <div className="ticker-three text-2xl md:text-3xl m-4 text-center mt-20">
              Your Recent Picks
            </div>
            <AllResponses />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
