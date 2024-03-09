import { NavLink } from 'react-router-dom';
import { Footer, Header } from '../components';
import logo from '../assets/logo.png';
import { useEffect } from 'react';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function About() {
  useEffect(() => {
    document.title = 'About';
  }, []);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="mb-8 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="ticker-two h-[50px] font-bold text-3xl ">About</h1>
            </div>
            <div className="flex-1 flex justify-center w-full mb-12">
              <div className="w-5/6 md:w-3/5 flex flex-col gap-5">
                <h1 className="flex justify-center mb-8 w-full pr-4">
                  <img
                    src={logo}
                    alt="Picture of Logo"
                    className="w-1/2 md:w-1/4"
                  />
                </h1>
                <p>
                  When choosing a player, statistic, and line to analyze, you
                  are given a custom report with a full stat-table of curated,
                  relevant statistics and an advanced AI analysis of those
                  statistics in context of the pick. These statistics are
                  updated daily and delve into vital player metrics, covering
                  not only their average performances in the most recent 5 and
                  10 games but also their overall season averages, and their
                  historical averages with specific opponents.{' '}
                </p>
                <p>
                  Advanced team and opponent statistics are provided as well
                  into the AI analysis, including assessments of team and
                  opponent paces, evaluations of opponent effective field goal
                  percentages, reading of assist ratios, among other nuanced
                  metrics.{' '}
                </p>
                <p>
                  Regarding the pricing, every response our AI generates comes
                  with its own cost for us. Besides that, we also maintain a
                  large collection of basic and detailed statistics, which are
                  crucial for the AI to work effectively. To cover these ongoing
                  costs, we&apos;ve set up a subscription model. This model
                  includes various pricing options, so you can choose what works
                  best for you. We suggest you take a look at the free example
                  we&apos;ve provided above to get a feel for the quality of
                  statistics and AI responses we provide. For more information,
                  please check out the{' '}
                  <NavLink to="../pricing" className="text-blue-500 font-bold">
                    Pricing
                  </NavLink>{' '}
                  section on our website.
                </p>
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="col-span-2 text-center text-lg font-bold mb-4">
                    Statistics We Analyze Include:
                  </div>
                  <ul className="list-disc italic flex flex-col gap-2 pl-2">
                    <li>Season Average</li>
                    <li>Last 5 Average</li>
                    <li>Last 10 Average</li>
                    <li>Average vs Opponent</li>
                    <li>Opponent Defense vs Position</li>
                    <li>Team/Opponent Pace</li>
                    <li>Opponent Defensive Rating</li>
                    <li>Opponent Effective FG/3PFG Defense</li>
                  </ul>
                  <ul className="list-disc italic flex flex-col gap-2 pl-1">
                    <li>Team/Opponent Off/Def/Total Rebounds</li>
                    <li>Opponent Turnovers</li>
                    <li>Team Assist Percent</li>
                    <li>Team Assist Ratio</li>
                    <li>Opponent Allowed Steals</li>
                    <li>Opponent Blocks Against</li>
                    <li>Opponent Forced Turnovers</li>
                    <li>Total Over/Under</li>
                  </ul>
                  <div className="col-span-2 text-center italic font-bold mb-4">
                    And more...
                  </div>
                </div>
                <p>
                  For any further questions or if you would like to get in
                  touch, please send an email to{' '}
                  <strong>info@statpickai.com</strong>.
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full justify-center">
              <NavLink
                to="/sign-up"
                className="inline-block py-2 px-4 bg-[#31b940] text-white hover:bg-[#51d661] hover:font-bold duration-150 rounded-lg shadow-md hover:shadow-none"
              >
                Get started
              </NavLink>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
