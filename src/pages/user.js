import UserTemplate from "~templates/User";
import withLayout from "~utils/withLayout";

const User = UserTemplate;

export const getServerSideProps = async () => {
  return { props: {} };
};

export default withLayout(User);
