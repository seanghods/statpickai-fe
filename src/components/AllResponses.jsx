import useResponse from '../context/useResponse';
import { Table } from '@radix-ui/themes';
import { LoadingIcon } from './sub-components/Icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../utils/helpers';
import { useState, useEffect } from 'react';
import LogInButton from './sub-components/LogInButton';
import { API_ROUTES } from '../utils/constants';
import { getNBALogos } from './sub-components/NBALogos';
import silhouette from '../assets/silhouette.png';

export default function AllResponses() {
  const { user } = useResponse();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [headshots, setHeadshots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getHeadshots() {
      try {
        const response = await fetch(API_ROUTES.getHeadshots, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();
        setHeadshots(data);
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
    }
    getHeadshots();
  }, []);
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setLoading(true);
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
      setLoading(false);
    }
    checkAuthenticationStatus();
  }, []);
  return (
    <div className="flex-1 flex w-full flex-col items-center text-center ">
      {user.username ? (
        <div className="flex flex-col text-base gap-4 w-full px-2 md:px-0 md:w-4/5">
          {loading ? (
            <div className="flex justify-center w-full">
              <LoadingIcon />
            </div>
          ) : loggedIn && user.responses.length == 0 ? (
            <div>
              All your past analysis is listed here. Choose a player and line to
              analyze in{' '}
              <NavLink className="text-blue-700 font-bold" to="/games">
                Today&apos;s Games
              </NavLink>{' '}
              to start your list!
            </div>
          ) : (
            <>
              <Table.Root variant="surface" size="2">
                <Table.Header>
                  <Table.Row style={{ color: 'white' }}>
                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:block">
                      Team
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Stat</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Line</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Opponent
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body className="text-white">
                  {user.responses &&
                    user.responses
                      .sort((a, b) => {
                        if (a.createdAt < b.createdAt) {
                          return 1;
                        }
                        if (a.createdAt > b.createdAt) {
                          return -1;
                        }
                        return 0;
                      })
                      .map((response, index) => {
                        return (
                          <Table.Row
                            onClick={() =>
                              navigate(
                                `/response/${response.dateOfGame}-${response._id}`,
                                {
                                  state: { response },
                                },
                              )
                            }
                            key={index}
                            className="hover:bg-gray-700 cursor-pointer"
                          >
                            <Table.Cell className="w-[80px]">
                              <div className="flex items-center h-full">
                                {response.dateOfGame.slice(5)}
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex gap-3 items-center">
                                {headshots.length > 0 ? (
                                  <img
                                    className="w-8 h-8 bg-[#c0c5cf12] rounded-sm"
                                    src={
                                      headshots.find(
                                        player =>
                                          player.full_name === response.player,
                                      )?.headshotUrl ?? silhouette
                                    }
                                    alt="headshot pic"
                                  />
                                ) : null}{' '}
                                {response.player}
                              </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                              <div className="flex gap-3 items-center h-full">
                                {getNBALogos(
                                  response.playerTeam.split(' ').slice(-1)[0],
                                  6,
                                  6,
                                )}
                                {response.playerTeam}
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              <div className="flex items-center h-full">
                                {response.stat.length < 4
                                  ? response.stat.toUpperCase()
                                  : capitalize(response.stat)}
                              </div>
                            </Table.Cell>
                            <Table.Cell>
                              {' '}
                              <div className="flex items-center h-full">
                                {response.line}
                              </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell flex-1">
                              <div className="flex gap-3 items-center h-full">
                                {getNBALogos(
                                  response.opponentTeam.split(' ').slice(-1)[0],
                                  6,
                                  6,
                                )}
                                {response.opponentTeam}
                              </div>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                </Table.Body>
              </Table.Root>
            </>
          )}
        </div>
      ) : (
        <div className="w-1/3">
          <div className="">
            Please log in to view your account&apos;s responses.
          </div>
          <LogInButton />
        </div>
      )}
    </div>
  );
}
