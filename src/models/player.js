// scratch pad for DB design
// this is basically pseudo-code to figure out our endpoints and such.

export const player = {
  name: string,
  id: uuid,
  historical5v5: {
    historicalCorsiForPercentage: float,
    historicalGoalsForPercentage: float,
    historicalExpectedGoalsFor: float,
    historalPDO: float,
  },
  // go back three years
  yearly5v5: [
    {
      corsiForPercentage: float,
      goalsForPercentage: float,
      individualExpectedGoalsFor: float,
      year: integer,
    },
  ],
  rankings: {
    espn: {
      rank: integer,
    },
    // any other rankings we can snag we put them here.
  },
};
