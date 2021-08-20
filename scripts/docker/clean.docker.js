import chalk from 'chalk'
import shell from 'shelljs'

console.log(chalk.red('------- Cleaning Docker---------'))

shell.exec(`
    echo "======= ALL CONTAINERS ===== "
    docker ps -a
    
    echo "==============="
    echo "==============="
    
    
    
    echo "cleaning docker"
    
     docker builder prune -f
`)