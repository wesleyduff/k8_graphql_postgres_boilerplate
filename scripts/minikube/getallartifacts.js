import chalk from 'chalk'
import shell from 'shelljs'
import config from '../../config/index.js';

console.log(chalk.green(`==== REMOING APPLICATION : from namespace : ${config.k8.namespace} =====`))

shell.exec(`
    
    kubectl get all -l app=${k8.app.name} --namespace ${config.k8.namespace}

`)