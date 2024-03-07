import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Typewriter from 'typewriter-effect';
import { LoadingAiIcon } from './sub-components/Icons';

export default function AiAnalysis({ response }) {
  // useEffect(() => {
  //   document.title = response.player ? response.player : 'Response';
  // }, [response]);
  // const [firstColumnItems, setFirstColumnItems] = useState([]);
  // const [secondColumnItems, setSecondColumnItems] = useState([]);

  function renderFormattedText(text) {
    const withStrongTags = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong>$1</strong>',
    );
    const sanitizedHtml = DOMPurify.sanitize(withStrongTags);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
  const final = response.message ? response.message.split('\n') : null;
  const finalMessage =
    final &&
    final.map((line, index) => {
      return (
        <div key={index}>
          {index == 0 ? (
            <div className="border-b-2 border-gray-700 p-3">
              {renderFormattedText(line)}
            </div>
          ) : index == final.length - 1 ? (
            <div className="border-t-2 border-gray-700 p-3">
              {renderFormattedText(line)}
            </div>
          ) : (
            <div key={index}>{renderFormattedText(line)}</div>
          )}
        </div>
      );
    });
  useEffect(() => console.log(finalMessage), [finalMessage]);
  // useEffect(() => {
  //   if (final && final.length > 2) {
  //     // Ensure 'final' is not null and has enough items
  //     const columnItems = final.slice(1, -1); // Exclude the first and last items
  //     if (!columnItems[0]) columnItems.shift();
  //     let halfLength = Math.ceil(columnItems.length / 2);
  //     // Ensure we don't exceed bounds and adjust halfLength if necessary
  //     while (
  //       halfLength < columnItems.length - 1 &&
  //       !Number(columnItems[halfLength][0])
  //     ) {
  //       halfLength -= 1;
  //     }

  //     // Split into two columns considering the adjusted halfLength
  //     setFirstColumnItems(columnItems.slice(0, halfLength));
  //     setSecondColumnItems(columnItems.slice(halfLength));
  //   }
  // }, [response]);
  return (
    <>
      <div className="md:mx-24 flex flex-col gap-4 p-4 md:p-12Z">
        {/* <Typewriter
          options={{ delay: 10, cursor: '#' }}
          className="h-full"
          onInit={typewriter => {
            finalMessage.forEach((html, index) => {
              const htmlString = String(html);
              if (index < final.length - 1) {
                typewriter.typeString(htmlString).pauseFor(500);
              } else {
                typewriter.typeString(htmlString);
              }
            });
            typewriter.start();
          }}
        /> */}
        {finalMessage}
        {response.doneGenerating ? null : <LoadingAiIcon />}
      </div>
      {/* <div className="md:mx-24 flex-col gap-4 p-4 md:p-12Z hidden md:flex">
        <div className="border-b-2 border-gray-700 p-3 flex gap-3">
          {final[0].toLowerCase().includes('over') && <ArrowUpward />}
          {final[0].toLowerCase().includes('under') && <ArrowDownward />}
          {renderFormattedText(final[0])}
        </div>
        <div className="flex flex-row justify-between gap-8">
          <div className="w-1/2 pr-2">
            {firstColumnItems.map((item, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  Number(item[0]) && index !== 0
                    ? `border-dotted border-t-2 border-gray-600 pt-4`
                    : null
                }`}
              >
                {renderFormattedText(item)}
              </div>
            ))}
          </div>
          <div className="w-1/2 pl-2">
            {secondColumnItems.map((item, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  Number(item[0]) && index !== 0
                    ? `border-dotted border-t-2 border-gray-600 pt-4`
                    : null
                }`}
              >
                {renderFormattedText(item)}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-700 p-3">
          {renderFormattedText(final[final.length - 1])}
        </div>
      </div> */}
    </>
  );
}
