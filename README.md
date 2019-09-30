# Webcomponents starter

Demo app for developing SPAs based on Web Components. 
Just for demo purposes, no production ready code. 

## Installation

Checkout repo, then in folder open two terminals.


First terminal:
``` 
npm install 
npm run serve
```

Second terminal:
``` 
npm run serve:api
```

Visit http://localhost:4200/. 

The command on the second terminal serves a simple mocked REST-API for the frontend based on https://github.com/typicode/json-server. 

## Production build

``` 
npm run build
npm run serve:prod
```

To show bundle info:

``` 
npm run stats
```

## Generate API Doc

``` 
npm run docs
start docs/index.html
```


## Run existing unit tests

``` 
npm run test
```

Code coverage data is generated in folder *coverage* - and yes, coverage is bad currently ;)
