import withLayout from "~utils/withLayout";
import NewGameTemplate from "~templates/NewGame";
import getGlobalData from "~lib/getGlobalData";

const NewGame = NewGameTemplate;

export const getServerSideProps = getGlobalData();

export default withLayout(NewGame);
