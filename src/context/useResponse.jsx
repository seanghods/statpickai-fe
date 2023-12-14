import { useContext } from 'react';
import { ResponseContext } from './ResponseContext';

export default function useResponse() {
  return useContext(ResponseContext);
}
