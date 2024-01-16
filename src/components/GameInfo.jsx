import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from './sub-components/LoadingAiModal';
import slugify from 'slugify';
import useResponse from '../context/useResponse';
import toast from 'react-hot-toast';
import { Table, Tooltip } from '@radix-ui/themes';

export default function GameInfo({ game }) {
  const {
    loadingAi,
    setLoadingAi,
    user,
    setUser,
    setAnalysisData,
    setAnalysisComplete,
    setResponseFailed,
  } = useResponse();
  const [teamHome, setTeamHome] = useState({ players: [] });
  const [teamAway, setTeamAway] = useState({ players: [] });
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedStat, setSelectedStat] = useState();
  const [line, setLine] = useState();
  const numbers = Array.from(
    { length: 69 / 0.5 + 1 },
    (_, index) => index * 0.5,
  );
  const colorsAway = {
    backgroundColor: teamAway.primary_color_hex,
    color: teamAway.secondary_color_hex,
  };
  const colorsHome = {
    backgroundColor: teamHome.primary_color_hex,
    color: teamHome.secondary_color_hex,
  };
  const statButtons = [
    { id: 'points', name: 'Points', disabled: false },
    { id: 'rebounds', name: 'Rebounds', disabled: false },
    { id: 'assists', name: 'Assists', disabled: false },
    { id: '3pm', name: '3 Point FG', disabled: false },
    { id: 'steals', name: 'Steals', disabled: false },
    { id: 'blocks', name: 'Blocks', disabled: false },
    { id: 'turnovers', name: 'Turnovers', disabled: false },
  ];
  const premiumStatButtons = [
    {
      id: 'pr',
      name: 'PR (Points',
      name2: 'Rebounds)',
      disabled: false,
    },
    {
      id: 'pa',
      name: 'PA (Points',
      name2: 'Assists)',
      disabled: false,
    },
    {
      id: 'pra',
      name: 'PRA (Points',
      name2: 'Rebounds',
      name3: 'Assists)',
      disabled: false,
    },
    {
      id: 'ra',
      name: 'RA',
      name2: '(Rebounds',
      name3: 'Assists)',
      disabled: false,
    },
    {
      id: 'sb',
      name: 'SB (Steals',
      name2: 'Blocks)',
      disabled: false,
    },
  ];
  useEffect(() => {
    async function fetchPlayers() {
      const homeTeamSlug = slugify(game.homeTeam, { lower: true });
      const awayTeamSlug = slugify(game.awayTeam, { lower: true });
      const response = await fetch(
        `${API_ROUTES.players}?home_team=${homeTeamSlug}&away_team=${awayTeamSlug}`,
      );
      const data = await response.json();
      const [team_home, team_away] = data;
      setTeamHome(team_home);
      setTeamAway(team_away);
    }
    fetchPlayers();
  }, []);
  function handlePlayerClick(e) {
    selectedPlayer == e.target.id
      ? setSelectedPlayer(null)
      : setSelectedPlayer(e.target.id);
  }
  function handleStatClick(e) {
    selectedStat == e.target.id
      ? setSelectedStat(null)
      : setSelectedStat(e.target.id);
  }
  async function handleAnalyze() {
    if (user.username) {
      if (user.isVerified) {
        if (selectedPlayer && selectedStat && line && line !== 'Select...') {
          if (user.picksUsed >= user.picksPerDay) {
            alert(
              'You have used all your picks for the day. Please return tomorrow to analyze more picks or upgrade your plan.',
            );
            return;
          } else {
            if (
              user.plan.price == 0 &&
              premiumStatButtons.some(
                statButton => statButton.id === selectedStat,
              )
            ) {
              alert(
                'Premium stats (PR, PA, PRA, and RA) are only available to subscription-paying accounts. Please purchase a subscription to analyze these stats.',
              );
              return;
            }
            if (confirm(`Please confirm your selections to analyze`)) {
              setUser({ ...user, picksUsed: user.picksUsed + 1 });
              setLoadingAi(true);
              try {
                const url = `${API_ROUTES.analysis}?stat=${selectedStat}&player=${selectedPlayer}&line=${line}&game=${game._id}&home_team=${teamHome.slug_team_name}&away_team=${teamAway.slug_team_name}`;
                const response = await fetch(url, {
                  credentials: 'include',
                  withCredentials: true,
                });
                const data = await response.json();
                if (!data.success) {
                  setResponseFailed(true);
                  setUser(prevUser => ({
                    ...prevUser,
                    picksUsed: prevUser.picksUsed - 1,
                  }));
                }
                setUser(prevUser => ({
                  ...prevUser,
                  responses: [...prevUser.responses, data],
                }));
                setAnalysisData(data);
                setAnalysisComplete(true);
              } catch (error) {
                console.error('Fetch error:', error);
                setUser(prevUser => ({
                  ...prevUser,
                  picksUsed: prevUser.picksUsed - 1,
                }));
              }
            }
          }
        } else {
          alert('Please ensure you have selected a player, stat, and line.');
        }
      } else {
        toast.error('Please verify your email to analyze.');
      }
    } else {
      toast.error('Please log in to analyze.');
    }
  }
  return (
    <>
      {loadingAi && (
        <LoadingAiModal
          player={selectedPlayer}
          stat={selectedStat}
          line={line}
        />
      )}
      <div className="mt-8 md:mt-0 mx-auto max-w-screen-xl md:pb-12 px-4 items-center gap-12 flex-1">
        Choose one player, stat, and line to analyze:
      </div>
      <section className="mt-8 md:mt-0 mx-auto max-w-screen-xl pb-12 px-1 gap-1 md:gap-12 md:px-8 flex-1 flex select-none">
        <Table.Root variant="surface" size="2">
          <Table.Header>
            <Table.Row style={{ color: 'white' }}>
              <Table.ColumnHeaderCell style={colorsAway}>
                {game.awayTeam}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-white">
            {teamAway.players
              .sort((a, b) => a.full_name.localeCompare(b.full_name))
              .map((player, index) => {
                return (
                  <Table.Row
                    key={index}
                    to={`/game/${game._id}`}
                    state={{ game }}
                    className={`cursor-pointer hover:bg-gray-600 hover:brightness-100 ${
                      selectedPlayer &&
                      selectedPlayer !==
                        slugify(player.full_name, { lower: true }) &&
                      'brightness-90'
                    } ${
                      selectedPlayer ==
                      slugify(player.full_name, { lower: true })
                        ? `bg-gray-600 font-bold`
                        : ''
                    }`}
                    style={{ color: 'white' }}
                    onClick={e => handlePlayerClick(e)}
                  >
                    <Table.Cell
                      id={slugify(player.full_name, { lower: true })}
                      width={'260px'}
                    >
                      {player.full_name} ({player.position})
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
        <Table.Root variant="surface" size="2">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell style={colorsHome}>
                {game.homeTeam}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-white">
            {teamHome.players
              .sort((a, b) => a.full_name.localeCompare(b.full_name))
              .map((player, index) => {
                return (
                  <Table.Row
                    key={index}
                    to={`/game/${game._id}`}
                    state={{ game }}
                    className={`cursor-pointer hover:bg-gray-600 hover:brightness-100 ${
                      selectedPlayer &&
                      selectedPlayer !==
                        slugify(player.full_name, { lower: true }) &&
                      'brightness-90'
                    } ${
                      selectedPlayer ==
                      slugify(player.full_name, { lower: true })
                        ? `bg-gray-600 font-bold`
                        : ''
                    }`}
                    style={{ color: 'white' }}
                    onClick={e => handlePlayerClick(e)}
                  >
                    <Table.Cell
                      id={slugify(player.full_name, { lower: true })}
                      width={'260px'}
                    >
                      {player.full_name} ({player.position})
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table.Root>
        <div className="flex flex-col gap-5">
          <Table.Root variant="surface" size="2">
            <Table.Header>
              <Table.Row style={{ color: 'white' }}>
                <Table.ColumnHeaderCell>Stat</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body className="text-white">
              {statButtons.map((stat, index) => {
                return (
                  <Table.Row
                    key={index}
                    className={`${
                      selectedStat == stat.id ? `bg-gray-600 font-bold` : ''
                    }`}
                  >
                    {stat.disabled ? (
                      <Tooltip content="Coming soon">
                        <Table.Cell className="text-red-300">
                          {stat.name}{' '}
                          {stat.name2 && (
                            <>
                              <br className="hidden md:block" /> {stat.name2}
                            </>
                          )}
                          {stat.name3 && (
                            <>
                              <br className="hidden md:block" /> {stat.name3}
                            </>
                          )}
                        </Table.Cell>
                      </Tooltip>
                    ) : (
                      <Table.Cell
                        id={stat.id}
                        key={index}
                        className={`hover:bg-gray-600 cursor-pointer`}
                        onClick={e => {
                          handleStatClick(e);
                        }}
                      >
                        {stat.name}{' '}
                        {stat.name2 && (
                          <>
                            <br className="hidden md:block" /> {stat.name2}
                          </>
                        )}
                        {stat.name3 && (
                          <>
                            <br className="hidden md:block" /> {stat.name3}
                          </>
                        )}
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
          <Table.Root variant="surface" size="2">
            <Table.Header>
              <Table.Row style={{ color: 'white' }}>
                <Table.ColumnHeaderCell>
                  Premium Stat <br className="hidden md:block" />
                  (Paid Only)
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body className="text-white">
              {premiumStatButtons.map((stat, index) => {
                return (
                  <Table.Row
                    key={index}
                    className={`${
                      selectedStat == stat.id ? `bg-gray-600 font-bold` : ''
                    }`}
                  >
                    {stat.disabled ? (
                      <Tooltip content="Coming soon">
                        <Table.Cell className="text-red-300">
                          {stat.name}{' '}
                          {stat.name2 && (
                            <>
                              <br className="hidden md:block" /> {stat.name2}
                            </>
                          )}
                          {stat.name3 && (
                            <>
                              <br className="hidden md:block" /> {stat.name3}
                            </>
                          )}
                        </Table.Cell>
                      </Tooltip>
                    ) : (
                      <Table.Cell
                        id={stat.id}
                        key={index}
                        className={`hover:bg-gray-600 cursor-pointer`}
                        onClick={e => {
                          handleStatClick(e);
                        }}
                      >
                        {stat.name}{' '}
                        {stat.name2 && (
                          <>
                            <br className="hidden md:block" /> {stat.name2}
                          </>
                        )}
                        {stat.name3 && (
                          <>
                            <br className="hidden md:block" /> {stat.name3}
                          </>
                        )}
                      </Table.Cell>
                    )}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </div>
        <Table.Root
          className="w-[70px] max-h-[780px] md:max-h-[700px]"
          variant="surface"
          size="2"
        >
          <Table.Header>
            <Table.Row style={{ color: 'white' }}>
              <Table.ColumnHeaderCell>Line</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-white">
            {numbers.map(number => (
              <Table.Row
                onClick={() => setLine(number)}
                className={`cursor-pointer hover:bg-gray-600 ${
                  line == number ? `bg-gray-600 font-bold` : ''
                }`}
                key={number}
              >
                <Table.Cell>{number}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </section>
      {!user.username ? (
        <div className="font-inter_bold italic text-red-500 text-sm rounded-lg mx-auto max-w-screen-xl w-full text-center">
          Please log in to analyze your pick.
        </div>
      ) : !user.isVerified ? (
        <div className="font-inter_bold italic text-red-500 text-sm rounded-lg mx-auto max-w-screen-xl w-full text-center">
          Please verify your email to analyze a pick. Check your email from
          account registration.
        </div>
      ) : null}
      {/* <div className="font-inter_bold italic text-red-500 text-sm rounded-lg mx-auto max-w-screen-xl w-full text-center">
        Analysis is paused at the moment due to an update, will be resumed
        shortly. Thank you for your patience.
      </div> */}
      <div className="mx-auto max-w-screen-xl pb-12 px-4 gap-1 md:px-8 flex flex-col">
        <button
          id="analyze"
          // disabled
          onClick={() => handleAnalyze()}
          className={`font-saira_bold shadow-sm shadow-gray-700 hover:bg-gray-700 text-2xl px-5 py-3 rounded-lg mt-6 ${
            loadingAi ? 'bg-gray-400 shadow-gray-500' : 'bg-gray-800'
          } ${!user.username && 'shadow-none'}`}
        >
          ANALYZE
        </button>
      </div>
    </>
  );
}
