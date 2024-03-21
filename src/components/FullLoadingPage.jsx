import { LoadingIcon } from '../components/sub-components/Icons';
import logo from '../assets/logo.png';
import { backgroundGradient } from '../utils/helperComponents';

export default function FullLoadingPage() {
  return (
    <>
      <div className="bg-gray-900 z-50 h-full min-w-screen w-full flex flex-col absolute">
        {backgroundGradient()}
        <div className="w-full h-screen z-50 flex flex-col justify-center items-center">
          <img src={logo} alt="Stat Pick AI Logo" className="w-[200px] pr-5" />
          <LoadingIcon width="70" height="70" />
        </div>
      </div>
    </>
  );
}
