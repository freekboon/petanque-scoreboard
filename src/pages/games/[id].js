import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import GameTemplate from "~templates/Game";

const Game = GameTemplate;

export const getServerSideProps = getGlobalData(async ({ query }) => {
  const { id } = query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/${id}`
  );
  const result = await response.json();

  const game = result.body;

  return {
    props: {
      game,
    },
  };
});

export default withLayout(Game);
