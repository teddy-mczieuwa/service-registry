### Basic microservice setup
This is the introduction to setting up a microservice in node.js
  
## Steps
# config.js file
- install bunyan.js
- require bunyan and package.json
- destructure the name and version from package.json
- create a getLogger function, passing in serviceName and serviceVersion and level.  The function uses ```js bunyan.createLogger({`${serverName}:${serverVersion}}, level)```
- export an object which contains 3 states: development, production and test. Each state has: name, version, serviceTimeout and a log method which calls getLogger(name, service, level)
- level could be debug, fatal or info depending on which state. Debug is usually for development, info is usually for production while fatal is usually for tests

# server/service.js
- This is the only file that requires express and invokes it as service ```js const service = express()```
- export a function that takes in config as a parameter. In the function:
- set ```js const log = config.log() ```
- ```js if(service.get('env') === 'development') ```
- use the ```js service.use``` middleware
- ```js log.debug(`${req.method}:${req.url})``` and return next() then close the if statement
- use service again, but this time it takes 'error' as the first parameter
- call ```js res.status(error.status || 500)```
- the rest is to handle the error
- return service

# index.js
This is the entry point
- require http, config, service
- config is an object so the property is obtained as such: ```js require('./config')[process.env.NODE_ENV || 'development'] ```
- pass config into service once it is required.
- pass service into createServer in http server
- ```js const log = config.log()```
- listen on port
- on listening, log (using log.info()) server.address().port and ```js service.get('env')```

### Endpoint Setup
These are the enpoints in which a service uses to register itself. They are setup in the service.js file since they require express ``` put, delete, get``` etc.
They follow the signature: ```serviceroute/:servicename/:serviceversion/:serviceport```
Getting a service does not require the serviceport so it is usually omitted.
