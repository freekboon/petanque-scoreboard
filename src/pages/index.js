import withLayout from "~utils/withLayout";
import HomeTemplate from "~templates/Home";
import getGlobalData from "~lib/getGlobalData";

const Home = HomeTemplate;

export const getServerSideProps = getGlobalData(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/current`
  );

  const result = await response.json();

  // const { current, rounds } = result.body;

  return {
    props: {
      current: result.body?.current || null,
      rounds: result.body?.rounds || [],
    },
  };
});

export default withLayout(Home);
