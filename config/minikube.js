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
            version: 'v8'
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
        },
        varnish: {
            deployment: {
                path: './k8/local/varnish.deployment.yaml'
            }
        }
    },
    postgres: {
        url: process.env.ENVIRONMENT==="minikube" ? 'postgresql.demo-space.svc.cluster.local' : '127.0.0.1',
    },
    endpoints: {
    }
}