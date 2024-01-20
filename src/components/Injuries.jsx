import { useEffect, useState, useRef } from 'react';
import { Button, Dialog, Table } from '@radix-ui/themes';

export default function Injuries({ game, teamAway, teamHome }) {
  const tooltipContentRef = useRef(null);
  const buttonRef = useRef(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
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
  return (
    <>
      <Dialog.Root onOpenChange={() => {}} open={tooltipOpen}>
        <Dialog.Trigger>
          <div className="w-full flex justify-center text-center font-bold text-lg my-0 items-center">
            <Button
              ref={buttonRef}
              onClick={handleButtonClick}
              style={isMobile ? { padding: '20px 10px' } : { padding: '20px' }}
              className={` py-2 px-2 md:px-4 cursor-pointer rounded-md p-6 ${
                tooltipOpen ? 'bg-gray-900' : 'null'
              }`}
            >
              <div className="flex flex-col">
                <div>Team Injuries</div>
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
              Team Injuries
            </div>
          </Dialog.Title>
          {
            <>
              <div className="flex flex-col mx-auto max-w-screen-xl gap-12 mb-5 mt-6">
                <div className="flex flex-col">
                  {game.awayTeam && (
                    <div
                      className="w-full text-center font-bold rounded-sm"
                      style={{
                        backgroundColor: teamAway.primary_color_hex,
                        color: teamAway.secondary_color_hex,
                      }}
                    >
                      {game.awayTeam}
                    </div>
                  )}
                  {teamAway.injuries && (
                    <Table.Root variant="surface" size="1">
                      <Table.Header>
                        <Table.Row style={{ color: 'white' }}>
                          {/* style={{ fontSize: isMobile && '12px' }} */}
                          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Player
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Reason
                          </Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body className="text-white">
                        {teamAway.injuries.length > 0 ? (
                          teamAway.injuries.map((player, index) => {
                            return (
                              <>
                                <Table.Row
                                  key={index}
                                  style={{ color: 'white' }}
                                >
                                  <Table.Cell className="w-[60px]">
                                    {player.injuries[0].update_date.slice(5) ||
                                      player.injuries[0].start_date}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap w-[175px]">
                                    {player.full_name}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {player.injuries[0].comment}
                                  </Table.Cell>
                                </Table.Row>
                              </>
                            );
                          })
                        ) : (
                          <Table.Row>
                            <Table.Cell>N/A</Table.Cell>
                            <Table.Cell>No Current Injuries</Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table.Root>
                  )}
                </div>
                <div className="flex flex-col">
                  {game.homeTeam && (
                    <div
                      className="w-full text-center font-bold rounded-sm"
                      style={{
                        backgroundColor: teamHome.primary_color_hex,
                        color: teamHome.secondary_color_hex,
                      }}
                    >
                      {game.homeTeam}
                    </div>
                  )}
                  {teamHome.injuries && (
                    <Table.Root variant="surface" size="1">
                      <Table.Header>
                        <Table.Row style={{ color: 'white' }}>
                          {/* style={{ fontSize: isMobile && '12px' }} */}
                          <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Player
                          </Table.ColumnHeaderCell>
                          <Table.ColumnHeaderCell>
                            Reason
                          </Table.ColumnHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body className="text-white">
                        {teamHome.injuries.length > 0 ? (
                          teamHome.injuries.map((player, index) => {
                            return (
                              <>
                                <Table.Row
                                  key={index}
                                  style={{ color: 'white' }}
                                >
                                  <Table.Cell className="w-[60px]">
                                    {player.injuries[0].update_date.slice(5) ||
                                      player.injuries[0].start_date}
                                  </Table.Cell>
                                  <Table.Cell className="whitespace-nowrap w-[175px]">
                                    {player.full_name}
                                  </Table.Cell>
                                  <Table.Cell>
                                    {player.injuries[0].comment}
                                  </Table.Cell>
                                </Table.Row>
                              </>
                            );
                          })
                        ) : (
                          <Table.Row>
                            <Table.Cell>N/A</Table.Cell>
                            <Table.Cell>No Current Injuries</Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table.Root>
                  )}
                </div>
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
