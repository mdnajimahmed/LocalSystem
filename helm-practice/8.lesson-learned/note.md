# Lesson 01:
```
mysql:
    fullnameOverride: docker-mysql
    initdbScriptsConfigMap: mysql-initdb-config
```
adding fullnameOverride - makes it easy to get the mysql service name and it would be little bit easy to get the mysql service name instead of creating hook! But I learned something.

# Lesson 02:
Looks like initdb scripts if ends with .sql then it's processed in one way, if .sh then another way!