import chalk from "chalk";
import shell from "shelljs";

export default (config) => {
    console.log(chalk.yellow('--- starting'))
    shell.exec(`
    if npm test; then
     
        echo "
        -----------------------------
        BUILDING DOCKER CONTAINER : ALL TESTS PASS
        -----------------------------
        "
        npm i
        docker build \\
        --build-arg NODE_ENV=${process.env.NODE_ENV} \\
        --file ${config.docker.docker_file_path} \\
        -t ${config.docker.image.name}:${config.docker.image.version} .
        export TEST=true
        
        echo "
        ============= BUILDING IMAGE :  ${config.docker.image.name}:${config.docker.image.version}====================IMAGE NAME===============
        /******
        NOTE: 
        The docker image will be built on your local system under "docker-machine env -u"
        
        ****/
        
        ============= Starting Docker container and opening browser ==============
        "
        
        if ${config.docker.bindmount}; then
        
            echo "
            /**
             * running docker container : NOTE THIS ONLY WORKS FOR MAC>.. Instead of "open" there will be another command for windows.
             * Windows users will have to open it themselves
             */
            "
            docker run -p 3000:3000 -d --name ${config.docker.image.name} -v $PWD:/data/apps/raven-web ${config.docker.image.name}:${config.docker.image.version}
            echo 'sleeping for 5 - waiting to open browser'
         
        else
        
            echo "
             /**
             * running docker container : NOTE THIS ONLY WORKS FOR MAC>.. Instead of "open" there will be another command for windows.
             * Windows users will have to open it themselves
             */
            "
            sleep 5
            docker run -p 3000:3000 -d --name ${config.docker.image.name} ${config.docker.image.name}:${config.docker.image.version}
   
        fi
        
        
        echo 'sleeping for 5 -waiting to open browser'
        sleep 5
        echo 'done sleeping'
        open http://localhost:3000/swagger
        
        
         echo "
        ==================  RUNNING LOGS ========================
        =========================================================
        "
       
        echo 'sleeping for 5 seconds'
        sleep 5
        echo 'done sleeping -- now running docker logs for ${config.docker.image.name}'
        docker logs ${config.docker.image.name}
        export NODE_ENV=local&& node --experimental-modules $PWD/scripts/QA_documentation_scripts/qa_docks_script.mjs
        
     
     else 
        echo "
-----------------------------
STOPPING : FAILED - fix issues and rerun script
-----------------------------
"
     fi
    `)


}