import { Footer, Header } from '../components';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import aiPic from '../assets/ai-gpu.jpg';

export default function Home() {
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center cursor-default">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            STAT <span className="text-[#4DE234]">PICK</span> AI
          </div>
        </div>
      </div>
      <div className="hook title flex items-center justify-center w-full font-inter_bold tracking-tighter text-white text-xl text-center absolute z-10 top-[560px] right-[0%]">
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
        className="hook title flex items-center justify-center w-full font-saira_bold text-black text-4xl text-center absolute z-10 top-[645px] right-[0%]"
      >
        <span className="hover:text-green-800 underline hover:no-underline">
          SEE TODAY&apos;S GAMES{' '}
        </span>
      </NavLink>
      <div className="hook title flex items-center justify-center w-full font-saira_bold text-white text-2xl text-center mt-4">
        <NavLink
          to="/games"
          className="bg-[#4DE234] hover:bg-[#55b644] bg-opacity-90 rounded-lg px-12 py-1"
        >
          TODAY&apos;S FREE ANALYSIS: LEBRON OVER 26.5 POINTS
        </NavLink>
      </div>
      <div className="flex w-full my-20">
        <div className="about-pic w-1/2 flex justify-center pl-12">
          <img
            src={aiPic}
            alt="Pic of AI Chips"
            className="w-[400px] h-[400px] rounded-lg"
          />
        </div>
        <div className="about-msg w-1/2 flex flex-col items-center px-16 gap-3">
          <h3 className="font-saira_bold text-4xl flex gap-3 justify-start w-full">
            <div className="bg-[#4DE234] w-[8px] h-full"></div>HOW DOES IT WORK?
          </h3>
          <p className="font-inter text-gray-600">
            We feed our state-of-the-art AI hand-chosen statistics specific to
            your prop. These include first and foremost averages across last 5
            games, last 10 games, the season, and against that particular
            opponent. We also include advanced statistics such as team &
            opponent pace, opponent effective field goal percentage, assist
            ratios, offensive & defensive rebounds, and more. <br /> <br />
            We have found that the more contextual statistics we can provide the
            AI, the more confident it is in its decision. Along with it&apos;s
            decision, the AI will also articulate the statistics it emphasized
            in it&apos;s decision for your knowledge and ultimately final
            decision.
          </p>
        </div>
      </div>
      <div className="flex w-full mt-10 mb-20 justify-center">
        <div className="flex flex-col w-1/3 gap-3">
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
