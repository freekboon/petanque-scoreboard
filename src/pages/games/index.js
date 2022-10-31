import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import GamesTemplate from "~templates/Games";

const Games = GamesTemplate;

export const getServerSideProps = getGlobalData(async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`);
  const result = await response.json();

  return {
    props: {
      games: result.body,
    },
  };
});

export default withLayout(Games);
