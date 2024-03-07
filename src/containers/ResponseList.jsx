import { useEffect } from 'react';
import { AllResponses, Footer, Header } from '../components';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function ResponseList() {
  useEffect(() => {
    document.title = 'All Responses';
  }, []);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="mb-14 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="ticker-two font-bold text-3xl ">Responses</h1>
            </div>
            <AllResponses />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
