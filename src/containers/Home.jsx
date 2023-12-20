import { Footer, Header } from '../components';
import { NavLink, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import aiPic from '../assets/ai-gpu.jpg';
import { useState } from 'react';
import { Button } from '@radix-ui/themes';
import logo from '../assets/logo.png';

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 relative z-0">
      <div
        className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
        style={{
          background:
            'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
        }}
      ></div>
      <Header />
      <div>
        <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex flex-col gap-12 md:px-8">
          <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
            <img src={logo} alt="" className="w-[200px]" />
            <h1 className="text-white font-bold text-4xl xl:text-[44px]">
              Enhance your NBA Prop Picks with Stat
              <span className="text-[#4DE234]"> Pick</span> AI
            </h1>
            <div>
              <p className="text-gray-300 text-center max-w-xl leading-relaxed sm:mx-auto lg:ml-0 text-[18px]">
                Expand your research tools by utilizing our state-of-the-art AI
                to learn circumstances, statistics, and comparisons regarding
                your NBA Prop Pick.
              </p>
            </div>
            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
              <NavLink
                to="/sign-up"
                className="px-7 py-3 w-full bg-gray-100 hover:bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
              >
                Get started
              </NavLink>
              <NavLink
                to="/games"
                className="px-7 py-3 w-full bg-gray-700 hover:bg-gray-500 text-gray-200 text-center rounded-md block sm:w-auto"
              >
                See Today&apos;s Games
              </NavLink>
            </div>
          </div>
          <div className="w-full text-left p-7 mt-7 lg:mt-0 lg:ml-3 text-white shadow-gray-300 shadow-lg h-[720px] md:h-[450px]">
            <Typewriter
              options={{ delay: 10, cursor: '#' }}
              className="h-full"
              onInit={typewriter => {
                typewriter
                  .typeString()
                  .typeString(
                    `Based on the data provided, my analysis points toward LeBron James likely going <strong>over the 7.5 assists line</strong> against the New York Knicks. Let's break down the relevant information:`,
                  )
                  .typeString(
                    `<br /><br /><strong>1. LeBron's Average Assists:</strong> <br />- <strong>*Season Average*:</strong> LeBron’s season average is slightly
            below the line at 7.08 assists per game. However, it's close enough
            that a good game could easily push it over.<br /> - <strong>Last 5 Games Average</strong>: Importantly, LeBron has been distributing the ball
            exceptionally well over the last five games with an average of 9.2
            assists, which is well above the line. <br /> <strong>Last 10 Games Average</strong>:
            LeBron's last 10 games average also sits above the line at 7.9
            assists.<br /> - <strong>Average vs. Knicks</strong>: Against the Knicks in the past
            three seasons, LeBron has been outstanding with an average of 10.67
            assists across 3 games, which is significantly above the line.`,
                  )
                  .typeString(
                    `<br /><br /><strong>2. Team and Opponent Stats:</strong> <br /> - <strong>Lakers Assist Percentage: ...</strong>`,
                  )
                  .callFunction(() => setShowButton(true))
                  .start();
              }}
            />
            {showButton && (
              <div className="w-full text-center p-4">
                <Button onClick={() => navigate('/preview')}>
                  See rest of response
                </Button>
              </div>
            )}
          </div>
        </section>
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto md:px-8">
            <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
              <div className="flex-1 sm:hidden lg:block">
                <img
                  src={aiPic}
                  className="md:max-w-lg sm:rounded-lg h-[400px] w-full px-8 md:h-[600px] md:w-auto md:px-0"
                  alt="Pic of AI Chips"
                />
              </div>
              <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl text-gray-300">
                <p className=" text-3xl font-semibold sm:text-4xl text-center md:text-start">
                  How Does It Work?
                </p>
                <p className="mt-3">
                  This state-of-the-art AI processes hand-selected statistics
                  tailored to each prop, focusing on key player metrics such as
                  averages from the last 5 and 10 games, season-long
                  performance, and specific opponent histories. Additionally, a
                  suite of advanced statistics is incorporated in the analysis,
                  including team and opponent pace, opponent effective field
                  goal percentage, assist ratios, and more.
                </p>
                <p>
                  {' '}
                  The integration of comprehensive, contextual statistics
                  empowers the AI to deliver more precise predictions. Each
                  analysis is accompanied by a detailed breakdown of the key
                  statistics that influenced the decision, enhancing user
                  understanding and supporting informed decision-making.
                  Discover a smarter way to approach NBA prop picks, informed by
                  cutting-edge AI analysis.
                </p>
                <NavLink
                  to="/about"
                  className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        <section className="py-28">
          <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
            <div className="max-w-xl space-y-3 md:mx-auto">
              <h3 className="text-indigo-600 font-semibold w-full text-center">
                Start now
              </h3>
              <p className="text-gray-300 text-3xl font-semibold sm:text-4xl text-center">
                Join the Stat Pick AI Squad
              </p>
              <p className="text-white text-left">
                Start with a free pick every day with the free plan or upgrade
                to a priced plan for more access. Every AI requested response
                comes at a cost to us to generate. In addition, we manage highly
                specific base and advanced statistics to feed towards the AI.
              </p>
            </div>
            <div className="mt-4 flex w-full justify-center">
              <NavLink
                to="/sign-up"
                className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none"
              >
                Get started
              </NavLink>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
