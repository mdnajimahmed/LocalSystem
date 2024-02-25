# Basic commands - 
- helm repo list
- heml repo add bitnami https://charts.bitnami.com/bitnami
- helm search repo apache
- helm search repo apache --versions
- helm repo remove bitnami

- helm install NAME_OF_INSTALLATION_UNIQUE_IN_NAMESPACE REPONAME/CHARTNAME
- e.g helm install myfirstmysqldb bitnami/mysql
- helm install --namespace MY_NAMESPACE myfirstmysqldb bitnami/mysql 

- helm install A_NAME . 
- helm lint 
- helm template . - also works like helm install NAME,NAMESPACE,VALUE everything, if there is a function that fetch value from k8 cluster, they will be replaced with default value since the template command does to use any live cluster.
- --dry-run flag also used for debugging but debug helm output not k8s exactly! works for install and upgrade.  Also, we need the actual k8 cluster connection available to make it work. Hence the alternative `helm template`. 
- helm install --dry-run my-release my-chart. - VVI
- helm template . | kubectl apply -f - 
- ** helm status - vvi : see the message post helm install
- helm upgrade NAME_OF_INSTALLATION_UNIQUE_IN_NAMESPACE --values /PATH_TO_VALUES_FILE

- helm uninstall NAME_OF_INSTALLATION_UNIQUE_IN_NAMESPACE

# Gotcha:
- during install if use --values or --set , then during upgrade always we need to pass --values otherwise  it will use default configuration
- othwerwise add --reuse-values flag

# Release records:
- every time we do helm upgrade it creates a secret with release record. uninstall also delete these secrets, but we can retain them using --keep-history.
- helm history pg-order

# Helm workflow 
- load chart and all it's dependencies
- parse the values.yaml
- generate the yaml
- parse the generated yaml and generate kube objects
- send final yaml to api server

# Help GET
- helm get notes NAME_OF_INSTALLATION
- helm get notes pg-order
- helm get manifest pg-order --revision 10
- helm get values pg-order --revision 1
- helm get values pg-order --revision 1 --all

# Practical 01:
playing with history version and rollback
- helm install pg-order bitnami/postgresql --set auth.postgresPassword=postgres,volumePermissions.enabled=true
- helm upgrade pg-order bitnami/postgresql --set volumePermissions.enabled=najim
- experiment stops because when upgrade fails it does not create new revision!

# Namespace
-- create-namespace `either create the namespace first or use this command`

# Upgrade/Install
- vvi helm upgrade --install mywebserver bitnami/apache

- --generate-name `charname + random number` - default
- --generate name --name-template "mywebserver-{{randAlpha 7 | lower}}" - kubernetes is not a fan of uppercase.

# Wait until the resources are created properly 
- helm install NAME_OF_INSTALLATION_UNIQUE_IN_NAMESPACE REPONAME/CHARTNAME --wait --timeout 5m10s `services,deployments created, pods are running,default 5 minutes`
- --atomic --timeout 5m10s `will auto rollback to previous stabe version, atomic will by default use --wait`
- by default k8s will not restart the pods that has no change, we can override this behavior using --force flag ( downtime ) - not for cicd pipeline
- --cleanup-on-failure cleans everything in case of failure. - not meant for cicd, if everything is cleaned up then we wont be able to debug , so use with caution.
- kubectl --namespace default port-forward $POD_NAME 8080:$CONTAINER_PORT

- `- removes whitespace, if before then removes leading space, else remove trailing space `

- helm get manifest - `diff check between cluster version of yaml and helm version of yaml`