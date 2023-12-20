import { LoadingIcon } from '../components/sub-components/Icons';
import logo from '../assets/logo.png';

export default function FullLoadingPage() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-black flex flex-col justify-center items-center">
      <img src={logo} alt="Stat Pick AI Logo" className="w-[200px] pr-5" />
      <LoadingIcon width="70" height="70" />
    </div>
  );
}
