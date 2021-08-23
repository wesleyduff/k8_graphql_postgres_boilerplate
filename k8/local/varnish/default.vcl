# specify which version of varnish vcl you are going to use
vcl 4.0;

# NOT SURE WHAT THIS IS .. lookup
import directors;
import std;



# ---- BACKENDS
backend graphQlApi {
    .host = "graphql-demo-svc.demo-space";
    .port = "8080";
}


# ------ REQUEST
# incoming request
# ======= STEP 1
sub vcl_recv {
    #strip all cookies for testing purposes
    unset req.http.Cookie;
    # remove the x-cache header so we can replace it with our own on the way out on delivery
    unset req.http.x-cache;

    # route traffic from raven.graphql.api to backend system on kubernetes
    # NOT WORKING
     if(req.http.host == "192.168.99.100:30083" ){

        # set backend host
        set req.backend_hint = graphQlApi;

    # ONLY deal w/ GET and HEAD requests.. the rest like POST, PUT, PATCH etc.. just pass through to the backend
    if(req.method != "GET" && req.method != "HEAD") {

        return (pass);

    }

    #remove cookies from requests that do not need them
    # ** you should also remove any cookies that have nothing to do w/ the backend services. that way they do not get cached
    # ** should do the same w/ headers
    #if(req.url ~ "^[^?]*\.(css|gif|gz|ico|jpeg|jpg|js|png|xml)(\?.*)?$"){
    #    unset req.http.Cookie;
    #}

    # Remove any Google Analytics based cookie
    #set req.http.Cookie = regsuball(req.http.Cookie, "__utm.=[^;]+(; )?", "");
    #set req.http.Cookie = regsuball(req.http.Cookie, "_ga=[^;]+(; )?", "");



    # **** Normalize the query arguments *****
    # uncomment below to normalise : ?name=wes&last=duff : ?last=duff&name=wes
    # set req.url = std.querysort(req.url);
    }

}


# NO : cache HIT ... making call to backend services
# ======= STEP 2
sub vcl_backend_fetch{
  # manipulate request as needed here before it goes to the backend
  # security : maybe attach a new header here that is not visible on the broswer (client) side

}





# ------ RESPONSE


# response is coming back from the backend server
# ======= STEP 1
sub vcl_backend_response{
 # manipulate response as needed before it goes to the backend

 # never cache a response when it's a server error or something that is not of the corret http status code range
 # ** using 500 here
 # dont cache 50x responses
 #if(beresp.status == 500 || beresp.status == 502 || beresp.status == 503) {
 #   return (abandon);
 #}

 # Allow stale content, in case the backend goes down.
 # make Varnish keep all objects for 2 hours beyond their TTL : time to live
 #set beresp.grace = 2h;

  # Varnish determined the object was not cacheable
     if (beresp.ttl <= 0s) {
         set beresp.http.X-Cacheable = "NO:Not Cacheable but forcing";
     } elseif (beresp.http.Cache-Control ~ "private") {
         set beresp.http.X-Cacheable = "NO:Cache-Control=private";
     } else {
        set beresp.http.X-Cacheable = "YES";
     }

         set beresp.http.X-WHAT-IS-TTL = beresp.ttl;

}


# response going out to client
# ** This is where varnish chooses to store items in the cache or not
# ======= STEP 2
sub vcl_deliver{
    # change any outgoing headers or response items

    #remove all cookies
    unset resp.http.Cookie;
    # LOGGING : is the cache a hit or miss
    if(obj.hits > 0){
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
    set resp.http.X-Cache-Hits = obj.hits;

}