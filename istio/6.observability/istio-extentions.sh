#!/bin/bash

# Usage: ./apply-istio-addons.sh <istio-version>
# Example: ./apply-istio-addons.sh release-1.22

ISTIO_VERSION=$1

if [ -z "$ISTIO_VERSION" ]; then
  echo "Usage: $0 <istio-version>"
  echo "Example: $0 release-1.22"
  exit 1
fi

BASE_URL="https://raw.githubusercontent.com/istio/istio/${ISTIO_VERSION}/samples/addons"

declare -a addons=("grafana.yaml" "jaeger.yaml" "kiali.yaml" "loki.yaml" "prometheus.yaml")

for addon in "${addons[@]}"; do
  echo "Applying $addon from Istio version $ISTIO_VERSION..."
  curl -L "${BASE_URL}/${addon}" -o /Users/mdnajimahmed/Documents/LocalSystem/argocd/argo-cd/istio-extension-services/${addon}
done

echo "All add-ons have been applied successfully!"
