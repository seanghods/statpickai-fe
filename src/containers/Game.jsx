import { Footer, Header } from '../components';
import { useLocation } from 'react-router-dom';
import { GameInfo } from '../components';

export default function Game() {
  const location = useLocation();
  const { state } = location;
  const game = state.game;
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-hoop-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            {game.awayTeam.toUpperCase().split(' ').slice(-1)}{' '}
            <span className="text-[#4DE234]">VS</span>{' '}
            {game.homeTeam.toUpperCase().split(' ').slice(-1)}
          </div>
        </div>
      </div>
      <GameInfo game={game} />
      <Footer />
    </>
  );
}
