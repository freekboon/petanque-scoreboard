import withLayout from "~utils/withLayout";
import StatsTemplate from "~templates/Stats";

const Stats = StatsTemplate;

const getTeamStats = async (year) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/team/${year}`
  );
  const result = await response.json();

  return result.body;
};

const getPlayerStats = async (year) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/player/${year}`
  );
  const result = await response.json();

  return result.body;
};

const getSeason = async (year) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/season/${year}`
  );
  const result = await response.json();

  return result.body || null;
};

const getSeasons = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/season`
  );
  const result = await response.json();

  return result.body || null;
};

export const getServerSideProps = async ({ params }) => {
  const { year } = params;

  const props = await Promise.all([
    { seasons: await getSeasons() },
    { season: await getSeason(year) },
    { players: await getPlayerStats(year) },
    { teams: await getTeamStats(year) },
  ]);

  return {
    props: {
      year,
      ...props.reduce((acc, result) => ({ ...acc, ...result }), {}),
    },
  };
};

export default withLayout(Stats);
