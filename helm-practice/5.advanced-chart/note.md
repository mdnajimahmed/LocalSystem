helm dependency --help
- build       rebuild the charts/ directory based on the Chart.lock file
- list        list the dependencies for the given chart
- update      update charts/ based on the contents of Chart.yaml

sadly there is no way to add dependency, we have t add them manually
- helm search repo mysql --versions | grep "bitnami/mysql"
- helm dependency update .
- helm dependency build .
- helm install --namespace practice product --create-namespace .
- kubectl get pods -n practice
- helm upgrade --namespace practice product .
- Can use a range for version supported operators: `>, >=, <, <= , ==, !=` and conjuction with `and , | , ^ , ~`
    - and : >= 11.1.14 and < 12.0.0
    - | : >=11.0.0 | >=12.0.0 (:p)
    - ^ : ^ means less than major version, with some catches
    ![alt text](image.png)
    - ~ works with minor version
    ![alt text](image-1.png)
    - with these sign, like other lock file, this uses the Chart.lock file
```
dependencies:
  - name: mysql
    version: ">= 11.1.14 and < 12.0.0"
    repository: https://charts.bitnami.com/bitnami
```

- add dependancy conditionally:
in values.yml put this
```
mysql:
  enabled: false
```
and in Chart.yml following change - 
```

dependencies:
  - name: mysql
    version: "11.1.14"
    repository: https://charts.bitnami.com/bitnami
    condition: mysql.enabled <--------------------------------- CHANGE ( use it as it is , not via .Values ****** VVVI)
```
- We had to uninstall and install when dependecies change.