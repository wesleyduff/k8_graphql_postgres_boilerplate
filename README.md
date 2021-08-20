# k8_graphql_postgres_boilerplate
NOTE* these commands are runnable on a MAC only. 
Windows machines will need their own scripts

#Run : Node server on local machine
This runs the node server on your local maching. No docker images or minikube
`npm start`

# Run Minikube
1. start VirtualBox app but not minikube instance
2. open terminal : run `minikube start`
3. in terminal run : `minikube dashboard --url` : this gives you the url copy and past it in your browser to see the k8s GUI
4. run npm script : `npm run local` //change to `npm run build-docker-image`
5. run npm script : `npm run minikube-deploy`
6. run npm script : `npm run minikube-endpoint-graphql' // give you the URL for your working graphQL app. Copy and past in browser.

NOTE * update config : local : to change anything you need for these scripts to run. They will run as is,but if you make changes, validate the changes are mirroed as needed in the config 

# Tear Down Minikube
1. run script : `npm run minikube-teardown` // this removes everything under our namespace for our app and nothing else
2. in terminal run : `minikube stop`
3. close virtual box
