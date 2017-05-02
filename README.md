# Technical Test: Shopping Cart

## Purpose
This is some simple code to demonstrate familiarity with node.js. The main tests and implementation were written within ~2 hours (albeit across several days) as per the requirements. Additional work, such as deploying to heroku, designing and creating the UI etc. were done separately. 
 
## Tasks
 - [x] write basic documentation
 - [x] write unit test cases
 - [x] write implementation
 - [x] deploy server to heroku
 - [x] design item icons for front-end
 - [ ] create user-interface using React


## Dependencies
- node v7.9.0
- yarn v0.23.3

*_NOTE:_ This was developed in MacOS Sierra v10.12.3 using the aforementioned versions. This may be compatible with other versions, but cannot be guaranteed.*


## Getting Started
- clone this repository: `git clone https://github.com/cpoliver/tech-test-shopping-cart.git`
- install the project dependencies: `yarn install`
- run the app for development: `yarn dev` (on-the-fly transpilation with `babel-node`)
- run the unit tests: `yarn test` or `yarn test:watch`
- build the transpiled sources (to `./dist/`): `yarn run build`
- run the built sources `yarn start`


## Heroku endpoints
`GET` [/healthcheck](https://tech-test-shopping-cart.herokuapp.com/healthcheck)

Returns a string if the server is running
   
   
`POST` [/cart](https://tech-test-shopping-cart.herokuapp.com/cart)

   Takes JSON from the request body. Expects an array of items (e.g. `[ 'papaya', 'apple' ]`)
   Returns JSON of the computed line items


## Example request/response

### Request:
**METHOD:** `POST`

**URL:** [https://tech-test-shopping-cart.herokuapp.com/cart](https://tech-test-shopping-cart.herokuapp.com/cart)

**BODY**: `[ "apple", "orange", "garlic", "garlic", "papaya", "papaya", "papaya" ]`


### Response:
```
{
  "lineItems": [
    {
      "id": "apple",
      "count": 1,
      "price": 25,
      "discount": 0,
      "subtotal": 25
    },
    {
      "id": "orange",
      "count": 1,
      "price": 30,
      "discount": 0,
      "subtotal": 30
    },
    {
      "id": "garlic",
      "count": 2,
      "price": 15,
      "discount": 0,
      "subtotal": 30
    },
    {
      "id": "papaya",
      "count": 3,
      "price": 50,
      "discount": 50,
      "subtotal": 1
    }
  ],
  "total": 185
}
```

*_NOTE:_ All prices are represented in pence because JavaScript*

## Notes
There are some things that have not been done as I would like, due to the time contraints. Below are things that I would usually do when working on production code, but decided against in order to write a solid, basic implementation with good test coverage.

 - Add eslint would be part of the project (I used the linter built into Spacemacs)
 - Perform validation on the request to `/cart`, to handle non-array, or arrays containing invalid items.
 - Set up a webpack build process instead of manually running the build script and including the artefacts in the repo
 - Complete UI and be stricter on the code quality with that repo (more below)


## Log Table
When running the node server locally and a response is successfully sent, a table containing the receipt information is logged to to console. An example of this can be found below.

```
┌────────┬───────┬───────┬──────────┬──────────┐
│ ITEM   │ PRICE │ COUNT │ DISCOUNT │ SUBTOTAL │
├────────┼───────┼───────┼──────────┼──────────┤
│ apple  │ £0.25 │ 1     │ -        │ £0.25    │
├────────┼───────┼───────┼──────────┼──────────┤
│ orange │ £0.30 │ 3     │ -        │ £0.90    │
├────────┼───────┼───────┼──────────┼──────────┤
│ garlic │ £0.15 │ 1     │ -        │ £0.15    │
├────────┼───────┼───────┼──────────┼──────────┤
│ papaya │ £0.50 │ 1     │ -        │ £0.50    │
├────────┼───────┼───────┼──────────┼──────────┤
│        │       │       │ TOTAL    │ £1.80    │
└────────┴───────┴───────┴──────────┴──────────┘
```

*_NOTE:_ Prices are displayed in decimal as this looks more like a receipt*


## React App
Work started on creating a front-end for this demo using `create-react-app` and Redux. However, this didn't quite get finished and the commits started getting a little sloppy as it soared past midnight!

There is intention to finish this, as I like the design and it's very nearly complete.

Below is a screenshot of the app as it currently stands (`redux` branch). More can be found over in the repo: [tech-test-shopping-cart-ui](https://github.com/cpoliver/tech-test-shopping-cart-ui )

![](http://i.imgur.com/pDvriry.png)

