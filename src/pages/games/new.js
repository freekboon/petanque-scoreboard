import withLayout from "~utils/withLayout";
import NewGameTemplate from "~templates/NewGame";

const NewGame = NewGameTemplate;

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/player`
  );
  const result = await response.json();

  return {
    props: {
      players: result.body,
    },
  };
};

export default withLayout(NewGame);
