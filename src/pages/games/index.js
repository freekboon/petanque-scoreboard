import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import GamesTemplate from "~templates/Games";

const Games = GamesTemplate;

export const getServerSideProps = getGlobalData();

export default withLayout(Games);
