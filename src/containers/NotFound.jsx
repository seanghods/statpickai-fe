import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Error';
  }, []);
  return (
    <div className="flex items-center justify-center flex-col gap-24">
      <h1 className="font-logo text-5xl">Error!</h1>
      <p className="font-logo text-3xl">This page does not exist</p>
    </div>
  );
}
