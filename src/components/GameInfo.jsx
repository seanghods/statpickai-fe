import { useEffect, useState } from 'react';
import { API_ROUTES } from '../utils/constants';
import LoadingAiModal from './sub-components/LoadingAiModal';
import slugify from 'slugify';
import useResponse from '../context/useResponse';

export default function GameInfo({ game }) {
  const {
    loadingAi,
    setLoadingAi,
    setAnalysisData,
    setAnalysisComplete,
    setResponseFailed,
  } = useResponse();
  const [teamHome, setTeamHome] = useState({ players: [] });
  const [teamAway, setTeamAway] = useState({ players: [] });
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [selectedStat, setSelectedStat] = useState();
  const [line, setLine] = useState();
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
    if (selectedPlayer && selectedStat && line && line !== 'Select...') {
      if (confirm(`Please confirm your selections to analyze`)) {
        setLoadingAi(true);
        const response = await fetch(
          `${API_ROUTES.base}/${selectedStat}?player=${selectedPlayer}&line=${line}&game=${game._id}&home_team=${teamHome.slug_team_name}&away_team=${teamAway.slug_team_name}`,
        );
        const data = await response.json();
        if (!data.success) {
          setResponseFailed(true);
        }
        setAnalysisData(data);
        setAnalysisComplete(true);
      }
    } else {
      alert('Please ensure you have selected a player, stat, and line.');
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
      <div className="game-area mx-16 flex h-[800px]">
        <div className="AWAY flex-1 flex flex-col items-start gap-20 border-r-2 border-black border-dotted">
          <div className="font-saira_bold text-2xl tracking-wide w-full text-center">
            {game.awayTeam}
          </div>
          <div className="players flex flex-col gap-8 flex-wrap h-4/5 items-center justify-center w-full">
            {teamAway.players
              .sort((a, b) => a.full_name.localeCompare(b.full_name))
              .map((player, index) => {
                return (
                  <div key={index} className="w-1/3 flex flex-col">
                    <button
                      id={slugify(player.full_name, { lower: true })}
                      onClick={e => handlePlayerClick(e)}
                      className={`font-saira_bold text-lg py-1 px-3 rounded-lg shadow-sm shadow-gray-700 hover:bg-gray-300 text-center ${
                        selectedPlayer ==
                        slugify(player.full_name, { lower: true })
                          ? 'bg-gray-300 shadow-gray-500'
                          : `bg-white`
                      }`}
                    >
                      {player.full_name}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="HOME flex-1 flex flex-col items-start gap-20">
          <div className="font-saira_bold text-2xl tracking-wide w-full text-center">
            {game.homeTeam}
          </div>
          <div className="players flex flex-col gap-8 flex-wrap h-4/5 justify-center items-center w-full">
            {teamHome.players
              .sort((a, b) => a.full_name.localeCompare(b.full_name))
              .map((player, index) => {
                return (
                  <div key={index} className="w-1/3 flex flex-col">
                    <button
                      id={slugify(player.full_name, { lower: true })}
                      onClick={e => handlePlayerClick(e)}
                      className={`font-saira_bold text-lg py-1 px-3 shadow-sm shadow-gray-700 rounded-lg hover:bg-gray-300 text-center ${
                        selectedPlayer ==
                        slugify(player.full_name, { lower: true })
                          ? 'bg-gray-300 shadow-gray-500'
                          : `bg-white`
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
      <div className="font-saira_bold text-3xl mt-12 w-full text-center mb-12">
        Stats
      </div>
      <div className="STATS flex gap-5 justify-center">
        {statButtons.map((stat, index) => {
          return stat.disabled ? (
            <button
              key={index}
              id={stat.id}
              className="font-saira_bold text-2xl px-3 py-1 rounded-lg cursor-default"
            >
              {stat.name}
            </button>
          ) : (
            <button
              key={index}
              className={`font-saira_bold text-2xl px-3 py-1 rounded-lg hover:bg-gray-300  shadow-sm shadow-gray-700 ${
                selectedStat == stat.id
                  ? 'bg-gray-300 shadow-gray-500'
                  : `bg-white`
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
      <div className="ANALYZE w-full flex justify-center mt-12 mb-12 flex-col gap-8 items-center">
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
          onClick={handleAnalyze}
          className={`font-saira_bold shadow-sm shadow-gray-700 text-2xl px-5 py-3 rounded-lg mt-6 hover:bg-gray-300 ${
            loadingAi ? 'bg-gray-300 shadow-gray-500' : 'bg-white'
          }`}
        >
          ANALYZE
        </button>
      </div>
    </>
  );
}
