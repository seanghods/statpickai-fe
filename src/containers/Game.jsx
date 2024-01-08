import { Footer, Header } from '../components';
import { useLocation } from 'react-router-dom';
import { GameInfo } from '../components';
import { ScrollToTop, getRandomClassName } from '../utils/helpers';
import { useEffect, useState } from 'react';

export default function Game() {
  const location = useLocation();
  const { state } = location;
  const game = state.game;
  const [colorClass, setColorClass] = useState('');
  useEffect(() => {
    setColorClass(getRandomClassName());
  }, []);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <ScrollToTop />
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl md:pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="font-bold space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`${colorClass} uppercase font-bold text-3xl mb-6 text-center`}
              >
                {game.awayTeam.split(' ').slice(-1)}{' '}
                <span className="text-[#4DE234]">VS</span>{' '}
                {game.homeTeam.split(' ').slice(-1)}
              </h1>
            </div>
          </section>
        </div>
        <GameInfo game={game} />
        <Footer />
      </div>
    </>
  );
}
