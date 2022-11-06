import withLayout from "~utils/withLayout";
import StatsTemplate from "~templates/Stats";

const Stats = StatsTemplate;

export const getServerSideProps = async ({ params }) => {
  const { year } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stats/player/${year}`
  );
  const result = await response.json();

  return {
    props: {
      year,
      stats: result.body,
    },
  };
};

export default withLayout(Stats);
