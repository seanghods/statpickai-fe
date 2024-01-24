import { useEffect, useState, useRef } from 'react';
import { API_ROUTES } from '../utils/constants';
import slugify from 'slugify';
import { Button, Dialog, Table } from '@radix-ui/themes';

export default function Weaknesses({ game, teamHome, teamAway }) {
  const tooltipContentRef = useRef(null);
  const buttonRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [homeWeakness, setHomeWeakness] = useState([]);
  const [awayWeakness, setAwayWeakness] = useState([]);
  const isMobile = window.innerWidth <= 768;
  const handleButtonClick = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const handleClickOutside = event => {
    if (
      !buttonRef.current.contains(event.target) &&
      (!tooltipContentRef.current ||
        !tooltipContentRef.current.contains(event.target))
    ) {
      setTooltipOpen(false);
    }
  };

  useEffect(() => {
    if (tooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipOpen]);
  useEffect(() => {
    async function fetchWeaknesses() {
      const homeTeamSlug = slugify(game.homeTeam, { lower: true });
      const awayTeamSlug = slugify(game.awayTeam, { lower: true });
      const response = await fetch(
        `${API_ROUTES.weaknesses}?home_team=${homeTeamSlug}&away_team=${awayTeamSlug}`,
      );
      const data = await response.json();
      const [awayWeakness, homeWeakness] = data;
      setAwayWeakness(awayWeakness);
      setHomeWeakness(homeWeakness);
    }
    fetchWeaknesses();
  }, []);
  return (
    <>
      <Dialog.Root onOpenChange={() => {}} open={tooltipOpen}>
        <Dialog.Trigger>
          <div className="mx-auto max-w-screen-xl text-center font-bold text-lg my-4">
            <Button
              ref={buttonRef}
              onClick={handleButtonClick}
              style={isMobile ? { padding: '20px 10px' } : { padding: '20px' }}
              className={` py-2 px-2 md:px-4 cursor-pointer rounded-md p-6 w-[130px] md:w-[165px]  ${
                tooltipOpen ? 'bg-gray-900' : 'null'
              }`}
            >
              <div className="flex flex-col text-xs md:text-sm">
                <div>Team Weaknesses</div>
                <div className="text-[10px] md:text-xs text-center">
                  Last 15 Games
                </div>
              </div>
            </Button>
          </div>
        </Dialog.Trigger>
        <Dialog.Content
          style={!isMobile && { minWidth: 750 }}
          ref={tooltipContentRef}
          className="bg-gray-900 p-3 md:p-10 rounded-lg z-50 cursor-default"
        >
          <Dialog.Title>
            <div className="text-lg w-full font-bold leading-6 flex justify-center items-center border-b-2 border-gray-400 pb-2">
              <div className="flex-1"></div>
              <div className="flex-1 text-center">Weaknesses</div>
              <div className="flex-1 flex justify-end">
                <Dialog.Close>
                  <Button
                    onClick={handleButtonClick}
                    variant="soft"
                    color="gray"
                  >
                    <span className="text-xs text-gray-400">X</span>
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Title>
          {
            <>
              <div className="mx-auto max-w-screen-xl text-center font-bold">
                Ranked in Allowed Stat to Opponent Position
              </div>
              <div className="mx-auto max-w-screen-xl text-center mb-4 text-sm">
                (Bottom Half of the NBA Only) - Look for Overs
              </div>
              <div className="flex flex-col md:flex-row mx-auto max-w-screen-xl gap-12 mb-5">
                {awayWeakness.length > 0 && (
                  <div className="flex flex-col">
                    <div
                      className={`w-full text-center font-bold rounded-sm`}
                      style={{
                        color: teamAway.secondary_color_hex,
                        backgroundColor: teamAway.primary_color_hex,
                      }}
                    >
                      {game.awayTeam}
                    </div>
                    <Table.Root variant="surface" size="1">
                      <Table.Header>
                        <Table.Row style={{ color: 'white' }}>
                          <Table.ColumnHeaderCell
                          // style={{ fontSize: isMobile && '12px' }}
                          >
                            Position
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Stat</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Opponent Players
                          </Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body className="text-white">
                        {awayWeakness.map((weakness, index) => {
                          return (
                            <Table.Row key={index} style={{ color: 'white' }}>
                              <Table.Cell>{weakness.position}</Table.Cell>
                              <Table.Cell>
                                <div className="flex flex-col">
                                  {Object.keys(weakness)[1] && (
                                    <div>
                                      {Object.keys(weakness)[1].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[2] && (
                                    <div>
                                      {Object.keys(weakness)[2].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[3] && (
                                    <div>
                                      {Object.keys(weakness)[3].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[4] && (
                                    <div>
                                      {Object.keys(weakness)[4].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[5] && (
                                    <div>
                                      {Object.keys(weakness)[5].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[6] && (
                                    <div>
                                      {Object.keys(weakness)[6].split('-')[0]}
                                    </div>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <div className="flex flex-col">
                                  {' '}
                                  {Object.values(weakness)[1] && (
                                    <div>{Object.values(weakness)[1]}</div>
                                  )}
                                  {Object.values(weakness)[2] && (
                                    <div>{Object.values(weakness)[2]}</div>
                                  )}
                                  {Object.values(weakness)[3] && (
                                    <div>{Object.values(weakness)[3]}</div>
                                  )}
                                  {Object.values(weakness)[4] && (
                                    <div>{Object.values(weakness)[4]}</div>
                                  )}
                                  {Object.values(weakness)[5] && (
                                    <div>{Object.values(weakness)[5]}</div>
                                  )}
                                  {Object.values(weakness)[6] && (
                                    <div>{Object.values(weakness)[6]}</div>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                <div className="flex flex-col gap-2">
                                  {teamHome.players.filter(
                                    player =>
                                      player.position == weakness.position,
                                  ).length == 0
                                    ? 'No Players'
                                    : teamHome.players
                                        .filter(
                                          player =>
                                            player.position ==
                                            weakness.position,
                                        )
                                        .map((player, index) => (
                                          <div key={index}>
                                            {player.full_name}
                                          </div>
                                        ))}
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table.Root>
                  </div>
                )}
                {homeWeakness.length > 0 && (
                  <div className="flex flex-col">
                    <div
                      className="w-full text-center font-bold rounded-sm"
                      style={{
                        backgroundColor: teamHome.primary_color_hex,
                        color: teamHome.secondary_color_hex,
                      }}
                    >
                      {game.homeTeam}
                    </div>
                    <Table.Root variant="surface" size="1">
                      <Table.Header>
                        <Table.Row style={{ color: 'white' }}>
                          <Table.ColumnHeaderCell
                          // style={{ fontSize: isMobile && '12px' }}
                          >
                            Position
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Stat</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>Rank</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Opponent Players
                          </Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body className="text-white">
                        {homeWeakness.map((weakness, index) => {
                          return (
                            <Table.Row key={index} style={{ color: 'white' }}>
                              <Table.Cell>{weakness.position}</Table.Cell>
                              <Table.Cell>
                                <div className="flex flex-col">
                                  {Object.keys(weakness)[1] && (
                                    <div>
                                      {Object.keys(weakness)[1].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[2] && (
                                    <div>
                                      {Object.keys(weakness)[2].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[3] && (
                                    <div>
                                      {Object.keys(weakness)[3].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[4] && (
                                    <div>
                                      {Object.keys(weakness)[4].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[5] && (
                                    <div>
                                      {Object.keys(weakness)[5].split('-')[0]}
                                    </div>
                                  )}
                                  {Object.keys(weakness)[6] && (
                                    <div>
                                      {Object.keys(weakness)[6].split('-')[0]}
                                    </div>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell>
                                <div className="flex flex-col">
                                  {' '}
                                  {Object.values(weakness)[1] && (
                                    <div>{Object.values(weakness)[1]}</div>
                                  )}
                                  {Object.values(weakness)[2] && (
                                    <div>{Object.values(weakness)[2]}</div>
                                  )}
                                  {Object.values(weakness)[3] && (
                                    <div>{Object.values(weakness)[3]}</div>
                                  )}
                                  {Object.values(weakness)[4] && (
                                    <div>{Object.values(weakness)[4]}</div>
                                  )}
                                  {Object.values(weakness)[5] && (
                                    <div>{Object.values(weakness)[5]}</div>
                                  )}
                                  {Object.values(weakness)[6] && (
                                    <div>{Object.values(weakness)[6]}</div>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                <div className="flex flex-col gap-2">
                                  {teamAway.players.filter(
                                    player =>
                                      player.position == weakness.position,
                                  ).length == 0
                                    ? 'No Players'
                                    : teamAway.players
                                        .filter(
                                          player =>
                                            player.position ==
                                            weakness.position,
                                        )
                                        .map((player, index) => (
                                          <div key={index}>
                                            {player.full_name}
                                          </div>
                                        ))}
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table.Root>
                  </div>
                )}
              </div>
            </>
          }

          <Dialog.Close>
            <Button onClick={handleButtonClick} variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
