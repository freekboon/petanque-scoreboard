import React from "react";
import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";

const Games = () => <div>Games</div>;

export const getServerSideProps = getGlobalData();

export default withLayout(Games);
