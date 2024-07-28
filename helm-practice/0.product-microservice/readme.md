export PRODUCT_YAML_PATH=products-v1.yaml
# Product list:
The product list comes from a yaml file. PRODUCT_YAML_PATH environment variable dictates the path to the file.
- In local export PRODUCT_YAML_PATH=products-v1.yaml or export PRODUCT_YAML_PATH=products-v2.yaml to test the application
- In kubernetes it should set to a path on which configmap mounts the yaml file.

# Comamnds:
- docker image build -t ivplay4689/product-microservice-nodejs:v1 .
- docker container run -e PRODUCT_YAML_PATH=products-v1.yaml -p 3000:3000 ivplay4689/product-microservice-nodejs:v1