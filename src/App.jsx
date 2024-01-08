import {
  Home,
  Game,
  AllGames,
  AiResponse,
  NotFound,
  About,
  Pricing,
  PrivacyPolicy,
  TermsOfService,
  ResponseList,
  SignUpPage,
  Profile,
  UserHome,
  Preview,
  ContactUs,
  ResetPassword,
  VerifyEmail,
} from './containers';
import { Route, Routes, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FullLoadingPage } from './components';
import { Checkmark, Xmark } from './components/sub-components/Icons';
import useResponse from './context/useResponse';
import { useEffect, useState } from 'react';
import { API_ROUTES } from './utils/constants';
import Marquee from 'react-fast-marquee';

function App() {
  const {
    loadingAi,
    setLoadingAi,
    analysisData,
    analysisComplete,
    setAnalysisComplete,
    responseFailed,
    setResponseFailed,
    setUser,
  } = useResponse();
  const [fullLoadingPage, setFullLoadingPage] = useState(false);
  const [popularPicks, setPopularPicks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkAuthenticationStatus() {
      setFullLoadingPage(true);
      try {
        const response = await fetch(API_ROUTES.checkSession, {
          credentials: 'include',
          withCredentials: true,
        });
        const data = await response.json();

        if (data.isAuthenticated) {
          setUser(data.user);
        } else {
          setUser({ username: '' });
        }
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
      setFullLoadingPage(false);
    }
    checkAuthenticationStatus();
  }, [setUser]);
  useEffect(() => {
    async function fetchPopularPicks() {
      const response = await fetch(API_ROUTES.picks);
      const data = await response.json();
      setPopularPicks(data);
    }
    fetchPopularPicks();
  }, []);
  useEffect(() => {
    if (analysisComplete) {
      if (loadingAi && !responseFailed) {
        navigate(`/response/${analysisData.dateOfGame}-${analysisData._id}`);
        setLoadingAi(false);
      } else if (!loadingAi && responseFailed) {
        ToastErrorMsg();
        setResponseFailed(false);
      } else if (!responseFailed) {
        ToastSuccessMsg();
      }
      setAnalysisComplete(false);
    }
  }, [analysisComplete, loadingAi]);
  function ToastErrorMsg() {
    return toast(
      <div className="flex items-center font-saira_bold">
        <Xmark />
        <span className="pl-2">
          Sorry! Your {analysisData.player} analysis hit an error. Your credit
          has been refunded. Please try again.
        </span>
      </div>,
      { style: { padding: '5px 6px' } },
    );
  }
  function ToastSuccessMsg() {
    return toast(
      <div
        className="cursor-pointer flex items-center font-saira_bold"
        onClick={() =>
          navigate(`/response/${analysisData.dateOfGame}-${analysisData._id}`)
        }
      >
        <Checkmark />
        <span className="pl-2">
          Your {analysisData.player} analysis is ready.
        </span>
      </div>,
      { style: { padding: '5px 6px' } },
    );
  }
  function getRandomClassName() {
    const classes = ['ticker-one', 'ticker-two', 'ticker-three'];
    return classes[Math.floor(Math.random() * classes.length)];
  }
  return (
    <>
      <Marquee
        className="!absolute top-20 cursor-default select-none"
        speed="125"
        gradient={false}
      >
        <div className="flex gap-48 text-lg brightness-150">
          {popularPicks.map((pick, index) => (
            <p key={index} className={getRandomClassName()}>
              {pick}
            </p>
          ))}
          <p></p>
        </div>
      </Marquee>
      <Toaster position="top-center" reverseOrder={false} />
      {fullLoadingPage && <FullLoadingPage />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/game/:_id" element={<Game />} />
        <Route path="/response/:path" element={<AiResponse />} />
        <Route path="/all-responses/" element={<ResponseList />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
