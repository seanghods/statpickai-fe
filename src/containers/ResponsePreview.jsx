import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components';
import { ScrollToTop } from '../utils/helpers';
import { backgroundGradient } from '../utils/helperComponents';
import { Button, Table } from '@radix-ui/themes';
import logo from '../assets/logotransp.png';
import { useEffect } from 'react';
import { getNBALogos } from '../components/sub-components/NBALogos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Preview() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Analysis Preview';
  }, []);
  const statsColumnOne = [
    ['Position', 'SF'],
    ['Season Average', 7.08],
    ['Last 5 Average', 9.2],
    ['Last 10 Average', 7.9],
    ['Average vs Opponent', 10.67],
    ['Games Vs Opp Past 3 Seasons', 3],
    ['Last 5 Potential Assists', 14],
  ];
  const statsColumnTwo = [
    ['L10 Pace', 101.95],
    ['L10 Pace Ranking', 6],
    ['L10 Assist Percent', 63.5],
    ['L10 Assist Percent Rank', 26],
    ['L10 Assist Ratio (Per 100 Poss)', 19.1],
    ['L10 Assist Ratio Rank', 23],
    ['Over/Under', 227],
    ['Home / Away', 'Home'],
  ];
  const statsColumnThree = [
    ['L10 Pace', 99.3],
    ['L10 Pace Ranking', 20],
    ['SZN Effective FG Defense %', 54.5],
    ['SZN Effective FG Defense % Ranking', 17],
    ['L10 Turnover %', 13.1],
    ['L10 Turnover % Rank', 11],
    [`L15 Assists Allowed to SF`, 4.36],
    [`L15 Assists Allowed to SF Ranking`, 24],
  ];
  const stats = [statsColumnOne, statsColumnTwo, statsColumnThree];
  return (
    <>
      <ScrollToTop />
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col bg-image">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-10 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`ticker-three font-bold text-2xl md:text-3xl md:mb-10 text-center brightness-125`}
              >
                <div>
                  Lebron James <br className="md:hidden" />
                  +/- 7.5 Assists
                </div>
              </h1>
            </div>
            <div className="flex-1 w-full h-full shadow-lg shadow-gray-700 text-gray-300">
              <div className="w-full flex justify-center my-5">
                <img src={logo} alt="pic of logo" className="w-12 h-12" />
              </div>
              <div className="flex-1 md:mx-10 flex md:text-lg rounded-lg flex-col justify-center items-center gap-4">
                <div className="border-2 border-gray-700">
                  <div className="flex flex-col md:grid grid-cols-3 gap-2 p-3 rounded-lg border-gray-700">
                    {stats.map((column, index) => {
                      return (
                        <div key={index} className="flex flex-col gap-3">
                          <div className="w-full text-center"></div>
                          <Table.Root variant="surface" size="1">
                            <Table.Header>
                              <Table.Row style={{ color: 'white' }}>
                                {/* style={{ fontSize: isMobile && '12px' }} */}
                                <Table.ColumnHeaderCell>
                                  {index == '0' ? (
                                    <strong className="ticker-three brightness-125 text-lg md:text-xl flex items-center gap-2">
                                      <img
                                        src="https://s3-us-west-2.amazonaws.com/static.fantasydata.com/usa-today/headshots/nba/lebron-james-20000571-1a4668f2.png"
                                        className="w-7 h-7"
                                        alt="LeBron James Headshot"
                                      />
                                      LeBron James
                                    </strong>
                                  ) : index == '1' ? (
                                    <strong className="ticker-one brightness-125 text-lg md:text-xl flex items-center gap-2">
                                      {getNBALogos('Lakers', 8, 5)} Los Angeles
                                      Lakers
                                    </strong>
                                  ) : (
                                    <strong className="ticker-two brightness-125 text-lg md:text-xl flex items-center gap-2">
                                      {getNBALogos('Knicks', 8, 5)} New York
                                      Knicks
                                    </strong>
                                  )}
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                  <div
                                    className={`flex w-full h-full items-center justify-end pr-3 ${
                                      index == 0 ? 'justify-end pr-5' : ''
                                    }`}
                                  >
                                    Stat
                                  </div>
                                </Table.ColumnHeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body className="text-white">
                              {column.map((stat, index) => {
                                return (
                                  <Table.Row key={index}>
                                    <Table.Cell>
                                      <strong>{stat[0]}</strong>
                                    </Table.Cell>
                                    <Table.Cell>
                                      {stat[0].includes('Rank') ? (
                                        <>
                                          <strong>{stat[1]}</strong>{' '}
                                          <span className="text-xs">/ 30</span>
                                        </>
                                      ) : (
                                        stat[1]
                                      )}
                                    </Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table.Root>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col w-full items-end pl-2 md:pl-0 pr-2 text-xs md:text-sm italic">
                    <div className="text-right w-full flex justify-between">
                      <div className="flex items-end">Stat Pick AI</div>
                      <div>
                        L10 = Last 10 Games{' '}
                        <span className="hidden md:inline-flex">|</span>{' '}
                        <br className="md:hidden" /> L15 = Last 15 Games{' '}
                        <span className="hidden md:inline-flex">|</span>{' '}
                        <br className="md:hidden" />
                        SZN = This Season
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-4 md:p-12Z md:mx-28">
                  <p className="font-bold border-b-2 border-gray-700 py-3">
                    Based on the data provided, my analysis points toward LeBron
                    James likely going{' '}
                    <strong>over the 7.5 assists line</strong> against the New
                    York Knicks.{' '}
                  </p>
                  <p>Let&apos;s break down the relevant information:</p>
                  <p>
                    <ul className="flex flex-col gap-6">
                      <li>
                        <strong>1. LeBron&apos;s Average Assists: </strong>
                      </li>
                      <li>
                        <strong>- Season Average:</strong> LeBron&apos;s season
                        average is slightly below the line at 7.08 assists per
                        game. However, it&apos;s close enough that a good game
                        could easily push it over.{' '}
                      </li>
                      <li>
                        <strong>- Last 5 Games Average:</strong> Importantly,
                        LeBron has been distributing the ball exceptionally well
                        over the last five games with an average of 9.2 assists,
                        which is well above the line.{' '}
                      </li>
                      <li>
                        <strong>- Last 10 Games Average:</strong> LeBron&apos;s
                        last 10 games average also sits above the line at 7.9
                        assists.{' '}
                      </li>
                      <li>
                        <strong>- Average vs. Knicks:</strong> Against the
                        Knicks in the past three seasons, LeBron has been
                        outstanding with an average of 10.67 assists across 3
                        games, which is significantly above the line.
                      </li>
                    </ul>
                  </p>{' '}
                  <p>
                    <ul className="flex flex-col gap-6">
                      <li>
                        <strong>2. Team and Opponent Stats: </strong>
                      </li>
                      <li>
                        <strong>- Lakers Assist Percentage:</strong>The
                        Lakers&apos; assist percentage is ranked 26th in the
                        league. Despite the low ranking, it doesn&apos;t seem to
                        affect LeBron&apos;s numbers significantly.{' '}
                      </li>
                      <li>
                        <strong>- Lakers Assist Ratio:</strong> Similar to
                        assist percentage, a low assist ratio rank of 23rd has
                        not prevented LeBron from averaging close to or above
                        the line in terms of assists.{' '}
                      </li>
                      <li>
                        <strong>- Knicks Turnover Percentage:</strong> The
                        Knicks are ranked 11th in turnover percentage, middle of
                        the pack, which could allow some opportunities for
                        fast-break assists.{' '}
                      </li>
                      <li>
                        <strong>- Lakers Pace:</strong> The Lakers have a pace
                        rank of 6th, indicating they play a faster tempo, which
                        means more possessions and opportunities for LeBron to
                        accumulate assists.
                      </li>
                      <li>
                        <strong>- Knicks Pace:</strong> The Knicks have a pace
                        rank of 20th. While slower, the disparity in pace
                        between the two teams could still result in additional
                        possessions for the Lakers, potentially leading to more
                        assists for LeBron.{' '}
                      </li>
                    </ul>
                  </p>
                  <p>
                    <ul className="flex flex-col gap-6">
                      <li>
                        <strong>3. Additional Factors: </strong>
                      </li>
                      <li>
                        <strong>- Over/Under for the Game:</strong>The
                        over/under for the game is set at 227 points, which
                        suggests that a high-scoring and fast-paced game is
                        expected. High-scoring games often correlate with higher
                        stats across the board, which could include more assists
                        for LeBron.{' '}
                      </li>
                      <li>
                        <strong>- Playing at Home:</strong> Players often
                        perform better at home due to familiar surroundings,
                        court, and support from the home fans. This can
                        sometimes boost performance.{' '}
                      </li>
                    </ul>
                  </p>
                  <p className="font-bold border-t-2 border-gray-700 pt-2">
                    Taking all this into account, while LeBron&apos;s assist
                    percentage and his team assists ranks are low, his recent
                    performance and historical data against the Knicks indicate
                    that he is likely to facilitate more in this matchup. The
                    pace of the game and the total points projected also provide
                    an environment conducive to LeBron racking up more than 7.5
                    assists. Consequently, I would recommend betting on LeBron
                    to go <strong>over the assists line set at 7.5.</strong>
                  </p>
                  <div className="text-center mt-8">
                    <Button
                      className="!cursor-pointer"
                      onClick={() => navigate(-1)}
                    >
                      <ArrowBackIcon /> Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
