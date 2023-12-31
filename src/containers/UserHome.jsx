import { AllGamesComp, AllResponses, Footer, Header } from '../components';

export default function UserHome() {
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
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="ticker-three text-3xl m-4 text-center">
              Your Recent Picks
            </div>
            <AllResponses />
            <div className="ticker-two text-3xl m-4 text-center mt-20">
              Today&apos;s Games
            </div>
            <AllGamesComp />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
