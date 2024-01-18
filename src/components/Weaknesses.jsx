import { useEffect, useState, useRef } from 'react';
import { API_ROUTES } from '../utils/constants';
import slugify from 'slugify';
import { Table } from '@radix-ui/themes';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

export default function Weaknesses({ game, teamHome, teamAway }) {
  const tooltipContentRef = useRef(null);
  const buttonRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [homeWeakness, setHomeWeakness] = useState([]);
  const [awayWeakness, setAwayWeakness] = useState([]);
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
      <div>
        <Tooltip open={tooltipOpen} onOpenChange={() => {}}>
          <div
            className="mx-auto max-w-screen-xl text-center font-bold text-lg my-6"
            id="test"
          >
            <TooltipTrigger asChild>
              <button
                ref={buttonRef}
                onClick={handleButtonClick}
                className={`hover:bg-gray-900 py-2 px-4 rounded-md ${
                  tooltipOpen ? 'bg-gray-900' : 'bg-gray-700'
                }`}
              >
                Team Weaknesses
                <div className="text-xs">Last 15 Games</div>
              </button>
            </TooltipTrigger>
          </div>
          <TooltipContent
            ref={tooltipContentRef}
            sideOffset={10}
            className="bg-gray-900 p-3 md:p-10 rounded-lg z-50 cursor-default"
          >
            {
              <>
                <div className="mx-auto max-w-screen-xl text-center font-bold">
                  Ranked in Allowed Stat to Opponent Position
                </div>
                <div className="mx-auto max-w-screen-xl text-center mb-4 text-sm">
                  (Bottom half of the NBA Only)
                </div>
                <div className="flex flex-col md:flex-row mx-auto max-w-screen-xl gap-12 mb-5">
                  {awayWeakness.length > 0 && (
                    <div className="flex flex-col gap-2">
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
                            <Table.ColumnHeaderCell>
                              Stat
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                              Rank
                            </Table.ColumnHeaderCell>
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
                                  {Object.keys(weakness)[1].split('-')[0]}
                                </Table.Cell>
                                <Table.Cell>
                                  {Object.values(weakness)[1]}
                                </Table.Cell>
                                <Table.Cell>
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
                    <div className="flex flex-col gap-2">
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
                            <Table.ColumnHeaderCell>
                              Stat
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                              Rank
                            </Table.ColumnHeaderCell>
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
                                  {Object.keys(weakness)[1].split('-')[0]}
                                </Table.Cell>
                                <Table.Cell>
                                  {Object.values(weakness)[1]}
                                </Table.Cell>
                                <Table.Cell>
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
          </TooltipContent>
        </Tooltip>
      </div>
      {/* <div className="mx-auto max-w-screen-xl text-center">
        Ranked in Allowed Stat to Opponent Position
      </div>
      <div className="mx-auto max-w-screen-xl text-center mb-2 text-sm">
        (Bottom half of the NBA Only)
      </div>
      <div className="flex mx-auto max-w-screen-xl gap-3 mb-5">
        {awayWeakness.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="w-full text-center font-bold">{game.awayTeam}</div>
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
                        {Object.keys(weakness)[1].split('-')[0]}
                      </Table.Cell>
                      <Table.Cell>{Object.values(weakness)[1]}</Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col gap-2">
                          {teamHome.players
                            .filter(
                              player => player.position == weakness.position,
                            )
                            .map((player, index) => (
                              <div key={index}>{player.full_name}</div>
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
          <div className="flex flex-col gap-2">
            <div className="w-full text-center font-bold">{game.homeTeam}</div>
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
                        {Object.keys(weakness)[1].split('-')[0]}
                      </Table.Cell>
                      <Table.Cell>{Object.values(weakness)[1]}</Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col gap-2">
                          {teamAway.players.filter(
                            player => player.position == weakness.position,
                          ).length == 0
                            ? 'No Players'
                            : teamAway.players
                                .filter(
                                  player =>
                                    player.position == weakness.position,
                                )
                                .map((player, index) => (
                                  <div key={index}>{player.full_name}</div>
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
      </div> */}
    </>
  );
}
