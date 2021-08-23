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
**!IMPORTANT**
- when code changes happen : update the version in the config for local / or minikube config
  - docker.image.version
- You will also have to update the version in the k8 deploy yaml
  - ./k8/local/deployment.yml
    - under *containers* for the *kind:deployment* segment

# Tear Down Minikube
1. run script : `npm run minikube-teardown` // this removes everything under our namespace for our app and nothing else
2. in terminal run : `minikube stop`
3. close virtual box


#Turn on tiller on minikube 
- run : `minikube addons enable helm-tiller`
- validate its working : `kubectl get po --namespace kube-system`

# Turn on ingress for minikube
- run : `minikube addons enable ingress`
- Verify that the NGINX Ingress controller is running : `kubectl get pods -n kube-system`
  - look for : similar to this : `nginx-ingress-controller-5984b97644-rnkrg   1/1       Running   0          1m`

#POSTGRES
- add charts `helm repo add bitnami https://charts.bitnami.com/bitnami`
- run command to install postgres `helm install stable/postgresql --namespace demo-space`

----

# CURL commands
You MUST be on the network to have weather work, others will work without being on the network
- run app

### Weather Daily w/ day of week w/ moonPhase for that day
query{getWeatherDaily(zoneID:"54e4ffc9ceafc43649b4dae9",zipcode:"80104"){status,days{dayOfWeek,moonPhase}}}
---
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30080/   --data '{"query":"{ getWeatherDaily(zoneID: \"54e4ffc9ceafc43649b4dae9\", zipcode: \"80104\") { status, days { dayOfWeek, moonPhase } }}"}'

GET
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30080/graphql?query=query%7BgetWeatherDaily%28zoneID:%2254e4ffc9ceafc43649b4dae9%22,zipcode:%2280104%22%29%7Bstatus,days%7BdayOfWeek,moonPhase%7D%7D%7D

### users
query{getUsers{id,email}}
----
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30080/   --data '{"query":"{ getUsers { id,email }}"}'

GET
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30080/graphql?query=query%7BgetUsers%7Bid%7D%7D


### StarWars Person
query{getStarWarsPerson(id:1){name}}
----
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30083/   --data '{"query":"{ getStarWarsPerson(id:1) { name }}"}'

GET
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30083/graphql?query=query%7BgetStarWarsPerson%28id:1%29%7Bname%7D%7D



### StarWars Planet : CUSTOM ERROR
query{getStarWarsPlanet(id:1){name}}
----
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30080/   --data '{"query":"{ getStarWarsPlanet(id:1) { name }}"}'

GET
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30080/graphql?query=query%7BgetStarWarsPlanet%28id:1%29%7Bname%7D%7D


### Session :
query{sessions{name}}
----
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30080/   --data '{"query":"{ sessions{ title }}"}'

GET : // these can be cached
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30080/graphql?query=query%7Bsessions%7Btitle%7D%7D

### Session + StarWars Person
query{sessions{title},getStarWarsPerson(id:1){name}}
---
POST
curl --request POST   --header 'content-type: application/json'   --url http://192.168.99.100:30080/   --data '{"query":"{ sessions{ title },getStarWarsPerson(id:1) { name }}"}'

GET : // these can be cached
curl --request GET   --header 'content-type: application/json'   --url http://192.168.99.100:30080/graphql?query=query%7Bsessions%7Btitle%7D,getStarWarsPerson%28id:1%29%7Bname%7D%7D



### Helper Methods: 

*encode request for get*
```javascript
//encodeURI and encodeURIComponent do not encode encode parenthesis 
let graphQlQuery = 'query{sessions{title},getStarWarsPerson(id:1){name}}'
let queryStringForGetRequest = encodeURI(graphQlQuery).replace('(', "%28").replace(')', "%29")
```
---
# VARNISH SETUP:
Deployment located : `./k8/local/varnish.deployment.yaml`

Based off of : [blog post](https://kruyt.org/varnish-kuberenets/)

Steps : 
1. run : `kubectl create secret generic varnish-secret --namespace demo-space --from-literal=secret=$(head -c32 /dev/urandom  | base64)`
2. edit deafult.vcl : found here : `./k8/local/varnish/default.vcl`
3. cd into the varnish folder and run : `kubectl create configmap varnish-vcl --namespace demo-space --from-file=default.vcl`
4. close terminal, so we do not use it by accident



## configuration
- request : raven.graphql.api
- routes to (k8s - minikube) : http://192.168.99.100:30080/

# Run studio for graphql 
We need an https endpoint to connect to in order to use apollo graphql.

ngrok is a good solution for POC

## use ingrok
1. install ingrok : run `npm i -g ngrok`
2. run `ngrok http 192.168.99.100:30080`

This gives you an https endpoint. Use that in the settings pannel on studio to change the url of where to load your graphQL apollo server.

# Example of Automated Persisted Query
[docs](https://www.apollographql.com/docs/apollo-server/performance/apq/#cache-configuration)
```javascript
 async () => {
        const endpointbase = "http://192.168.99.100:30083";
        const query = 'query{getUsers{id,email}}';
        const hash = await encrypt(query);
        const persistedUrl = `${endpointbase}/graphql/?extensions={"persistedQuery":{"version":1,"sha256Hash":"${hash}"}}`;
        const setPersistUrl = `${endpointbase}/graphql/?query=${query}&extensions={"persistedQuery":{"version":1,"sha256Hash":"${hash}"}}`;
        return new Promise((resolve, reject) => {
            request({
               url: persistedUrl
            }, (error, response, body) => {
                if(error){
                    console.log(`error : ${util.inspect(error)}`)
                }

                const cacheHit = response.headers['x-cache'] === 'HIT' ? 'YES:CACHE' : 'NO:CACHE';
                const _body = JSON.parse(body);

                if(_body.errors && Array.isArray(_body.errors) && _body.errors.length > 0 && _body.errors[0].extensions.code === "PERSISTED_QUERY_NOT_FOUND"){
                    console.log('try again')
                        request({
                            url: setPersistUrl
                        }, (error, response, body) => {
                            if(error){
                                console.log(`error : ${util.inspect(error)}`)
                            }

                            const _body = JSON.parse(body);
                           return resolve({data: _body.data.getUsers, fromCache: cacheHit})
                        });
                } else {

                    return resolve({data: _body.data.getUsers, fromCache: cacheHit})
                }



            })
        })
    }
```