#!/bin/bash

# Check if the machine name parameter is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <repo url>"
  exit 1
fi

# Read the machine name from the parameter
repo_url=$1

# Read the .netrc file
netrc_file="$HOME/.netrc"

# Extract the username and password for github.com
username=$(grep -A 2 "machine github.com" "$netrc_file" | grep "login" | awk '{print $2}')
password=$(grep -A 2 "machine github.com" "$netrc_file" | grep "password" | awk '{print $2}')

# Print the extracted username and password
echo "Username: $username"
echo "Password: $password"


argocd repo add $repo_url --username $username --password  $password