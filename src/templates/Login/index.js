import React from "react";
import { signIn, useSession } from "next-auth/react";
import { object } from "prop-types";
import { useRouter } from "next/router";
import classes from "./Login.module.scss";
import Button from "~components/Button";
import Logo from "~public/logo.svg";

const Login = ({ providers }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <Logo />
          <h1 className={classes.h1}>WAT DAN?!</h1>
          <p className={classes.body}>Balls out petanque since 2019</p>
        </div>
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                variant="outline"
                color="white"
                size="large"
                wide
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

Login.propTypes = {
  providers: object,
};

export default Login;
