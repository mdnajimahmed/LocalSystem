- brew install kind
- kind create cluster --name helm-cluster `keeping things simple one node`
- kubectl apply -f /Users/mdnajimahmed/Documents/LocalSystem/k8s/kind/03-metrics-server.yml `we need the metric server to test hpa`
- brew install helm
- brew install --cask lens
- not using ingress, testing will be done using nodeport service, port forwarding and a busybox pod inside the cluster
- kind delete cluster --name helm-cluster

# Enable grafana and k8s monitoring
- helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
- helm repo update
- kubectl create ns kube-prometheus-stack
- helm install kube-prometheus-stack --namespace kube-prometheus-stack prometheus-community/kube-prometheus-stack
<!-- - helm install kube-prometheus-stack --namespace kube-prometheus-stack prometheus-community/kube-prometheus-stack -f /Users/mdnajimahmed/Documents/LocalSystem/helm-practice/1.prepk8s/values.yml -->

# Multiple cluster with helm:
Just switch context with kubectl and then apply helm command. Alternatively we can use KUBECONFIG env variable.