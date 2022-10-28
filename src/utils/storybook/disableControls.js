const disableControls = (...args) =>
  args.reduce(
    (acc, arg) => ({ ...acc, [arg]: { table: { disable: true } } }),
    {}
  );

export default disableControls;
