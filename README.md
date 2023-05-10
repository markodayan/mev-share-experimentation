# MEV-Share experimentation

Just messing around with the [MEV-Share](https://docs.flashbots.net/flashbots-mev-share/overview) event stream broadcasting data from https://mev-share.flashbots.net.

Currently its just an event-driven service that checks if orders broadcast to MEV-Share are fulfilled, outstanding, or gone stale (stale being equivalent to going longer than 20 blocks without being executed on-chain).

Probably going to use a lot of the stuff here to build out something to serve statistics in a fully deployed web service. Next logical step will be to write some stuff to parse logs for extra context, but with all the event-driven logic done, that should be okay.

---

## New data produced and collected to make use of

- Private mempool growth (`outstanding` parameter).
- Orders 'likely' to never get included (filtered out by `dropped` parameter).
- Fulfilled orders (signed transactions broadcast to FB that eventually end up on-chain)

## Things to maybe do

- Analysis of dropped transactions (transactions not mined within to set tolerance limit - 20 blocks in the config file)
- Effects on rates of change of `fulfilled`, `outstanding`, `dropped` order count during irregular gas spikes.
- Assess how many transactions end up in both public mempool that were also sent to Flashbots.
- Parse successful orders that end up on chain (that were sent to Flashbots) and provide context about what was done on chain

<br>

---

## Settings

### Infura (or whichever provider you want to use)

Just create a `.env` file and add endpoint to `INFURA_URL` as well as the WebSockets endpoint to `INFURA_WS`.

### 20 block limit before flush

- Approx block time = 16 seconds
- 320 seconds tolerance window (before discard) [~5.3 mintues]

> Update the `.env` file param value for `BLOCK_TOLERANCE` if you want to tune when to discard.

<br>

---

## Running

Install dependencies:

```bash
npm install
```

Run with:

```bash
npm run dev
```
