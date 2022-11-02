import { getProviders } from "next-auth/react";
import LoginTemplate from "~templates/Login";

const Login = LoginTemplate;

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default Login;
