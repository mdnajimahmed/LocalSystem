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



# Create Kubernetes user
- docker run -v /Users/najim/Documents/work/github/LocalSystem/user-k8s/certs:/home/certs -it --entrypoint=/bin/bash ivplay4689/kubectl:29June2024
- cd /home/certs
- openssl genrsa -out shuchi.key 2048
- openssl req -new -key shuchi.key -subj "/CN=shuchi/O=pod-readers" -out shuchi.csr
- kubectl get csr
- kubectl certificate approve shuchi
- kubectl get csr shuchi -o yaml `copy status.certificate`
- echo "ctrl + v" | base64 --decode `just to verify, base64 encoded one will be passed to the user to update kubeconfig client-certificate-data field under user`
- cat certs/shuchi.key| base64 `update client-key-data field in the user`


# Handle docker login
- cat ~/.docker/config.json                       
{
        "auths": {
                "123456789.dkr.ecr.ap-southeast-1.amazonaws.com": {},
                "https://index.docker.io/v1/": {}
        },
        "credsStore": "desktop",
        "currentContext": "desktop-linux"
}%                                                                               
- docker logout 123456789.dkr.ecr.ap-southeast-1.amazonaws.com