import {
  Keypair,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";

export const treasureSecret = [
  121, 7, 197, 196, 44, 194, 149, 165, 207, 111, 8, 23, 169, 160, 38, 37, 155,
  220, 226, 163, 76, 183, 59, 82, 91, 162, 76, 2, 242, 21, 148, 210, 190, 121,
  108, 63, 214, 144, 4, 33, 216, 22, 57, 74, 54, 157, 237, 123, 223, 213, 86,
  15, 253, 212, 240, 228, 107, 140, 0, 153, 10, 144, 142, 40,
];

export const transferSOL = async (
  value,
  publicKey,
  sendTransaction,
  connection,
  treasureSecret
) => {
  const treasureWallet = Keypair.fromSecretKey(Uint8Array.from(treasureSecret));

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: treasureWallet.publicKey,
      lamports: value * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendTransaction(transaction, connection);

  await connection.confirmTransaction(signature, "processed");

  return signature;
};

export const airdropSOL = async (transferAmount) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const treasureWallet = Keypair.fromSecretKey(Uint8Array.from(treasureSecret));
  const airDropRequest = await connection.requestAirdrop(
    new PublicKey(treasureWallet.publicKey.toString()),
    transferAmount * LAMPORTS_PER_SOL
  );

  await connection.confirmTransaction(airDropRequest);
  return airDropRequest;
};

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
