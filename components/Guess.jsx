import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import React from "react";
import { useState } from "react";
import { transferSOL, treasureSecret } from "../helper";
import { useDispatch, useSelector } from "react-redux";
import RatioFix from "./Guess/Ratio";
import GuessScreen from "./Guess/GuessScreen";

const Staker = ({ value, setValue, onClick }) => (
  <div className="mt-5 p-5 min-w-[70vw] flex flex-col rounded-lg">
    <p className="mt-5 text-red-500 font-mono text-center">
      Enter the amount of your stake
    </p>
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="p-3 mt-3 rounded-md"
      min={0}
    />
    <div
      onClick={onClick}
      className="p-3 mt-3 hover:bg-slate-500 text-center bg-slate-900 text-white font-bold rounded-md"
    >
      SUBMIT
    </div>
  </div>
);

const Guess = () => {
  const [value, setValue] = useState(0);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter);
  const state = useSelector((state) => state.state);

  console.log(state);

  const onClick = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    if (value > 0) {
      const signature = await transferSOL(
        value,
        publicKey,
        sendTransaction,
        connection,
        treasureSecret
      );
      alert(`Your transaction hash is ${signature}`);

      // change the state
      await dispatch({ type: "INCREMENT" });
      await dispatch({ type: "SET_SOL", payload: value });
    }
  };

  if (count === 1) {
    // console.log("state is 1");
    return <RatioFix />;
  } else if (count === 2) {
    // console.log("2");
    return <GuessScreen />;
  }

  return <Staker onClick={onClick} value={value} setValue={setValue} />;
};

export default Guess;
