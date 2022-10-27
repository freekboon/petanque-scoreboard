import withLayout from "~utils/withLayout";
import HomeTemplate from "~templates/Home";
import getGlobalData from "~lib/getGlobalData";

const Home = HomeTemplate;

export const getServerSideProps = getGlobalData(async () => {
  return {
    props: {},
  };
});

export default withLayout(Home);
