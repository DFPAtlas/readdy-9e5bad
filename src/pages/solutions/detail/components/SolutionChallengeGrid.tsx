import type { SolutionChallenge } from "@/data/solutions";

interface SolutionChallengeGridProps {
  challenges: SolutionChallenge[];
}

export default function SolutionChallengeGrid({ challenges }: SolutionChallengeGridProps) {
  return (
    <section className="bg-background-50" id="challenges" aria-labelledby="challenges-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-18">
        <h2
          id="challenges-heading"
          className="mb-2 text-2xl text-foreground-50 md:text-3xl"
          style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
        >
          Business challenges
        </h2>
        <p className="mb-8 text-sm text-foreground-400">Common challenges this solution area may help address — and important limitations to consider.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          {challenges.map((challenge, i) => (
            <div key={i} className="rounded-lg border border-foreground-200/10 bg-background-100/60 p-5">
              <h3 className="mb-3 text-sm font-semibold text-foreground-200">{challenge.title}</h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-[10px] font-medium text-foreground-500 uppercase tracking-wide">The challenge</p>
                  <p className="text-[11px] leading-relaxed text-foreground-400">{challenge.explanation}</p>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-medium text-accent-400 uppercase tracking-wide">How governed data may help</p>
                  <p className="text-[11px] leading-relaxed text-foreground-300">{challenge.dataContribution}</p>
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-medium text-foreground-500 uppercase tracking-wide">Important limitation</p>
                  <p className="text-[11px] leading-relaxed text-foreground-400">{challenge.limitation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}