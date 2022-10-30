import withLayout from "~utils/withLayout";
import getGlobalData from "~lib/getGlobalData";
import StatsTemplate from "~templates/Stats";

const Stats = StatsTemplate;

export const getServerSideProps = getGlobalData();

export default withLayout(Stats);
