# MEAN-Bootstrap

## Environment requirements
Node, MongoDB, Bower

## Development
1. run `npm i`
2. run `bower i`
3. Start up a local instance of mongo
4. Rename env-sample.json to env-dev.json and add the path to your local mongo instance
5. run `grunt dev`

## Versioning

To update the app version

1. From the root, run `./bin/version "<next version id">`
2. This means that `./bin/version "1.0.1"` would bump the version up to 1.0.1. This then committed and ready to push.