let initialState = {
  SOL: 0,
  RATIO: 0,
  GUESS: 0,
};

const guesser = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SOL":
      return { ...state, SOL: action.payload };

    case "SET_RATIO":
      return { ...state, RATIO: action.payload };

    case "SET_GUESS":
      return { ...state, GUESS: action.payload };

    default:
      return state;
  }
};

export default guesser;
