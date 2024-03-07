import { Footer, Header } from '../components';
import { useLocation } from 'react-router-dom';
import { GameInfo } from '../components';
import { ScrollToTop, getRandomClassName } from '../utils/helpers';
import { backgroundGradient } from '../utils/helperComponents';
import { useEffect, useState } from 'react';
import { getNBALogos } from '../components/sub-components/NBALogos';

export default function Game() {
  const location = useLocation();
  const { state } = location;
  const game = state.game;
  const [colorClass, setColorClass] = useState('');
  useEffect(() => {
    setColorClass(getRandomClassName());
  }, []);
  useEffect(() => {
    document.title = `${game.awayTeam.split(' ').slice(-1)} vs ${game.homeTeam
      .split(' ')
      .slice(-1)}`;
  }, [game]);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <ScrollToTop />
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl md:pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="font-bold space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`${colorClass} uppercase font-bold text-xl flex-wrap md:text-3xl mb-6 text-center flex gap-3 items-center`}
              >
                {getNBALogos(game.awayTeam.split(' ').slice(-1)[0], 12, 12)}
                {game.awayTeam.split(' ').slice(-1)}{' '}
                <span className="text-[#4DE234]">VS</span>{' '}
                {game.homeTeam.split(' ').slice(-1)}
                {getNBALogos(game.homeTeam.split(' ').slice(-1)[0], 12, 12)}
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
