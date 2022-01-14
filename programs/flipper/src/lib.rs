use anchor_lang::prelude::*;

declare_id!("2q7fhNtQDSc4PkEwT8MU2L1GTLSWL3hLPx25ivrxcwPv");

#[program]
pub mod flipper {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let dataAccount = &mut ctx.accounts.dataAccount;
        dataAccount.result = true;
        Ok(())
    }

    pub fn flip(ctx: Context<Flip>) -> ProgramResult {
        let dataAccount = &mut ctx.accounts.dataAccount;
        if dataAccount.result {
            dataAccount.result = false
        } else {
            dataAccount.result = true
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub dataAccount: Account<'info, DataAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Flip<'info> {
    #[account(mut)]
    pub dataAccount: Account<'info, DataAccount>,
}

#[account]
pub struct DataAccount {
    pub result: bool,
}
