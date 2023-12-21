import { Footer, Header } from '../components';

export default function About() {
  return (
    <>
      <div className="bg-gray-900 relative z-0 min-h-screen min-w-screen flex flex-col">
        <div
          className="absolute top-0 left-0 w-full h-full blur-[118px] -z-10"
          style={{
            background:
              'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.11) 15.74%, rgba(232, 121, 249, 0.11) 56.49%, rgba(79, 70, 229, 0.3) 115.91%)',
          }}
        ></div>
        <Header />
        <div className="flex-1">
          <section className="mt-8 md:mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center gap-12 md:px-8 flex-1">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl xl:text-[44px] mb-8 md:mb-24">
                About
              </h1>
            </div>
            <div className="flex-1 flex justify-center w-full mb-12">
              <div className="w-5/6 md:w-3/5 flex flex-col gap-5">
                <h1 className="text-center text-xl">
                  About Stat <span className="text-[#4DE234]">Pick</span> AI
                </h1>
                <p>
                  When choosing a player, statistic, and line to analyze, our
                  advanced AI response processes a carefully curated selection
                  of statistics, each chosen to align with individual prop bets.
                  These statistics are updated daily and delve deep into vital
                  player metrics, coving not only their average performances in
                  the most recent 5 and 10 games but also their overall season
                  averages, as well as their historical averages with specific
                  opponents. Moreover, this analysis is enriched with an array
                  of statistics, including assessments of team and opponent
                  paces, evaluations of opponent effective field goal
                  percentages, reading of assist ratios, among other nuanced
                  metrics.{' '}
                </p>
                <p>
                  The addition of these context-relevant statistics enables the
                  AI to offer predictions with higher precision. Every analysis
                  presented is accompanied by a description of the pivotal
                  statistics that underpin each decision. This level of detail
                  not only bolsters user comprehension but also provides more
                  informed, strategic decision-making.{' '}
                </p>
                <p>
                  Regarding the pricing, it&apos;s key to note that every
                  response our AI generates comes with its own cost for us.
                  Besides that, we also maintain a large collection of basic and
                  detailed statistics, which are crucial for the AI to work
                  effectively. To cover these ongoing costs, we&apos;ve set up a
                  subscription model. This model includes various pricing
                  options, so you can choose what works best for you. We suggest
                  you take a look at the free example we&apos;ve provided above
                  to get a feel for the quality of statistics and AI responses
                  we provide. For more information, please check out the Pricing
                  section on our website.
                </p>
                <p>
                  For any further questions or if you would like to get in
                  touch, please send an email to{' '}
                  <strong>info@statpickai.com</strong>.
                </p>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
