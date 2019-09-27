# babel-plugin-transform-define-vars

The plugin allows you to create global constants which can be configured at compile time with Babel.

## Example

```javascript
// Babel config
{
  plugins:[
    ['transform-define-vars', 
      {
        hello:'world'
      }
    ]
  ]
}

// In
var hello = process.env.hello;

var hello2 = process.env['hello'];

if('wordl' === process.env.hello){...}


// Out
var hello = 'world'

var hello2 = 'world'

if(true){...}
```

## Installation

```shell
npm install --save-dev @babel/babel-plugin-transform-define-vars
```

## Usage

```javascript
{
  'plugins': [
    ['transform-define-vars', 
      {
        hello:'world'
      }
    ]
  ]
}
```