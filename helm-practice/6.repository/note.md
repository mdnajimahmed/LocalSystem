- repository is a simple webserver that has 
    - a index.yml file
    - can download static files
- hence we can use s3 or any kind of static web server.
- helm repo index . (dot is the folder where index.yml and packaged charts are kept)
- helm repo update, downloads the index.yml file for all repos, and helm search only run the search based on the cached index.yml, hence every time there is a change in the repo(index.yml file), we have to update our local cache by running helm repo update.

- Using github page as private helm repo:(Upgrade or make this repository public to enable Pages!)
- set up github cred
```
cat <<EOF > ~/.netrc
machine github.com
login mdnajimahmed
password <THE_PAT_TOKEN>
EOF
```
- helm package . -d /Users/mdnajimahmed/Documents/personal-work/internal-helm-repo
- cd /Users/mdnajimahmed/Documents/personal-work/internal-helm-repo
- helm repo index .
- helm repo add ecommerce https://mdnajimahmed.github.io/internal-helm-repo
- helm repo list
- helm repo update 
```
helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "ecommerce" chart repository <------------------------
...Successfully got an update from the "prometheus-community" chart repository
...Successfully got an update from the "bitnami" chart repository
```
- To give git push permission, you need to grant access to the repository contents. Specifically, you should focus on the Contents scope. This scope includes permissions for repository contents, commits, branches, downloads, releases, and merges, which are all necessary for performing git push.

- helm install product --namespace practice ecommerce/product-microservice


# Use ORC Repository:
- cd /Users/mdnajimahmed/Documents/personal-work/
- mkdir ocrhelmregistry
- cd ocrhelmregistry
- mkdir auth
- htpasswd -Bc auth/htpasswd mdnajimahmed (helm123)
- docker run -d -p 5151:5000 --name local-registry \
  -v $(pwd)/auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  registry:2
- docker login localhost:5151 (username: mdnajimahmed, password: helm123)

# Using OCR Registry:
- helm package . -d /Users/mdnajimahmed/Documents/personal-work/internal-helm-repo
- cd /Users/mdnajimahmed/Documents/personal-work/internal-helm-repo
- helm push product-microservice-0.1.0.tgz oci://localhost:5151/ecommerce
- helm show all oci://localhost:5151/ecommerce/product-microservice --version 0.1.0
- helm install product -n practice oci://localhost:5151/ecommerce/product-microservice --version 0.1.0
