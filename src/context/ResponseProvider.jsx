import { ResponseContext } from './ResponseContext';
import { useState } from 'react';

export function ResponseProvider({ children }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [responseFailed, setResponseFailed] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);
  const [user, setUser] = useState({ user: '' });

  return (
    <ResponseContext.Provider
      value={{
        loadingAi,
        setLoadingAi,
        analysisData,
        setAnalysisData,
        analysisComplete,
        setAnalysisComplete,
        responseFailed,
        setResponseFailed,
        showLogInModal,
        setShowLogInModal,
        user,
        setUser,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
}
