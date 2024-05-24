# LocalSystem
A repository to manage systems running locally for development

# Use env variable
- POSTGRES_DB=quiz_app docker-compose -f docker-compose-postgres-16.yml up


# Update kubectl 
brew upgrade kubectl

# Locally set kube context
mkdir -p ~/.kube
kind get kubeconfig > ~/.kube/config
cat ~/.kube/config
kubectl config set-cluster kind-kind --server=https://54.254.197.51:32809 --insecure-skip-tls-verify=true

# In server
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
# configure ingress rules:
kubectl apply -f 01-ingress-rule.yml
# Provision pods and services to test ingress
kubectl apply -f 02-ingress-test.yml


# Handle ec2:
aws ec2 stop-instances --instance-ids i-0cd44fb7e1fdd3650
aws ec2 start-instances --instance-ids i-0cd44fb7e1fdd3650
