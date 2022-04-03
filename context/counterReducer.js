const Counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "REVERT":
      return (state = 0);

    default:
      return state;
  }
};

export default Counter;
