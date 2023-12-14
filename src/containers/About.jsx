import { Footer, Header } from '../components';

export default function About() {
  return (
    <>
      <div className="hero h-[700px] w-full trapezoid-home-div relative z-0">
        <Header />
        <div className="title h-1/2 flex items-center justify-center w-full font-saira_bold text-white text-7xl text-center">
          <div className="bg-black bg-opacity-60 rounded-lg px-12 py-4 mt-24">
            ABOUT
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center w-full mb-12">
        <div className="font-inter w-3/5 flex flex-col gap-5">
          <h1 className="text-center font-saira_bold text-2xl">
            ABOUT STAT <span className="text-[#4DE234]">PICK</span> AI
          </h1>
          <p>
            When choosing a player, statistic, and line to analyze, our advanced
            AI response processes a carefully curated selection of statistics,
            each chosen to align with individual prop bets. These statistics are
            updated daily and delve deep into vital player metrics, coving not
            only their average performances in the most recent 5 and 10 games
            but also their overall season averages, as well as their historical
            averages with specific opponents. Moreover, this analysis is
            enriched with an array of statistics, including assessments of team
            and opponent paces, evaluations of opponent effective field goal
            percentages, reading of assist ratios, among other nuanced metrics.{' '}
          </p>
          <p>
            The addition of these context-relevant statistics enables the AI to
            offer predictions with higher precision. Every analysis presented is
            accompanied by a description of the pivotal statistics that underpin
            each decision. This level of detail not only bolsters user
            comprehension but also provides more informed, strategic
            decision-making.{' '}
          </p>
          <p>
            Regarding the pricing, it&apos;s key to note that every response our
            AI generates comes with its own cost for us. Besides that, we also
            maintain a large collection of basic and detailed statistics, which
            are crucial for the AI to work effectively. To cover these ongoing
            costs, we&apos;ve set up a subscription model. This model includes
            various pricing options, so you can choose what works best for you.
            We suggest you take a look at the free example we&apos;ve provided
            above to get a feel for the quality of statistics and AI responses
            we provide. For more information, please check out the Pricing
            section on our website.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
