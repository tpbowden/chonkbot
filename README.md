# chonkbot

How chonky are your pull requests?

## Setup

```sh
# Install dependencies
yarn install

# Run typescript
yarn build

# Run the bot
yarn start
```

## How is chonkyness calculated?

The formula is: `c = xy/10`

where:

`c` = chonkiness
`x` = the sum of additions and deletions
`y` = the number of files changed

This is visually represented by the 'chonk landscape' below:

![chonk landscape](https://github.com/tpbowden/chonkbot/chonk-landscape.png)

## What is a chonk?

![chonk chart](https://github.com/tpbowden/chonkbot/chonk-chart.png)
