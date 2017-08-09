# Jimenez

`jimenez` is a file processor. It takes a *source* directory, processes each file according to specified *rules* using an *environment* object used as context, and outputs the results to an *output* directory, using the same filenames and directory structure.  It can handle multiple files and multiple configurations allowing you to build a set of configuration files for a specific environment.

## Installation

You can install it through yarn:

    yarn global add jimenez

Or NPM:

    npm install jimenez -g

## Jimenezfile.js

Every directory where you intend to run `jimenez` on must contain a javascript file called `Jimenezfile.js` which exports a Configuration Object as a module.

## Commands

### jimenez build <environment>

Processes all the files in the *source* directory, applying the configuration object under the specified `<environment>`, saving the results in the *output* directory.

### jimenez build-all

Processes all the files in the *source* directory, creating a set of resulting files for every environment defined in the configuration object, saving the results in the *output* directory. Each set of files will be saved under a subdirectory named after the corresponding environment.

### jimenez env <environment>

Displays the *environment* data as a JSON object.

## Configuration

### Source Directory

Files in this directory will be used as templates.

CLI Option: `--source-dir` or `-s`. 
Configuration Object property: `sourceDir`.
Default value: `./source`.

### Output Directory

Resulting files will be saved in this directory.

CLI Option: `--output-dir` or `-o`. 
Configuration Object property: `outputDir`.
Default value: `./output`.

### Rules

It's an array of *rules*. Each *rule* is an object with two properties:

- `test`: A regular expression used to match the source filename.
- `processor`: A processor name, or a JS function that takes a file path and returns a string that will be used as the content of the output file.

Configuration Object property: `rules`.
Default value: 

```js
[
    { test: /\.json$/,      processor: 'jsonrefs' },
    { test: /\.xml$/,       processor: 'lodash'   },
    { test: /\.config$/,    processor: 'lodash'   },
    { test: /.*$/,          processor: 'error'    }
]
```

## Processors

`jimenez` includes the following built-in processors:

### jsonrefs

It will replace all the jsonrefs in the source file with the concrete value. The *environment* configuration will be available under the `#/env/` path.

E.g. `#/env/foo` will be replaced with the variable `foo` from the environment.

### lodash

It will use the source file as a [lodash template](https://lodash.com/docs/#template), using the environment object as context.

### ejs

It will use the source file as a [EJS template](http://ejs.co/), using the environment object as context.

### error

Used internally to throw an error.