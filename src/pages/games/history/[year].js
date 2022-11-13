import withLayout from "~utils/withLayout";
import GamesTemplate from "~templates/Games";

const Games = GamesTemplate;

const getGames = async (year) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/history/${year}`
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

  return {
    props: {
      year,
      seasons: await getSeasons(),
      games: await getGames(year),
    },
  };
};

export default withLayout(Games);
