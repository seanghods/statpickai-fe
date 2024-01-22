import { AllGamesComp, Footer, Header } from '../components';

export default function Games() {
  return (
    <>
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
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
            <div className="md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1
                className={`text-cyan-400 font-bold text-2xl md:text-3xl text-center`}
              >
                Games
              </h1>
            </div>
            <AllGamesComp />
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
