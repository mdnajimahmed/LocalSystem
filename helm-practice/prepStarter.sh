#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <starter name> <version>"
    exit 1
fi

# Assign arguments to variables
STARTERNAME=$1
VERSION=$2

# Function to deploy using a specific context
prepStarter() {
  local starterChartName=$1
  local starterChartVersion=$2
#   helm env HELM_DATA_HOME

  echo "Using starter chart = $starterChartName , version = $starterChartVersion"

  helm pull oci://localhost:5151/helm-starters/$starterChartName --version $starterChartVersion
  tar -zxvf $starterChartName-$starterChartVersion.tgz
  rm -rf $(helm env HELM_DATA_HOME)/starters/$starterChartName-$starterChartVersion
  mkdir -p $(helm env HELM_DATA_HOME)/starters/$starterChartName-$starterChartVersion
  echo "$(helm env HELM_DATA_HOME)/starters/$starterChartName-$starterChartVersion created"
  mv $starterChartName/* $(helm env HELM_DATA_HOME)/starters/$starterChartName-$starterChartVersion
  rm -rf $starterChartName $starterChartName-$starterChartVersion.tgz
}

prepStarter $STARTERNAME $VERSION 

# ./prepStarter.sh starter-chart 0.1.0

