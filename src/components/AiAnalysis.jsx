import DOMPurify from 'dompurify';

export default function AiAnalysis({ response }) {
  // useEffect(() => {
  //   document.title = response.player ? response.player : 'Response';
  // }, [response]);
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
      return index == 0 ? (
        <div className="border-b-2 border-gray-700 p-3" key={index}>
          {renderFormattedText(line)}
        </div>
      ) : index == final.length - 1 ? (
        <div className="border-t-2 border-gray-700 p-3">
          {renderFormattedText(line)}
        </div>
      ) : (
        <div key={index}>{renderFormattedText(line)}</div>
      );
    });
  return (
    <>
      <div className="md:mx-24 flex flex-col gap-4 p-4 md:p-12Z">
        {finalMessage}
      </div>
    </>
  );
}
