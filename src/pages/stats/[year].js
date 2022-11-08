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

export const getServerSideProps = async ({ params }) => {
  const { year } = params;

  return {
    props: {
      year,
      season: await getSeason(year),
      players: await getPlayerStats(year),
      teams: await getTeamStats(year),
    },
  };
};

export default withLayout(Stats);
