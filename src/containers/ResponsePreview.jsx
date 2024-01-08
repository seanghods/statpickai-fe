import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components';
import { ScrollToTop } from '../utils/helpers';
import { Button } from '@radix-ui/themes';
import logo from '../assets/logotransp.png';

export default function Preview() {
  const navigate = useNavigate();
  return (
    <>
      <ScrollToTop />
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <Header />
        <div className="flex-1">
          <section className="mt-10 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className={`ticker-two font-bold text-3xl mb-14 text-center`}>
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
              <div className="flex-1 md:mx-28 flex md:text-lg rounded-lg flex-col justify-center items-center">
                <div className="flex flex-col gap-4 p-4 md:p-12Z">
                  <p>
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
                        <strong>- Season Average:</strong> LeBron&apos:s season
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
                  <p>
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
                    <Button onClick={() => navigate(-1)}>GO BACK</Button>
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
