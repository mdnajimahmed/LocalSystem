# Theory
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-10.png)
![alt text](image-11.png)
![alt text](image-12.png)
![alt text](image-13.png)
![alt text](image-14.png)
![alt text](image-15.png)

# Sample
```
trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
        connectTimeout: 5s
        tcpKeepalive:
          interval: 30s
          timeout: 10s
        maxConnectionDuration: 1h
        idleTimeout: 10m
      http:
        http1MaxPendingRequests: 10
        http2MaxRequests: 100
        maxRequestsPerConnection: 0  # Unlimited requests per connection
        maxRetries: 3
        idleTimeout: 10m
```

Here tcp settings are used , and https settings are used only to close gap that tcp settings does not offer(not tcp layers concern)
![alt text](image-16.png)
![alt text](image-17.png)
![alt text](image-18.png)
![alt text](image-19.png)

# Moment of truth
- kubectl exec mole-598c649d86-qbdtm  -n istio-demo -c fortio -- /usr/bin/fortio load -c 1 -qps 0 -n 30 -loglevel Warning http://payment-microservice/api/version
```
Code 200 : 30 (100.0 %)
```
- kubectl exec mole-598c649d86-qbdtm  -n istio-demo -c fortio -- /usr/bin/fortio load -c 2 -qps 0 -n 30 -loglevel Warning http://payment-microservice/api/version
```
Code 200 : 11 (36.7 %)
Code 503 : 19 (63.3 %)
```
- kubectl exec mole-598c649d86-qbdtm  -n istio-demo -c fortio -- /usr/bin/fortio load -c 3 -qps 0 -n 30 -loglevel Warning http://payment-microservice/api/version
```
Code 200 : 14 (46.7 %)
Code 503 : 16 (53.3 %)
```

- kubectl exec mole-598c649d86-qbdtm  -n istio-demo -c fortio -- /usr/bin/fortio load -c 4 -qps 0 -n 30 -loglevel Warning http://payment-microservice/api/version
```
Code 200 : 6 (20.0 %)
Code 503 : 24 (80.0 %)
```