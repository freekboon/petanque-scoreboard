import React from "react";
import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";

const Stats = () => <div>Stats</div>;

export const getServerSideProps = getGlobalData();

export default withLayout(Stats);
