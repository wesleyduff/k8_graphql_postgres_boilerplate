import chalk from 'chalk'
import shell from 'shelljs'
import config from '../../config/index.js';

console.log(chalk.green(`==== DEPLOYING APPLICATION : for namespace : ${config.k8.namespace} =====`))

shell.exec(`
    
    kubectl apply -f ${config.k8.deployment.path}

`)