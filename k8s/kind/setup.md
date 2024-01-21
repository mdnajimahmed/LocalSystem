brew install kind
kind create cluster --config 00-kind-cluster-config.yaml
# install nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
# configure ingress rules:
kubectl apply -f 01-ingress-rule.yml
# Provision pods and services to test ingress
kubectl apply -f 02-ingress-test.yml


Verify
# should output "foo-app"
curl localhost/foo/hostname
# should output "bar-app"
curl localhost/bar/hostname

