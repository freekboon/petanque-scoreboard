const getPlayers = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/player`
  );
  const result = await response.json();

  return {
    players: result.success ? result.body : [],
  };
};

const getGlobalData = (handler) => async (context) => {
  const { props } = handler ? await handler(context) : {};

  return {
    props: {
      ...props,
      ...(await Promise.all([getPlayers()])).reduce(
        (acc, item) => ({ ...acc, ...item }),
        {}
      ),
    },
  };
};
export default getGlobalData;
