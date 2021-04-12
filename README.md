# chonkbot

How chonky are your pull requests?

## Installation

Chonkbot can be installed in one of two ways, a GitHub Action or a GitHub App.

- To install it as an Action, add the following step to your workflow and ensure it is only triggered for `pull_request` events:

```
     - uses: tpbowden/chonkbot@v1
       with:
         token: ${{ secrets.GITHUB_TOKEN }}
```

- To install it as an App, visit https://github.com/apps/chonkbot

## How is chonkyness calculated?

The formula is: `c = xy/10`

where:

`c` = chonkyness

`x` = the sum of additions and deletions

`y` = the number of files changed

This is visually represented by the 'chonk landscape' below:

![chonk landscape](chonk-landscape.png)

## What is a chonk?

![chonk chart](chonk-chart.jpg)
