import { Table } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import { showTime } from '../utils/helpers';
import { LoadingIcon } from './sub-components/Icons';
import useResponse from '../context/useResponse';
import { getNBALogos } from './sub-components/NBALogos';

export default function AllGamesComp() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
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
  const { isMobile } = useResponse();
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full">
          <LoadingIcon />
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <Table.Root
            className="mt-6 md:mt-12"
            variant="surface"
            size="2"
            style={isMobile ? null : { width: '90%' }}
          >
            <Table.Header>
              <Table.Row style={{ color: 'white' }}>
                <Table.ColumnHeaderCell
                  style={{ fontSize: isMobile && '12px' }}
                >
                  Start <span className="hidden md:inline-block">Time</span>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ fontSize: isMobile && '12px' }}
                >
                  Away
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Spread
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ fontSize: isMobile && '12px' }}
                >
                  Home
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ fontSize: isMobile && '12px' }}
                  className="hidden md:table-cell"
                >
                  Spread
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell
                  style={{ fontSize: isMobile && '12px' }}
                >
                  <div className="hidden md:block">Over/Under</div>
                  <div className="md:hidden">Over</div>
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
                    <Table.Cell
                      className={`${isMobile && 'w-[40px]'}`}
                      style={{ fontSize: isMobile ? '12px' : '14px' }}
                    >
                      <div className="h-full flex items-center">
                        {showTime(game.startTime)}
                      </div>
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: 500,
                        color: game.awayBackToBack ? 'pink' : null,
                      }}
                    >
                      <div className="flex gap-2 h-full items-center">
                        {getNBALogos(
                          game.awayTeam.split(' ').slice(-1)[0],
                          7,
                          7,
                        )}
                        {game.awayTeam.split(' ')[2] ? (
                          <>
                            {isMobile
                              ? game.awayTeam.split(' ')[2]
                              : game.awayTeam}
                            {/* {game.awayTeam.split(' ')[0]}{' '}
                        {game.awayTeam.split(' ')[1]}{' '}
                        <br className="md:hidden" />{' '}
                        {game.awayTeam.split(' ')[2]} */}
                          </>
                        ) : (
                          <>
                            {isMobile
                              ? game.awayTeam.split(' ')[1]
                              : game.awayTeam}
                            {/* {game.awayTeam.split(' ')[0]}
                        <br className="md:hidden" />{' '}
                        {game.awayTeam.split(' ')[1]} */}
                          </>
                        )}{' '}
                        <br className="md:hidden" />(
                        {game.awayTeamWinOdds > 0
                          ? `+${game.awayTeamWinOdds}`
                          : game.awayTeamWinOdds}
                        )
                      </div>
                    </Table.Cell>
                    <Table.Cell className="hidden md:flex !h-full items-center">
                      {game.awayTeamWinOdds < game.homeTeamWinOdds ? '-' : '+'}
                      {Math.abs(game.teamSpread)} (
                      {game.awayTeamSpreadOdds > 0
                        ? `+${game.awayTeamSpreadOdds}`
                        : game.awayTeamSpreadOdds}
                      )
                    </Table.Cell>
                    <Table.Cell
                      style={{
                        fontSize: isMobile ? '12px' : '14px',
                        // padding: '0px',
                        fontWeight: 500,
                        color: game.homeBackToBack ? 'pink' : null,
                      }}
                    >
                      <div className="flex gap-2 h-full items-center">
                        {getNBALogos(
                          game.homeTeam.split(' ').slice(-1)[0],
                          7,
                          7,
                        )}
                        {game.homeTeam.split(' ')[2] ? (
                          <>
                            {isMobile
                              ? game.homeTeam.split(' ')[2]
                              : game.homeTeam}
                            {/* {game.homeTeam.split(' ')[0]}{' '}
                        {game.homeTeam.split(' ')[1]}{' '}
                        <br className="md:hidden" />{' '}
                        {game.homeTeam.split(' ')[2]} */}
                          </>
                        ) : (
                          <>
                            {isMobile
                              ? game.homeTeam.split(' ')[1]
                              : game.homeTeam}
                            {/* {game.homeTeam.split(' ')[0]}
                        <br className="md:hidden" />{' '}
                        {game.homeTeam.split(' ')[1]} */}
                          </>
                        )}{' '}
                        <br className="md:hidden" />(
                        {game.homeTeamWinOdds > 0
                          ? `+${game.homeTeamWinOdds}`
                          : game.homeTeamWinOdds}
                        )
                      </div>
                    </Table.Cell>
                    <Table.Cell className="hidden md:flex !h-full items-center">
                      {game.homeTeamWinOdds < game.awayTeamWinOdds ? '-' : '+'}
                      {Math.abs(game.teamSpread)} (
                      {game.homeTeamSpreadOdds > 0
                        ? `+${game.homeTeamSpreadOdds}`
                        : game.homeTeamSpreadOdds}
                      )
                    </Table.Cell>
                    <Table.Cell
                      style={{ fontSize: isMobile ? '12px' : '14px' }}
                    >
                      <div className="h-full flex items-center">
                        {game.overUnder.toFixed(1)}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </div>
      )}
    </>
  );
}
