import { Table } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { showTime } from '../utils/helpers';
import { LoadingIcon } from './sub-components/Icons';

export default function AllGamesComp() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function getGames() {
      setLoading(true);
      const response = await fetch(API_ROUTES.games);
      const data = await response.json();
      setGames(data);
      setLoading(false);
    }
    getGames();
  }, []);
  const isMobile = window.innerWidth <= 768;
  return (
    <>
      {loading ? (
        <div className="flex justify-center w-full">
          <LoadingIcon />
        </div>
      ) : (
        <Table.Root className="mt-12 md:mt-24" variant="surface" size="2">
          <Table.Header>
            <Table.Row style={{ color: 'white' }}>
              <Table.ColumnHeaderCell style={{ fontSize: isMobile && '13px' }}>
                Away Team
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Spread
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ fontSize: isMobile && '13px' }}>
                Home Team
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Spread
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ fontSize: isMobile && '13px' }}>
                <div className="hidden md:block">Over/Under</div>
                <div className="md:hidden">Over</div>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ fontSize: isMobile && '13px' }}>
                Start <span className="hidden md:inline-block">Time</span>
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-white">
            {games.map((game, index) => {
              return (
                <Table.Row
                  key={index}
                  to={`/game/${game._id}`}
                  state={{ game }}
                  className="cursor-pointer hover:bg-gray-700"
                  style={{ color: 'white' }}
                  onClick={() =>
                    navigate(`/game/${game._id}`, { state: { game } })
                  }
                >
                  <Table.Cell style={{ fontSize: isMobile ? '12px' : '16px' }}>
                    {game.awayTeam.split(' ')[2] ? (
                      <>
                        {game.awayTeam.split(' ')[0]}{' '}
                        {game.awayTeam.split(' ')[1]}{' '}
                        <br className="md:hidden" />{' '}
                        {game.awayTeam.split(' ')[2]}
                      </>
                    ) : (
                      <>
                        {game.awayTeam.split(' ')[0]}
                        <br className="md:hidden" />{' '}
                        {game.awayTeam.split(' ')[1]}
                      </>
                    )}{' '}
                    <br className="md:hidden" />(
                    {game.awayTeamWinOdds > 0
                      ? `+${game.awayTeamWinOdds}`
                      : game.awayTeamWinOdds}
                    )
                  </Table.Cell>
                  <Table.Cell className="hidden md:block">
                    {game.awayTeamWinOdds < game.homeTeamWinOdds ? '-' : '+'}
                    {Math.abs(game.teamSpread)} (
                    {game.awayTeamSpreadOdds > 0
                      ? `+${game.awayTeamSpreadOdds}`
                      : game.awayTeamSpreadOdds}
                    )
                  </Table.Cell>
                  <Table.Cell style={{ fontSize: isMobile ? '12px' : '16px' }}>
                    {game.homeTeam.split(' ')[2] ? (
                      <>
                        {game.homeTeam.split(' ')[0]}{' '}
                        {game.homeTeam.split(' ')[1]}{' '}
                        <br className="md:hidden" />{' '}
                        {game.homeTeam.split(' ')[2]}
                      </>
                    ) : (
                      <>
                        {game.homeTeam.split(' ')[0]}
                        <br className="md:hidden" />{' '}
                        {game.homeTeam.split(' ')[1]}
                      </>
                    )}{' '}
                    <br className="md:hidden" />(
                    {game.homeTeamWinOdds > 0
                      ? `+${game.homeTeamWinOdds}`
                      : game.homeTeamWinOdds}
                    )
                  </Table.Cell>
                  <Table.Cell className="hidden md:block">
                    {game.homeTeamWinOdds < game.awayTeamWinOdds ? '-' : '+'}
                    {Math.abs(game.teamSpread)} (
                    {game.homeTeamSpreadOdds > 0
                      ? `+${game.homeTeamSpreadOdds}`
                      : game.homeTeamSpreadOdds}
                    )
                  </Table.Cell>
                  <Table.Cell style={{ fontSize: isMobile ? '12px' : '16px' }}>
                    {game.overUnder.toFixed(1)}
                  </Table.Cell>
                  <Table.Cell
                    className={`${isMobile && 'w-[80px]'}`}
                    style={{ fontSize: isMobile ? '12px' : '16px' }}
                  >
                    {showTime(game.startTime)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
}
