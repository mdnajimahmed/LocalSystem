# Help release workflow ( What happens when we do helm install)
- 1. Load the chart and its dependencies(download the artifact locally)
- 2. Parse the values.yaml
- 3. Generate the yaml
- 4. Parse the YAML to kube objects and validate
- 5. Generate YAML and Send to k8s

# Dry run:(helm installation and upgrades)
--dry-run does (1-4) above , but validation still requires k8s cluster, to avoid it use `helm template`
- can be used for install and upgrate - however, upgrade witll only generate the difference.
- helm template mydb bitnami/mysql --values /Users/mdnajimahmed/Documents/LocalSystem/helm-practice/2.basic/mysql/values-simple.yml 
- Stateful app deployment with helm has lot of gotchas due to pvc. Password during installation can not be changed practically because it is in the pvc, so we need to provide it in each upgrade, otherwise secret will be changed but pvc will be expecting the original password during installation.
- template does not show release note! because it just shows the template resolution values in the yaml, any function that requires to fetch value from the k8s server will be showing default value.
- helm get notes mydb
- helm get values mydb `helm status mydb`
-  helm get values mydb --revision 1
- helm get values mydb --all
- helm get manifest mydb --revision 1

>all         download all information for a named release
>hooks       download all hooks for a named release
>manifest    download the manifest for a named release
>metadata    This command fetches metadata for a given release
>notes       download the notes for a named release
>values      download the values file for a named release

- helm history mydb
- helm install and upgrade has lots of interesting flags e.g
    - --install
    - --create-namespace
    - --wait --timeout 10m20s `without --timeout 10m20s --wait waits 5 mins`
    - --atomic(rollbacks to previous successfull release, --wait is enabled automatically), practially, not a good idea to use it in pipeline.
    - --force ( have downtime, helm will delete the deployment and recreate, hence all pods will be recreated, not for cicd, use only when neccessary, official doc: rforce resource updates through a replacement strategy)
    - cleanup-on-failure : deletes k8s objects in case of failure.(Not friendly option for debugging later!)