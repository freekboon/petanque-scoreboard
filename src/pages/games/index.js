import withLayout from "~utils/withLayout";
import GamesTemplate from "~templates/Games";

const Games = GamesTemplate;

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`);
  const result = await response.json();

  return {
    props: {
      games: result.body,
    },
  };
};

export default withLayout(Games);
