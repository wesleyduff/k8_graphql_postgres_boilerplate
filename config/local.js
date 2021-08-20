module.exports = {
    name: 'DEMO',
    env: 'local',
    environment: {
        minikube: true,
        local: true
    },
    docker: {
        docker_file_path: './Docker/docker_files/Dockerfile',
        bindmount: false, //set to true if you want to edit files on local machine and see them change within the docker container
        image: {
            name: 'demoExample1', //must be LOWERCASE
            version: 'v1'
        },
        save: {
            local_machine: false,
            minikube: true
        }
    },
    mongo: {
        url: "mongodb://host.docker.internal:27017/RavenData",
        options: {}
    },
    endpoints: {
    }
}