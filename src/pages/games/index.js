import GamesTemplate from "~templates/Games";
import withLayout from "~utils/withLayout";

const NewGames = GamesTemplate;

export const getServerSideProps = async ({ query }) => {
  const { page = 1 } = query;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game?page=${page}`
  );
  const result = await response.json();

  return {
    props: {
      page,
      count: result.body.count,
      games: result.body.games,
    },
  };
};

export default withLayout(NewGames);
