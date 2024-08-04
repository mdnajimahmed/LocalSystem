# Lesson 01:
```
mysql:
    fullnameOverride: docker-mysql
    initdbScriptsConfigMap: mysql-initdb-config
```
adding fullnameOverride - makes it easy to get the mysql service name and it would be little bit easy to get the mysql service name instead of creating hook! But I learned something.

# Lesson 02:
Looks like initdb scripts if ends with .sql then it's processed in one way, if .sh then another way!

# Lesson 03:
Always run help repo update after helm repo add.

# Lesson 04:
Chartmuseum sounds promising due to it's cloud storage support but it's better to use https://docs.aws.amazon.com/AmazonECR/latest/userguide/push-oci-artifact.html
with helm, because storage is a solved problem if OCI is used from the cloud vendors.