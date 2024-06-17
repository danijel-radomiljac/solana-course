import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as fs from 'fs';

const CONNECTION = new Connection(clusterApiUrl('devnet'));

async function main() {
  const secret = JSON.parse(
    fs
      .readFileSync('./Dany9vz3TQLPqdJmNQJp7cqnBpJThMSsLwHjVsLovUG8.json')
      .toString()
  ) as number[];
  const secretKey = Uint8Array.from(secret);
  const ownerKeypair = Keypair.fromSecretKey(secretKey);

  const recipient = new PublicKey(
    'aaNEb1p7JR3MG8nwCSvTB6hZdhrchKxPYo22X6BJBUR'
  );

  const transaction = new Transaction();

  const LAMPORTS_TO_SEND = LAMPORTS_PER_SOL * 0.1;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: ownerKeypair.publicKey,
    toPubkey: recipient,
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(CONNECTION, transaction, [
    ownerKeypair,
  ]);

  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${recipient}. `
  );
  console.log(`Transaction signature is ${signature}!`);
}

main();
