import { LoadingIcon } from '../components/sub-components/Icons';
import logo from '../assets/logo.png';

export default function FullLoadingPage() {
  return (
    <>
      <div className="bg-gray-900 z-50 min-h-screen min-w-screen flex flex-col absolute">
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <div className="w-screen h-screen z-50 flex flex-col justify-center items-center">
          <img src={logo} alt="Stat Pick AI Logo" className="w-[200px] pr-5" />
          <LoadingIcon width="70" height="70" />
          Our database provider is experiencing outages, we are looking to fix
          this as soon as possible.
        </div>
      </div>
    </>
  );
}
