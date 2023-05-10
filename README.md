# MEV-Share experimentation

Just messing around with the [MEV-Share](https://docs.flashbots.net/flashbots-mev-share/overview) event stream broadcasting data from https://mev-share.flashbots.net.

Currently its just an event-driven service that checks if orders broadcast to MEV-Share are fulfilled, outstanding, or gone stale (stale being equivalent to going longer than 20 blocks without being executed on-chain).
