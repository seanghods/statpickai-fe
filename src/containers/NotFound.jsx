import { useEffect } from 'react';
import { Footer, Header } from '../components';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { backgroundGradient } from '../utils/helperComponents.jsx';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Page Not Found';
  }, []);
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        {backgroundGradient()}
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl px-4 items-center gap-12 md:px-8 flex-1">
            <div className="md:mb-24 space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl xl:text-[44px]">
                404 Not Found
              </h1>
            </div>
            <div className="w-full text-center font-bold text-xl flex flex-col gap-12 items-center justify-center my-12 md:my-0">
              <div>Error</div>
              <div>This page does not exist.</div>
              <div className="w-[200px]">
                <Button onClick={() => navigate('/games')}>
                  Visit Today&apos;s Games
                </Button>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

// <div className="flex items-center justify-center flex-col gap-24">
//   <h1 className="font-logo text-5xl">Error!</h1>
//   <p className="font-logo text-3xl">This page does not exist</p>
// </div>;
