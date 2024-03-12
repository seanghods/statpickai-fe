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
                <p className="text-lg">
                  When picking NBA Player Props, I would always look up a
                  player&apos;s recent stats to help evaluate if I wanted to
                  pursue that pick. But I knew that besides recent performance,
                  there were a host of other statistics that were just as
                  important to the pick&apos;s success that I wasn&apos;t
                  familiar with.{' '}
                </p>
                <p className="text-lg">
                  From opponent&apos;s defense against the player&apos;s
                  position, to opponent&apos;s defense against that
                  player&apos;s favorite zone, to team and opponent pace in
                  possessions, these statistics were there that could further
                  help me in my decision. And I found that most sports data
                  providers were great at providing me info only if I already
                  knew what I was looking for.
                </p>
                <p className="text-lg">
                  I created{' '}
                  <strong>
                    Stat <span className="text-[#4DE234]"> Pick</span> AI
                  </strong>{' '}
                  to help solve that problem. All you have to do is choose the
                  pick you are interested in and Stat Pick AI will pull together
                  a curated list of relevant individual and team statistics. The
                  AI will process these statistics, explain them to you, and
                  give you a lean on over or under on the likelihood of the line
                  hitting. This quickly cuts down research to solely you
                  evaluating data instead of hunting to find it.
                </p>
                <p className="text-lg">
                  Our data is updated daily and we use state-of-the-art AI GPTs
                  to evaluate the data and identify trends. We provide the AI
                  all the statistics and allow it to generate a recommendation.
                </p>
                <p className="text-lg">
                  Regarding the pricing, every response our AI generates comes
                  with its own cost for us. Besides that, we also maintain a
                  large collection of basic and detailed statistics, which are
                  crucial for the AI to work effectively. To cover these ongoing
                  costs, we&apos;ve set up a subscription model. For more
                  information, please check out the{' '}
                  <NavLink to="../pricing" className="text-blue-500 font-bold">
                    Pricing
                  </NavLink>{' '}
                  section on our website.
                </p>
                -Sean Ghods
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="col-span-2 text-center text-xl font-bold mb-4">
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
                className="px-7 py-3 w-full bg-[#2d9638] font-bold text-white hover:bg-[#42ae4f] hover:font-bold text-center rounded-md shadow-md block sm:w-auto"
              >
                Get Started
              </NavLink>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
