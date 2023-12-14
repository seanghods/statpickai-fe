import { Footer, Header } from '../components';

export default function Profile() {
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            USERNAME
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full mb-12"></div>
      <Footer />
    </>
  );
}
