import withLayout from "~utils/withLayout";
import HomeTemplate from "~templates/Home";

const Home = HomeTemplate;

const getCurrentGame = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/current`
  );
  const result = await response.json();

  return result.body || null;
};

const getCurrentSeason = async (year) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/season/${year}`
  );
  const result = await response.json();

  return result.body || null;
};

export const getServerSideProps = async () => {
  const game = await getCurrentGame();

  const year = new Date().getFullYear();
  const season = await getCurrentSeason(year);

  return {
    props: {
      season: {
        ...season,
        year,
      },
      game,
    },
  };
};

export default withLayout(Home);
