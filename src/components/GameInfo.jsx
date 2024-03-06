import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from './sub-components/LoadingAiModal';
import slugify from 'slugify';
import useResponse from '../context/useResponse';
import toast from 'react-hot-toast';
import { Button, Table, Tooltip } from '@radix-ui/themes';
import Weaknesses from './Weaknesses';
import Strengths from './Strengths';
import Injuries from './Injuries';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function GameInfo({ game }) {
  const {
    loadingAi,
    setLoadingAi,
    setIsDuplicate,
    user,
    setUser,
    setAnalysisData,
    setAnalysisComplete,
    setResponseFailed,
    isMobile,
  } = useResponse();
  const [teamHome, setTeamHome] = useState({ players: [] });
  const [teamAway, setTeamAway] = useState({ players: [] });
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedStat, setSelectedStat] = useState();
  const [toDisable, setToDisable] = useState([]);
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
    if (selectedPlayer == e.target.id) {
      setSelectedTeam(null);
      setSelectedPlayer(null);
    } else {
      let awaySelected = false;
      for (const each of teamAway.players) {
        if (e.target.id == slugify(each.full_name, { lower: true })) {
          setSelectedTeam('away');
          awaySelected = true;
          break;
        }
      }
      if (!awaySelected) setSelectedTeam('home');
      setSelectedPlayer(e.target.id);
    }
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
              setToDisable(prevDisable => [
                ...prevDisable,
                { player: selectedPlayer, stat: selectedStat, line: line },
              ]);
              setUser({ ...user, picksUsed: user.picksUsed + 1 });
              setLoadingAi(true);
              try {
                const url = `${API_ROUTES.analysis}?stat=${selectedStat}&player=${selectedPlayer}&line=${line}&game=${game._id}&home_team=${teamHome.slug_team_name}&away_team=${teamAway.slug_team_name}`;
                const response = await fetch(url, {
                  credentials: 'include',
                  withCredentials: true,
                });
                const data = await response.json();
                console.log(data);
                if (data.currentlyProcessing) {
                  setLoadingAi(false);
                  setIsDuplicate(true);
                  setResponseFailed(true);
                  setUser(prevUser => ({
                    ...prevUser,
                    picksUsed: prevUser.picksUsed - 1,
                  }));
                } else if (!data.success && !data.currentlyProcessing) {
                  setResponseFailed(true);
                  setToDisable(prevDisable =>
                    prevDisable.filter(
                      entry =>
                        !(
                          entry.player === selectedPlayer &&
                          entry.stat === selectedStat &&
                          entry.line === line
                        ),
                    ),
                  );
                  setUser(prevUser => ({
                    ...prevUser,
                    picksUsed: prevUser.picksUsed - 1,
                  }));
                } else if (data.alreadyHas) {
                  setUser(prevUser => ({
                    ...prevUser,
                    picksUsed: prevUser.picksUsed - 1,
                  }));
                } else {
                  setUser(prevUser => ({
                    ...prevUser,
                    responses: [...prevUser.responses, data],
                  }));
                }
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
      <div className="mx-auto max-w-screen-xl flex flex-col md:flex-row gap-12">
        <Table.Root
          variant="surface"
          size={isMobile ? '1' : '2'}
          style={!isMobile ? { minWidth: 400 } : { maxWidth: 250 }}
        >
          <Table.Header>
            <Table.Row style={{ color: 'white' }}>
              <Table.ColumnHeaderCell style={isMobile && { fontSize: 12 }}>
                ML
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={isMobile && { fontSize: 12 }}>
                Spread
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={isMobile && { fontSize: 12 }}>
                Over/Under
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="text-white">
            <Table.Row>
              <Table.Cell style={isMobile && { fontSize: 12 }}>
                {game.awayTeamWinOdds > 0
                  ? `+${game.awayTeamWinOdds}`
                  : game.awayTeamWinOdds}{' '}
                /{' '}
                {game.homeTeamWinOdds > 0
                  ? `+${game.homeTeamWinOdds}`
                  : game.homeTeamWinOdds}
              </Table.Cell>
              <Table.Cell style={isMobile && { fontSize: 12 }}>
                +/- {Math.abs(game.teamSpread)}
              </Table.Cell>
              <Table.Cell style={isMobile && { fontSize: 12 }}>
                {game.overUnder.toFixed(1)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
      <div className="mx-auto max-w-screen-xl w-full text-center italic mt-3">
        View matchups / potential picks:
      </div>
      <div className="mx-auto max-w-screen-xl flex md:flex-row gap-6 md:gap-12 justify-center">
        <Strengths game={game} teamHome={teamHome} teamAway={teamAway} />
        <div className="hidden md:flex items-center">
          <Injuries game={game} teamHome={teamHome} teamAway={teamAway} />
        </div>
        <Weaknesses game={game} teamHome={teamHome} teamAway={teamAway} />
      </div>
      <div className="injuries mx-auto max-w-screen-xl md:hidden">
        <Injuries game={game} teamHome={teamHome} teamAway={teamAway} />
      </div>
      {game.awayBackToBack && (
        <div className="mx-auto max-w-screen-xl w-full text-center mt-3 text-red-200">
          {game.awayTeam} are on the second leg of a back-to-back. They played
          yesterday.
        </div>
      )}
      {game.homeBackToBack && (
        <div className="mx-auto max-w-screen-xl w-full text-center mt-3 text-red-200">
          {game.homeTeam} are on the second leg of a back-to-back. They played
          yesterday.
        </div>
      )}
      <div className="mt-8 md:mt-10 mx-auto max-w-screen-xl w-full text-center italic font-bold">
        To Analyze a Prop:
      </div>
      <div className="mt-5 md:mx-auto md:max-w-screen-xl pb-3 px-1 gap-4 md:gap-6 lg:gap-10 flex-1 flex lg:px-12 select-none justify-center">
        <div className="ml-6 md:ml-0 lg:ml-6 text-sm md:text-base text-center italic w-[228px] md:w-[568px]">
          <div>Select one player from either team</div>
          <div className="flex gap-24 md:gap-72 justify-center">
            {!selectedPlayer ? (
              <>
                <ArrowCircleDownIcon />
                <ArrowCircleDownIcon />
              </>
            ) : selectedTeam == 'away' ? (
              <>
                <ArrowCircleLeftIcon className="rotate-[-90deg]" />
                <ArrowCircleDownIcon className="brightness-50" />
              </>
            ) : (
              <>
                <ArrowCircleDownIcon className="brightness-50" />
                <ArrowCircleLeftIcon className="rotate-[-90deg]" />
              </>
            )}
          </div>
        </div>
        {/* <div className="w-[75px]"></div> */}
        <div className="italic text-sm md:text-base pl-6 md:pl-8 lg:pl-2 lg:text-left text-center md:whitespace-nowrap">
          <div>
            Select <span className="hidden md:inline-block">one</span> stat
          </div>
          <div className="flex justify-center">
            {selectedStat ? (
              <ArrowCircleLeftIcon className="rotate-[-90deg]" />
            ) : (
              <ArrowCircleDownIcon />
            )}
          </div>
        </div>
        <div className="italic text-sm md:text-base lg:text-left text-center md:whitespace-nowrap md:pl-4 lg:pl-0">
          <div>
            Select <span className="hidden md:inline-block">one</span> line
          </div>
          <div className="lg:pl-0 flex justify-center">
            {line ? (
              <ArrowCircleLeftIcon className="rotate-[-90deg]" />
            ) : (
              <ArrowCircleDownIcon />
            )}
          </div>
        </div>
      </div>
      <section className="md:mt-0 md:mx-auto md:max-w-screen-xl pb-12 px-1 gap-1 md:gap-12 md:px-8 flex-1 flex select-none">
        <Table.Root variant="surface" size={isMobile ? '1' : '2'}>
          <Table.Header>
            <Table.Row style={{ color: 'white' }}>
              <Table.ColumnHeaderCell style={colorsAway}>
                {isMobile ? (
                  game.awayTeam
                ) : (
                  <span className="!text-base">{game.awayTeam}</span>
                )}
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
        <Table.Root variant="surface" size={isMobile ? '1' : '2'}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell style={colorsHome}>
                {isMobile ? (
                  game.homeTeam
                ) : (
                  <span className="!text-base">{game.homeTeam}</span>
                )}
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
          <Table.Root variant="surface" size={isMobile ? '1' : '2'}>
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
          <Table.Root variant="surface" size={isMobile ? '1' : '2'}>
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
          size={isMobile ? '1' : '2'}
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
        <div className="font-inter_bold italic text-red-500 text-sm rounded-lg mx-auto max-w-screen-xl w-full text-center mb-3">
          Please log in to analyze your pick.
        </div>
      ) : !user.isVerified ? (
        <div className="font-inter_bold italic text-red-500 text-sm rounded-lg mx-auto max-w-screen-xl w-full text-center mb-3">
          Please verify your email to analyze a pick. Check your email from
          account registration.
        </div>
      ) : null}
      {/* <div className="mt-5 font-inter_bold italic text-red-500 text-lg rounded-lg mx-auto max-w-screen-xl w-full text-center">
        Analysis is paused at the moment due to maintenence, will be resumed
        soon. Thank you for your patience.
      </div> */}
      <div className="my-5 italic rounded-lg mx-auto max-w-screen-xl w-full text-center">
        Then analyze...
      </div>
      <div className="mx-auto max-w-screen-xl pb-6 px-4 gap-1 md:px-8 flex flex-col">
        <Button
          id="analyze"
          onClick={() => handleAnalyze()}
          disabled={toDisable.some(
            entry =>
              line == entry.line &&
              selectedStat == entry.stat &&
              selectedPlayer == entry.player,
          )}
          className={`!bg-indigo-700 hover:!bg-indigo-600 !p-6 !cursor-pointer !shadow-sm !shadow-gray-700 !font-bold mt-6 ${
            loadingAi ? 'bg-gray-400 shadow-gray-500' : 'bg-gray-800'
          } ${!user.username && 'shadow-none'} ${
            toDisable.some(
              entry =>
                line == entry.line &&
                selectedStat == entry.stat &&
                selectedPlayer == entry.player,
            ) && '!bg-gray-700 hover:!bg-gray-700 !cursor-default'
          }`}
        >
          Analyze
        </Button>
      </div>
      <div className="mx-auto max-w-screen-xl font-bold italic text-sm">
        {toDisable.some(
          entry =>
            line == entry.line &&
            selectedStat == entry.stat &&
            selectedPlayer == entry.player,
        ) && 'Selection currently processing or already processed'}
      </div>
    </>
  );
}
