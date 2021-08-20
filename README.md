# k8_graphql_postgres_boilerplate
NOTE* these commands are runnable on a MAC only. 
Windows machines will need their own scripts

#Run : Node server on local machine
This runs the node server on your local maching. No docker images or minikube
`npm start`

#Run : Minikube
This command builds and sets up everhthing you need to run this app on a minikube k8s environment
- builds docker image to minikube env.
- deploys images to pods on minikube
- deploys services for access to pods
- creates a NODE_PORT service for access in local browser
- opens the webpage for you 