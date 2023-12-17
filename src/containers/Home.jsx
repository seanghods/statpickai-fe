import { Footer, Header } from '../components';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import aiPic from '../assets/ai-gpu.jpg';

export default function Home() {
  return (
    <>
      <div className="hero h-[400px] md:h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-5xl md:text-7xl text-center cursor-default">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            STAT <span className="text-[#4DE234]">PICK</span> AI
          </div>
        </div>
      </div>
      <div className="hook title flex items-center justify-center w-full font-inter_bold tracking-tighter text-white text-lg md:text-xl text-center absolute z-10 top-[325px] md:top-[560px] right-[0%]">
        <div className="bg-black bg-opacity-90 rounded-lg px-12 py-1 italic">
          <Typewriter
            options={{ delay: 45, cursor: '#' }}
            onInit={typewriter => {
              typewriter
                .typeString(
                  'Advanced statistics-based AI analysis on NBA Player Props...',
                )
                .start();
            }}
          />
          {/* Advanced statistics-based AI analysis on NBA Player Props */}
        </div>
      </div>
      <NavLink
        to="/games"
        className="hook title flex items-center justify-center w-full font-saira_bold text-black text-3xl md:text-4xl text-center absolute z-10 top-[390px] md:top-[645px] right-[0%]"
      >
        <span className="mt-7 md:mt-0 hover:text-green-800 underline hover:no-underline">
          SEE TODAY&apos;S GAMES{' '}
        </span>
      </NavLink>
      {/* <div className="hook title flex items-center justify-center w-full font-saira_bold text-white text-2xl text-center mt-4">
        <NavLink
          to="/games"
          className="bg-[#4DE234] hover:bg-[#55b644] bg-opacity-90 rounded-lg px-12 py-1"
        >
          TODAY&apos;S FREE ANALYSIS: LEBRON OVER 26.5 POINTS
        </NavLink>
      </div> */}
      <div className="flex flex-col md:flex-row w-full mt-24 md:mt-0 md:my-20 items-center">
        <div className="about-pic w-5/6 md:w-1/2 flex justify-center md:pl-12">
          <img
            src={aiPic}
            alt="Pic of AI Chips"
            className="w-[250px] md:w-[400px] h-[250px] mb-4 md:mb-0 md:h-[400px] rounded-lg"
          />
        </div>
        <div className="about-msg w-5/6 md:w-1/2 flex flex-col items-center md:px-16 gap-3">
          <h3 className="font-saira_bold text-3xl md:text-4xl flex gap-3 justify-start w-full">
            <div className="bg-[#4DE234] w-[8px] h-full"></div>HOW DOES IT WORK?
          </h3>
          <p className="font-inter text-gray-600">
            This state-of-the-art AI processes hand-selected statistics tailored
            to each prop, focusing on key player metrics such as averages from
            the last 5 and 10 games, season-long performance, and specific
            opponent histories. Additionally, a suite of advanced statistics is
            incorporated in the analysis, including team and opponent pace,
            opponent effective field goal percentage, assist ratios, and more.{' '}
            <br /> <br /> The integration of comprehensive, contextual
            statistics empowers the AI to deliver more precise predictions. Each
            analysis is accompanied by a detailed breakdown of the key
            statistics that influenced the decision, enhancing user
            understanding and supporting informed decision-making. Discover a
            smarter way to approach NBA prop picks, informed by cutting-edge AI
            analysis.
          </p>
        </div>
      </div>
      <div className="flex w-full mt-10 mb-20 justify-center">
        <div className="flex flex-col w-5/6 md:w-1/3 gap-3">
          <div className="font-saira_bold text-4xl flex gap-3 justify-center w-full">
            <div className="bg-[#3445e2] w-[8px] h-full"></div>WHY CHARGE?
          </div>
          <p className="font-inter text-gray-600">
            Every AI requested response comes at a cost to us to generate. In
            addition, we manage highly specific base and advanced statistics to
            feed towards the AI. <br /> <br />
            We require a monthly fee to cover these costs. You can choose
            several different price point that works well for you. Feel free to
            analyze the free play above for a feel on the statistics provided
            and AI response generated. See{' '}
            <NavLink
              className="text-[#3445e2] hover:text-[#2f3677]"
              to="/pricing"
            >
              Pricing{' '}
            </NavLink>
            for more information.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
