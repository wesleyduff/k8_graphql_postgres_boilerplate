import chalk from 'chalk'
import shell from 'shelljs'
import config from '../../config/index.js';

console.log(chalk.green(`==== DEPLOYING APPLICATION : for namespace : ${config.k8.namespace} =====`))

shell.exec(`
    
    kubectl apply -f ${config.k8.deployment.path}
    
    

`)



if(process.env.POSTGRES_INSTALL === "true"){
    console.log(chalk.red("========== POSTGRES INSTALL ==============="))
    console.log(chalk.red("COPY THIS !!! .. important to save this info"))
    shell.exec(`
helm install postgresql --version 8.7.3 \\
    --set postgresqlUsername=postgres \\
    --set postgresqlPassword=postgres \\
    bitnami/postgresql \\
    --namespace demo-space
    
 
`)
}

if(process.env.VARNISH_INSTALL==="true"){
    console.log(chalk.red("========== VARNISH INSTALL ==============="))
    shell.exec(`
    
    kubectl apply -f ${config.k8.varnish.deployment.path}
    
    `)
}