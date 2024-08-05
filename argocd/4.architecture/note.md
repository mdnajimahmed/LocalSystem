- add repo to argocd
./add-repo abd ~/.netrc file with username and password or 
argocd repo add "https://github.com/mdnajimahmed/LocalSystem.git" --username "mdnajimahmed" --password  ""
- kubectl get secrets -n argocd | grep "repo"
- we could also simple add the ui to add a repository
- kubectl config view
- argocd cluster add --system-namespace argocd gke_cool-furnace-431504-e1_asia-southeast1_gke01  --- <your_k8s_context_name>
- gcloud container clusters describe gke01 --zone asia-southeast1  --project cool-furnace-431504-e1 --format="value(endpoint)" - this command gives the api server url.
- kubectl delete -f nginx-argocd-application.yml


# Project:
A project in argocd is a collection of application.

# Application
In argocd everything starts with an application. An application is a set of instructions that makes argocd understand how to sync the changes between the repositories and k8s cluster.

