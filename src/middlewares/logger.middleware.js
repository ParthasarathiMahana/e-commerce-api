import fs from 'fs'
import winston from 'winston';
const fsPromise = fs.promises;

// async function log(logData){
//     try {
//         logData = `\n ${new Date().toString()+". logData: "+logData}`
//         await fsPromise.appendFile('logs.txt', logData);
//     } catch (error) {
//         console.log(error);
//     }
// }

const logger = winston.createLogger({
    level:'info',
    format: winston.format.json(),
    defaultMeta: {service : "request-logging"},
    transports: [
        new winston.transports.File({filename:'logs.txt'})
    ]
})

async function loggerMiddleware(req, res, next){
    // check the url to avoid logging any sensitive info like user password
    const logData = `${req.url} - ${JSON.stringify(req.body)}`
    // await log(logData);
    logger.info(logData)
    next();
}

export default loggerMiddleware;