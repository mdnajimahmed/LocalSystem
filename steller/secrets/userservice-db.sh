# Kubernetes admin will execute this command.
kubectl delete secret generic userservice-db 

kubectl create secret generic userservice-db \
--from-literal=DB_HOST=pg-user-postgresql \
--from-literal=DB_PORT=5432 \
--from-literal=DB_USER=postgres \
--from-literal=DB_PASSWORD=postgres \
--from-literal=DB_NAME=postgres


