import chalk from 'chalk'
import shell from 'shelljs'
import config from '../../config/index.js';

console.log(chalk.green(`==== DEPLOYING APPLICATION : for namespace : ${config.k8.namespace} =====`))

shell.exec(`
    
    kubectl apply -f ${config.k8.deployment.path}
    
    echo "======= INSTALLING POSTGRESS ======"
    

`)

console.log(chalk.red("COPY THIS !!! .. important to save this info"))

shell.exec(`
    helm install postgres bitnami/postgresql --namespace demo-space
`)