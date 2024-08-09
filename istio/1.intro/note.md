# Course outline:
- Traffic management
- Service resilience
- Chaos Testing
- Securing the mesh
- Diagnosability

# Architecture:
![alt text](image.png)
![alt text](image-2.png)
- Summary: Traffic enters into the mesh via Ingress Gateway, leaves mesh via Egress Gateway(to talk to external components)
- Envoy on steroid.
## Traffic routing components:
![alt text](image-4.png)
![alt text](image-3.png)
![alt text](image-5.png)

## Installation:
- kubectl cluster-info
- kubectl get crd | grep 'istio.io' | wc -l

# Test:
- kubectl create ns istio-demo
- kubectl label ns istio-demo istio-injection=enabled --overwrite
- deploy the app using argocd
- kubectl get svc -n istio-system
- curl -H "Host: nginx-app.demo" 34.143.188.232