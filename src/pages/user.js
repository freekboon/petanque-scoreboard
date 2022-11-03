import UserTemplate from "~templates/User";
import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";

const User = UserTemplate;

export const getServerSideProps = getGlobalData(async () => {
  return { props: {} };
});

export default withLayout(User);
