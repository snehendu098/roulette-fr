import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  airdropSOL,
  randomNumber,
  transferSOL,
  treasureSecret,
} from "../../helper";

const number = randomNumber(1, 5);

const GuessScreen = () => {
  const state = useSelector((e) => e.state);
  const [value, setValue] = useState(0);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const dispatch = useDispatch();
  console.log("actual", number);

  const handleClick = async () => {
    if (value > 5) return alert("Guess Between 0 and 5");
    dispatch({ type: "SET_GUESS", payload: value });
    const SOL = parseFloat(state.SOL);
    const RATIO = parseFloat(state.RATIO);
    await airdropSOL(SOL * RATIO);

    if (value == number) {
      console.log(state);
      const signature = await transferSOL(
        value,
        publicKey,
        sendTransaction,
        connection,
        treasureSecret
      );
      alert(`Your transaction hash is ${signature}`);
    } else {
      alert("See You Soon");
    }
    // dispatch({ type: "REVERT" });
  };

  return (
    <div className="min-w-[70vw] p-10 flex flex-col items-center">
      <input
        type={`text`}
        placeholder="Enter Guess"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-center bg-transparent text-5xl w-full outline-none"
      />

      <div
        onClick={handleClick}
        className="bg-slate-900 rounded-lg w-full mt-5 p-3 text-xl text-white text-center"
      >
        Proceed
      </div>
    </div>
  );
};

export default GuessScreen;
