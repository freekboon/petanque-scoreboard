import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import GameTemplate from "~templates/Game";

const Game = GameTemplate;

const getGame = async (gameId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/${gameId}`
  );
  const result = await response.json();

  return result.body;
};

const getRounds = async (gameId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/round?gameId=${gameId}`
  );
  const result = await response.json();

  return result.body;
};

export const getServerSideProps = getGlobalData(async ({ query }) => {
  const { id } = query;

  const game = await getGame(id);
  const rounds = await getRounds(id);

  return {
    props: {
      game,
      rounds,
    },
  };
});

export default withLayout(Game);
