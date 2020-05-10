const bunyan = require('bunyan')
const pjs = require('../package.json')

const {name, version} = pjs

const getLogger = (sericeName, serviceVersion, level) => bunyan.createLogger({
    name: `${sericeName}:${serviceVersion}`, level
})

module.exports = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log() {
            return getLogger(name, version, 'debug')
        }
    },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log() {
            return getLogger(name, version, 'info')
        }
    },
    test: {
        name,
        version,
        serviceTimeout: 30,
        log() {
            return getLogger(name, version, 'fatal')
        }
    }
}