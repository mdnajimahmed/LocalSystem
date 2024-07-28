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

# **We will learn all these in this session with hands on* # 