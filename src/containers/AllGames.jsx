import { useEffect } from 'react';
import { AllGamesComp, Footer, Header } from '../components';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function Games() {
  useEffect(() => {
    document.title = "Today's Games";
  }, []);

  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
            <div className="md:mb-12 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`text-cyan-400 font-bold text-2xl md:text-3xl text-center`}
              >
                Today&apos;s Games
              </h1>
              <h2>Choose a game to create your pick.</h2>
            </div>
            <AllGamesComp />
            <div className="w-full text-center mt-6 font-bold text-sm md:text-base text-red-200">
              Teams highlighted in red are on the second leg of a back-to-back.
              They played yesterday.
            </div>
            <div className="w-full text-center mt-6 italic text-gray-300 text-sm md:text-base">
              The next day&apos;s slate of games and all picks refresh at 12AM
              US Eastern every day.
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
