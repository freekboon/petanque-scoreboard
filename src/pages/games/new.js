import withLayout from "~utils/withLayout";
import NewGameTemplate from "~templates/NewGame";

const NewGame = NewGameTemplate;

export const getServerSideProps = async () => {
  const players = [
    { id: "1", name: "Bart" },
    { id: "2", name: "Stef" },
    { id: "3", name: "Kamiel" },
    { id: "4", name: "Tommy" },
    { id: "5", name: "Rens" },
    { id: "6", name: "Jordan" },
    { id: "7", name: "Freek" },
  ];

  return {
    props: {
      players,
    },
  };
};

export default withLayout(NewGame);
