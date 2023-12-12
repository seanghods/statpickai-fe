import { Dialog, Transition } from '@headlessui/react';
import { LoadingAiIcon } from './Icons';
import { Fragment } from 'react';

export default function LoadingAiModal({ player = '', stat = '', line = '' }) {
  const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
  const playerName = player
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          return;
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-inter_bold leading-6 text-gray-900 flex justify-center items-center border-b-2 pb-3"
                >
                  Generating AI Analysis...
                </Dialog.Title>
                <div className="mt-4 flex justify-center flex-col items-center font-inter italic gap-5">
                  <div>
                    <LoadingAiIcon />
                  </div>
                  {player ? (
                    <>
                      <div>This may take up to a minute...</div>
                      <div>Player: {playerName}...</div>
                      <div>Stat: {statName}...</div>
                      <div>Line: {line}...</div>{' '}
                    </>
                  ) : (
                    <div>Retrieving final analysis...</div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
