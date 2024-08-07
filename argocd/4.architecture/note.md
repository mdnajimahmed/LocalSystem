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

# Workflow
- We create a manifest file called argocd that watches a directory called applications. So now any application created in argocd is automatically deployed to the cluster without manually applying kubectl, a proper gitops. 
- We just have to apply argocd yaml once to the cluster to watch the applications directory.

- create a new applications directory and move nginx-argocd-application there.

# Helm deploy:
- has capability to deploy helm char with changed values.yml file. details study needs to be done to explore the options available and how to customise them. 

# Secret management using gitops:


