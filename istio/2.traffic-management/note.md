- get the external ip of the lb 
- kubectl get svc -n istio-system or better kubectl get svc istio-ingressgateway  -n istio-system
- note the external ip
- kubectl get svc istio-ingressgateway  -n istio-system -o jsonpath='{}'   `Get the full json`
- use chrome devtool to find the ip , ctrl + F -> paste external ip, then right click and use copy property path `status.loadBalancer.ingress[0].ip`
- kubectl get svc istio-ingressgateway  -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 
- Deploy the payment service with argocd
- kubectl get svc istio-ingressgateway  -n istio-system -o jsonpath='{.status.loadBalancer.ingress[0].ip}'
- curl -H "Host: payment-service.cloud" 34.87.168.112
- kubectl apply -f /Users/mdnajimahmed/Documents/LocalSystem/istio/2.traffic-management/debug.yml
- kubectl exec -it busybox -- /bin/sh
- add `34.87.168.112 payment-service.cloud` to /etc/hosts file and hit payment-service.cloud few times to see it returns both blue and green!


# Path based routing
- curl payment-service.cloud/api/version `along with the host entry in the test machine`
- curl payment-service.cloud/api/v1/version
- curl payment-service.cloud/api/v2/version

# Header based routing
- Chrome users should see the blue site whereas other users should see the green site
- A list does OR, same element does AND.
- Hit http://payment-service.cloud/index.html from chrome you should see blue ( given the host entry is done in your local)
- Hit http://payment-service.cloud/index.html from any other browser you should see green
- Reality!
Edge!
    ![alt text](image.png)
Chrome
    ![alt text](image-1.png)
Firefox
    ![alt text](image-2.png)
Safari
    ![alt text](image-3.png)
- We can also use cookie header to do intelligent routing e.g AB teting