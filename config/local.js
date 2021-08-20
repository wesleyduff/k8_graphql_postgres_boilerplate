module.exports = {
    name: 'DEMO',
    env: 'local',
    environment: {
        minikube: true,
        local: false
    },
    docker: {
        docker_file_path: './Docker/Dockerfile',
        bindmount: false, //set to true if you want to edit files on local machine and see them change within the docker container
        image: {
            name: 'demoexample1', //must be LOWERCASE
            version: 'v2'
        },
        save: {
            local_machine: false,
            minikube: true
        }
    },
    k8 : {
        app: {
            name: 'cache-demo'
        },
        namespace: 'demo-space',
        deployment : {
            path: './k8/local/deployment.yml'
        }
    },
    mongo: {
        url: "mongodb://host.docker.internal:27017/RavenData",
        options: {}
    },
    endpoints: {
    }
}