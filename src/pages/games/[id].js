import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import GameTemplate from "~templates/Game";

const Game = GameTemplate;

export const getServerSideProps = getGlobalData(async ({ query }) => {
  const { id } = query;
  const response = await fetch(`${process.env.BASE_URL}/api/game/${id}`);
  const result = await response.json();

  return {
    props: {
      game: result.body,
    },
  };
});

export default withLayout(Game);
