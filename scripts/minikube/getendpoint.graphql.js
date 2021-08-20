import chalk from 'chalk'
import shell from 'shelljs'
import config from '../../config/index.js';


shell.exec(`
    minikube service list --namespace ${config.k8.namespace}
`)