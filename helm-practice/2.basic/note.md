# Benefit of helm
- simple to deploy application, it's like `npm install --save lodash`, no need to worry about transitive dependencies or any config , just use lodash by using `npm install --save lodash`
- Predictable deployment with revisions:
    - Easy to rollback if issue, so upgrade and downgrade makes easy.
    - helm install
    - helm upgrade
    - helm rollback
    - helm uninstall
- Dynamic configuration - values.yml file to enable templating handling multiple environments
- Consitancy: Everything is transparent and consistent, always use help to make change in the cluster.
- Intelligent deployment: manages in which order kubernetes objects should be created
- VVI : Lifecycle hook
    - Enables us to perform task that is not related to kubernetes for example take backup before rooling out a new version of the application.
    - Or, making sure k8s cluster is in a required state before rolling out a deployment.
- Security:
    - Charts can be signed, hashes can be generated and verified.
- We can run test suite to verify deployment!
# **We will learn all these in this session with hands on* # 

# BASIC COMMANDS:

- helm repo list
- `Add a repo : helm repo add <NAME> <URL>` helm repo add bitnami https://charts.bitnami.com/bitnami
- `Remove a repo : helm repo remove <NAME>`helm repo remove bitnami
- `Search in repo:(only latest versions) ` helm search repo mysql 
- `Search in repo:(all versions) ` helm search repo mysql --versions
- <NAME> should be unique in the same kubernetes namespace
- helm list -A 
```
helm list -A
NAME                    NAMESPACE               REVISION        UPDATED                                 STATUS          CHART                               APP VERSION
kube-prometheus-stack   kube-prometheus-stack   1               2024-07-28 15:16:20.041934 +0800 +08    deployed        kube-prometheus-stack-61.4.0        v0.75.2   
```
- helm list -n default
- helm uninstall <NAME> -n <NAMESPACE>
- helm uses kubernetes secrets to keep state!!!
- helm search hub/repo: helm search hub searches the Artifact Hub, which lists helm charts from dozens of different repositories. helm search repo searches the repositories that you have added to your local helm client (with helm repo add ). This search is done over local data, and no public network connection is needed.
-  helm search repo bitnami --versions | grep -E "mysql" `we can also search a specific repo`
```
bitnami/mysql                                   11.1.14         8.4.2           MySQL is a fast, reliable, scalable, and easy t...
bitnami/mysql                                   11.1.13         8.4.2           MySQL is a fast, reliable, scalable, and easy t...
```
- Let's install the second one then upgrade to the first one.
```
helm install mydb bitnami/mysql --values values.yml
helm status mydb
helm upgrade mydb bitnami/mysql --values values.yml
helm upgrade mydb bitnami/mysql --version 11.1.13 --reuse-values ` downgrade from 11.1.14 to  11.1.13`

kubectl get secrets
NAME                              TYPE                 DATA   AGE
kube-prometheus-stack-admission   Opaque               3      28h
mydb-mysql                        Opaque               2      18m
sh.helm.release.v1.mydb.v1        helm.sh/release.v1   1      18m
sh.helm.release.v1.mydb.v2        helm.sh/release.v1   1      85s
sh.helm.release.v1.mydb.v3        helm.sh/release.v1   1      75s

helm delete mydb --keep-history


helm history mydb      
REVISION        UPDATED                         STATUS          CHART           APP VERSION     DESCRIPTION            
1               Mon Jul 29 18:13:07 2024        superseded      mysql-11.1.14   8.4.2           Install complete       
2               Mon Jul 29 18:29:56 2024        superseded      mysql-11.1.13   8.4.2           Upgrade complete       
3               Mon Jul 29 18:30:06 2024        uninstalled     mysql-11.1.13   8.4.2           Uninstallation complete


helm rollback mydb 3

helm uninstall mydb

 In Helm 3, helm delete is an alias for helm uninstall. Both commands perform the same actions.
```

