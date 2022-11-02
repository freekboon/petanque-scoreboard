import React from "react";
import { signIn, useSession } from "next-auth/react";
import { object } from "prop-types";
import { useRouter } from "next/router";

const Login = ({ providers }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div>
      <h1>Login</h1>
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
    </div>
  );
};

Login.propTypes = {
  providers: object,
};

export default Login;
