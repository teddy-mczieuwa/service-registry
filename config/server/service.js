const express = require('express')
const service = express()

module.exports = config => {
    const log = config.log()
    if(service.get('env') === 'development') {
        service.use((req, res, next) => {
            log.debug(`${req.method}:${req.url}`)
            return next()
        })
    }

    service.put('register/:servicename/:serviceversion/:serviceport',(req, res, next) => {
        return next('not implemented')
    })

    service.delete('register/:servicename/:serviceversion/:serviceport',(req, res, next) => {
        return next('not implemented')
    })

    service.find('register/:servicename/:serviceversion',(req, res, next) => {
        return next('not implemented')
    })


    service.use((error, req, res, next) => {
        res.status(error.status || 500)

        log.error(error)
        res.json({
            error: {
                message: error.message
            }
        })
    })

    return service
}