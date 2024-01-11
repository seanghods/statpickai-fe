import { Dialog, Transition } from '@headlessui/react';
import { LoadingAiIcon, Xmark } from './Icons';
import { Fragment } from 'react';
import useResponse from '../../context/useResponse';

export default function LoadingAiModal({ player = '', stat = '', line = '' }) {
  const { setLoadingAi, responseFailed, setResponseFailed } = useResponse();
  const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
  const playerName = player
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  function GeneratingModal() {
    return (
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 text-white flex justify-center items-center border-black border-b-2 pb-3"
        >
          {player ? 'Generating AI Analysis...' : 'Retrieving AI Analysis...'}
        </Dialog.Title>
        <div className="mt-4 flex justify-center flex-col items-center italic gap-5 text-white">
          <div>
            <LoadingAiIcon />
          </div>
          {player ? (
            <>
              <div>This may take up to a minute...</div>
              <div>Player: {playerName}...</div>
              <div>
                Stat: {statName.length < 5 ? statName.toUpperCase() : statName}
                ...
              </div>
              <div>Line: {line}...</div>{' '}
              <div className="flex flex-col items-center gap-2 mt-2">
                <button
                  onClick={() => setLoadingAi(false)}
                  className="bg-gray-400 text-sm px-3 py-1 rounded-lg hover:bg-gray-500"
                >
                  Close
                </button>
                <div className="text-xs px-16 text-center">
                  You will receive a notification when your analysis is ready if
                  you close this window.
                </div>
              </div>
            </>
          ) : (
            <div>Retrieving final analysis...</div>
          )}
        </div>
      </Dialog.Panel>
    );
  }
  function ErrorModal() {
    return (
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 text-white flex justify-center items-center border-b-2 pb-3"
        >
          Error...
        </Dialog.Title>
        <div className="mt-4 flex justify-center flex-col items-center italic gap-5 text-white">
          <div>
            <Xmark />
          </div>
          <div>Unfortunately, our AI hit a snag.</div>
          <div className="text-center">
            The error has been reported and your credit has been refunded.
          </div>
          <div>Please try another option.</div>
          <div>Sorry for the inconvenience</div>{' '}
          <button
            onClick={() => setLoadingAi(false)}
            className="bg-gray-400 text-sm px-3 py-1 rounded-lg hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </Dialog.Panel>
    );
  }
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setLoadingAi(false);
          setResponseFailed(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {responseFailed ? ErrorModal() : GeneratingModal()}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
