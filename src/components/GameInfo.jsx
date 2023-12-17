import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from './sub-components/LoadingAiModal';
import slugify from 'slugify';
import useResponse from '../context/useResponse';
import toast from 'react-hot-toast';

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
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${teamAway.primary_color_hex}, #D7D7D7, ${teamHome.primary_color_hex})`,
    filter: 'saturate(0.6)',
  };
  const statButtons = [
    { id: 'points', name: 'POINTS', disabled: false },
    { id: 'rebounds', name: 'REBOUNDS', disabled: false },
    { id: 'assists', name: 'ASSISTS', disabled: false },
    { id: '3pm', name: '3 POINT FG', disabled: true },
    { id: 'steals', name: 'STEALS', disabled: true },
    { id: 'blocks', name: 'BLOCKS', disabled: true },
    { id: 'turnovers', name: 'TURNOVERS', disabled: true },
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
  const options = [];
  for (let i = 0.5; i <= 50; i += 0.5) {
    options.push({ value: i, label: i.toString() });
  }
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
      if (selectedPlayer && selectedStat && line && line !== 'Select...') {
        if (user.picksUsed >= user.picksPerDay) {
          alert(
            'You have used all your picks for the day. Please return tomorrow to analyze more picks or upgrade your plan.',
          );
          return;
        } else {
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
      <div className="" style={gradientStyle}>
        <div
          className={`game-area lg:mx-16 flex h-[800px] md:h-[700px] shadow-sm shadow-gray-300 rounded-lg p-5`}
        >
          <div className="AWAY flex-1 flex flex-col items-start gap-4 md:gap-20 border-r-2 border-black border-dotted">
            <div
              className="font-saira_bold text-4xl tracking-wide w-full text-center p-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              style={{ color: teamAway.secondary_color_hex }}
            >
              {game.awayTeam}
            </div>
            <div className="players flex flex-col gap-3 md:gap-8 flex-wrap md:h-4/5 items-center justify-center w-full">
              {teamAway.players
                .sort((a, b) => a.full_name.localeCompare(b.full_name))
                .map((player, index) => {
                  return (
                    <div key={index} className="md:w-1/3 flex flex-col">
                      <button
                        id={slugify(player.full_name, { lower: true })}
                        onClick={e => handlePlayerClick(e)}
                        className={`font-saira_bold w-[155px] md:w-auto text-lg md:py-1 px-3 rounded-lg shadow-sm shadow-gray-700 saturate-200 hover:bg-[${
                          teamAway.secondary_color_hex
                        }] hover:text-white text-center ${
                          selectedPlayer ==
                          slugify(player.full_name, { lower: true })
                            ? `bg-[${teamAway.secondary_color_hex}] saturate-200 text-white  shadow-gray-500`
                            : `bg-gray-100`
                        }`}
                      >
                        {player.full_name}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="HOME flex-1 flex flex-col items-start gap-4 md:gap-20">
            <div
              className="font-saira_bold text-4xl tracking-wide w-full text-center p-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              style={{ color: teamHome.secondary_color_hex }}
            >
              {game.homeTeam}
            </div>
            <div className="players flex flex-col gap-3 md:gap-8 flex-wrap md:h-4/5 justify-center items-center w-full">
              {teamHome.players
                .sort((a, b) => a.full_name.localeCompare(b.full_name))
                .map((player, index) => {
                  return (
                    <div key={index} className="md:w-1/3 flex flex-col">
                      <button
                        id={slugify(player.full_name, { lower: true })}
                        onClick={e => handlePlayerClick(e)}
                        className={`w-[155px] md:w-auto font-saira_bold text-lg md:py-1 px-3 shadow-sm shadow-gray-700 rounded-lg saturate-200 hover:bg-[${
                          teamHome.secondary_color_hex
                        }] hover:text-white text-center ${
                          selectedPlayer ==
                          slugify(player.full_name, { lower: true })
                            ? `saturate-200 bg-[${teamHome.secondary_color_hex}] text-white shadow-gray-500`
                            : `bg-gray-100`
                        }`}
                      >
                        {player.full_name}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="font-saira_bold text-3xl py-2 md:py-12 w-full text-center">
          Stats
        </div>
        <div className="STATS flex flex-wrap gap-5 justify-center">
          {statButtons.map((stat, index) => {
            return stat.disabled ? (
              <button
                key={index}
                id={stat.id}
                className="font-saira_bold md:text-2xl px-3 py-1 rounded-lg cursor-default"
              >
                {stat.name}
              </button>
            ) : (
              <button
                key={index}
                className={`font-saira_bold md:text-2xl px-3 py-1 rounded-lg hover:bg-black hover:text-white shadow-sm shadow-gray-700 ${
                  selectedStat == stat.id
                    ? 'bg-black text-white shadow-gray-500'
                    : `bg-gray-100`
                }`}
                onClick={e => {
                  handleStatClick(e);
                }}
                id={stat.id}
              >
                {stat.name}
              </button>
            );
          })}
        </div>
        <div className="ANALYZE w-full flex justify-center my-4 md:my-12 flex-col gap-2 md:gap-8 items-center">
          <div className="flex flex-col gap-2 items-center">
            <label className="font-saira_bold text-3xl mb-6">Line</label>
            <div className="custom-select flex justify-center">
              <select
                name="line"
                id="line"
                value={line}
                onChange={e => setLine(e.target.value)}
                className="w-[100px] font-inter_bold text-base"
              >
                <option defaultValue>Select...</option>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            id="analyze"
            onClick={() => handleAnalyze()}
            className={`font-saira_bold shadow-sm shadow-gray-700 text-2xl px-5 py-3 rounded-lg mt-6 hover:bg-gray-400 ${
              loadingAi ? 'bg-gray-400 shadow-gray-500' : 'bg-gray-100'
            } ${!user.username && 'shadow-none'}`}
          >
            ANALYZE
          </button>
          {!user.username && (
            <div className="font-inter_bold italic text-red-500 text-sm rounded-lg">
              Please log in to analyze your pick.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
