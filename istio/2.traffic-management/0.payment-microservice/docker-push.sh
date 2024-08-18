docker login
docker image build -t ivplay4689/payment-microservice-nodejs .
docker push ivplay4689/payment-microservice-nodejs

kubectl rollout restart deployment payment-microservice-v1 payment-microservice-v2 -n istio-demo 
# Handy! Disable if not needed!