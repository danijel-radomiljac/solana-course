import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
  const connection = new Connection(clusterApiUrl('devnet'));

  return connection.getBalance(address);
}

async function main() {
  const address = new PublicKey('Dany9vz3TQLPqdJmNQJp7cqnBpJThMSsLwHjVsLovUG8');
  const balance = (await getBalanceUsingWeb3(address)) / LAMPORTS_PER_SOL;

  console.log(balance + ' SOL');

  console.log('hello');
}

main();
