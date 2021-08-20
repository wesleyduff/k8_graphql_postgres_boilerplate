import chalk from "chalk";
import shell from "shelljs";

export default (config) => {
    console.log(chalk.yellow('--- starting'))

    if(config.docker.save.minikube){
        shell.exec(`
        
            echo "
            ========== SETTING DOCKER ENVIRONMENT to Minikube ==============
            "
            
            eval $(minikube docker-env)
            
            echo "
            -----------------------------
            BUILDING DOCKER CONTAINER
            -----------------------------
            "
            docker build \\
            --build-arg NODE_ENV=${process.env.NODE_ENV} \\
            --build-arg ENVIRONMENT=${process.env.ENVIRONMENT} \\
            --file ${config.docker.docker_file_path} \\
            -t ${config.docker.image.name}:${config.docker.image.version} .
            
            
            echo "
            ============= DOCKER IMAGE :  ${config.docker.image.name}:${config.docker.image.version}====================IMAGE NAME===============
            /******
            NOTE: 
            The docker image will be built on your local system under "minikube docker-env"
            
            ****/
            "
            
            
        `)
    } else { //local docker run

        /**
         * making sure we are on our local docker environment
         */
        shell.exec(`
        
            
            echo "
            -----------------------------
            BUILDING DOCKER CONTAINER :
            -----------------------------
            "
            docker build \\
            --build-arg NODE_ENV=${process.env.NODE_ENV} \\
            --build-arg ENVIRONMENT=${process.env.ENVIRONMENT} \\
            --file ${config.docker.docker_file_path} \\
            -t ${config.docker.image.name}:${config.docker.image.version} .
            
            
            echo "
            ============= DOCKER IMAGE :  ${config.docker.image.name}:${config.docker.image.version}====================IMAGE NAME===============
            /******
            NOTE: 
            The docker image will be built on your local system under "docker-machine env -u"
            
            ****/
            
            
        `)

    }


}