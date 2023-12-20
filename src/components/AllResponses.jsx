import useResponse from '../context/useResponse';
import { Table, Button } from '@radix-ui/themes';
import { LoadingIcon } from './sub-components/Icons';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { capitalize } from '../utils/helpers';
import { useState, useEffect, API_ROUTES } from 'react';
import LogInButton from './sub-components/LogInButton';

export default function AllResponses() {
  const { user } = useResponse();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
                    <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Stat</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Line</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Opponent
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body className="text-white">
                  {user.responses
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
                          <Table.Cell>
                            {response.dateOfGame.slice(5)}
                          </Table.Cell>
                          <Table.Cell>{response.player}</Table.Cell>
                          <Table.Cell className="md:hidden">
                            {response.playerTeam.split(' ').pop()}
                          </Table.Cell>
                          <Table.Cell className="hidden md:block">
                            {response.playerTeam}
                          </Table.Cell>
                          <Table.Cell>{capitalize(response.stat)}</Table.Cell>
                          <Table.Cell>{response.line}</Table.Cell>
                          <Table.Cell className="hidden md:block flex-1">
                            {response.opponentTeam}
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
