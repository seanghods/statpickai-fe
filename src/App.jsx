import {
  Home,
  Game,
  AllGames,
  NotFound,
  About,
  Pricing,
  PrivacyPolicy,
  TermsOfService,
} from './containers';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<AllGames />} />
        <Route path="/game/:_id" element={<Game />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
