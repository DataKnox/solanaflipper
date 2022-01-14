const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe('flipper', () => {

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Flipper;

  it('Creates a Flipper', async () => {

    const baseAccount = anchor.web3.Keypair.generate();
    console.log(baseAccount.publicKey.toBase58())
    await program.rpc.initialize({
      accounts: {
        dataAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    }); //Create RPC Closed
    const account = await program.account.dataAccount.fetch(baseAccount.publicKey);
    console.log('Flip 1: ', account.result)
    assert.ok(account.result);
    _baseAccount = baseAccount;
  });// Create flipper test closed
  it("Flip it", async () => {
    const baseAccount = _baseAccount;

    await program.rpc.flip({
      accounts: {
        dataAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.dataAccount.fetch(baseAccount.publicKey);
    console.log('Flip 2: ', account.result)
    assert.ok(account.result == false);
  });// close flip
});//describe fn close
