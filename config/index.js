let config = null;
switch (process.env.ENVIRONMENT || 'test') {
    case 'local': {
        const local = require('./local.js')
        config = local;
        break;
    }
    case 'CI_CD': {
        const local = require('./cicd_test.js')
        config = local;
        break;
    }
    case'test': {
        const start = require('./test.js')
        config = start;
        break;
    }
    case 'dev': {
        const dev = require('./dev.js')
        config = dev;
        break;
    }
    case 'qa': {
        const qa = require('./qa.js')
        config = qa;
        break;
    }
    case 'uat': {
        const uat = require('./uat.js')
        config = uat;
        break;
    }
    case 'rc': {
        const rc = require('./rc.js')
        config = rc;
        break;
    }
    case 'prod': {
        const prod = require('./prod.js')
        config = prod;
        break;
    }
    default: {
        throw new Error(`Environment provided does not match : env = ${process.env.ENVIRONMENT}`);
    }
}

module.exports = config;
