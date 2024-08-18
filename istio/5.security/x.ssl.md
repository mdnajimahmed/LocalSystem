Steps to Enable SSL Termination with Istio Ingress Gateway
Create a TLS Secret:

First, you need to create a Kubernetes secret to store your TLS certificate and private key. This secret will be used by the Istio Ingress Gateway.
bash
Copy code
kubectl create -n istio-system secret tls tls-secret \
  --key <path-to-your-private-key>.key \
  --cert <path-to-your-certificate>.crt
Replace <path-to-your-private-key>.key and <path-to-your-certificate>.crt with the paths to your actual private key and certificate files.

Create a Gateway Resource:

Define a Gateway resource that specifies the domain and the ports on which the Istio Ingress Gateway should listen. The tls section in the Gateway resource will reference the TLS secret created in the previous step.
yaml
Copy code
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: my-gateway
spec:
  selector:
    istio: ingressgateway  # Use Istio's default ingress gateway
  servers:
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: tls-secret  # Refer to the TLS secret
    hosts:
    - "example.com"  # Replace with your actual domain
Create a VirtualService:

Define a VirtualService resource to route the traffic from the Gateway to the appropriate service within your cluster.
yaml
Copy code
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-service
spec:
  hosts:
  - "example.com"  # Same as in the Gateway
  gateways:
  - my-gateway
  http:
  - match:
    - uri:
        prefix: /
    route:
    - destination:
        host: my-service  # Replace with your service name
        port:
          number: 80
Apply the Configurations:

Apply the Gateway and VirtualService configurations to your cluster.
bash
Copy code
kubectl apply -f gateway.yaml
kubectl apply -f virtualservice.yaml
