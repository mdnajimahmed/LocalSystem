# Architecture:
- Argo CD API Server: Manages the argocd api, provides user interface and manages user authentication
- Repository server: communicates with git repo, fetch them , cache them.
- Application Controller: Monitors actual state of the application in k8s cluster and desired state defined it git, and if needed does the synchornization.
- Redis: 
- Prometheus + Grafana: 
- CLI: Create,Update, Delete application using CLI.