import { ResponseContext } from './ResponseContext';
import { useState } from 'react';

export function ResponseProvider({ children }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [analysisData, setAnalysisData] = useState({});
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [responseFailed, setResponseFailed] = useState(false);
  const [user, setUser] = useState({ user: '' });

  return (
    <ResponseContext.Provider
      value={{
        loadingAi,
        setLoadingAi,
        isDuplicate,
        setIsDuplicate,
        analysisData,
        setAnalysisData,
        analysisComplete,
        setAnalysisComplete,
        responseFailed,
        setResponseFailed,
        user,
        setUser,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
}
