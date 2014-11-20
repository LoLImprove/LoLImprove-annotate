LoLImprove-annotate needs your project to provide the following libraries:

Bower-fetchable:
- Bootstrap


## Bootstrap

- `$ npm install` to install dependencies
- `$ cd sample-app`
- `$ bower install`

For the sample app to work you need to bower link the LoLImprove-annotate module.

```
$ grunt dist
$ cd dist/
$ bower link
$ cd ../sample-app/
$ bower link dist
```
