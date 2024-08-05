- kubectl create ns argocd
- helm repo add argo https://argoproj.github.io/argo-helm
- helm install argocd -n argocd argo/argo-cd
NAME: argocd
LAST DEPLOYED: Wed Feb 28 07:08:54 2024
NAMESPACE: argocd
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
In order to access the server UI you have the following options:

1. kubectl port-forward service/argocd-server -n argocd 8080:443

    and then open the browser on http://localhost:8080 and accept the certificate

2. enable ingress in the values file `server.ingress.enabled` and either
      - Add the annotation for ssl passthrough: https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-1-ssl-passthrough
      - Set the `configs.params."server.insecure"` in the values file and terminate SSL at your ingress: https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-2-multiple-ingress-objects-and-hosts


After reaching the UI the first time you can login with username: admin and the random password generated during the installation. You can find the password by running:

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

(You should delete the initial secret afterwards as suggested by the Getting Started Guide: https://argo-cd.readthedocs.io/en/stable/getting_started/#4-login-using-the-cli)```
```
- helm status argocd -n argocd
- kubectl port-forward service/argocd-server -n argocd 8080:443 --address="0.0.0.0"
- kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
- helm upgrade argocd -n argocd argo/argo-cd --set configs.params."server\.insecure"=true --set server.ingress.enabled=true --set server.ingress.ingressClassName="nginx"
```
Release "argocd" has been upgraded. Happy Helming!
NAME: argocd
LAST DEPLOYED: Wed Feb 28 16:20:50 2024
NAMESPACE: argocd
STATUS: deployed
REVISION: 2
TEST SUITE: None
NOTES:
In order to access the server UI you have the following options:

1. kubectl port-forward service/argocd-server -n argocd 8080:443

    and then open the browser on http://localhost:8080 and accept the certificate

2. enable ingress in the values file `server.ingress.enabled` and either
      - Add the annotation for ssl passthrough: https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-1-ssl-passthrough
      - Set the `configs.params."server.insecure"` in the values file and terminate SSL at your ingress: https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/#option-2-multiple-ingress-objects-and-hosts


After reaching the UI the first time you can login with username: admin and the random password generated during the installation. You can find the password by running:

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

(You should delete the initial secret afterwards as suggested by the Getting Started Guide: https://argo-cd.readthedocs.io/en/stable/getting_started/#4-login-using-the-cli)
```
- kubectl get ing -o json | jq -r '.items[].spec.rules[].http.paths[]'
- kubectl get ing -n argocd -o json | jq -r '.items[].spec.rules[].http.paths[]'

- ** Kind, Ingres and ArgoCD is dancing as expected! lol. so taking the port forwarding path to continue the lecture. 
- argocd login localhost:8080 --insecure
- argocd account update-password --current-password $(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d) --new-password @rgo@dmin^01
 