- kubectl create ns argocd
- helm repo add argo https://argoproj.github.io/argo-helm
- helm install argocd -n argocd argo/argo-cd -f argocd-values.yml `to save cost of gke autopilot`
- kubectl port-forward service/argocd-server -n argocd 8080:443 `the pod must be in running state`
- After reaching the UI the first time you can login with username: admin and the random password generated during the installation. You can find the password by running:

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
- brew install argocd
- argocd login localhost:8080 --insecure
- argocd account update-password --current-password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d) --new-password @rgo@dmin^01
- https://github.com/GoogleCloudPlatform/community/blob/master/archived/nginx-ingress-gke/index.md `setup nginx ingress to gke`
