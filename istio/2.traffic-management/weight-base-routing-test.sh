#!/bin/bash

# Check if the URL is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

# URL to be curled
URL="$1"

# Counters for version occurrences
count_v1_0_1=0
count_v1_0_0=0

# Loop to curl the URL 100 times
for i in {1..100}; do
  # Get the HTML content of the URL
  content=$(curl -s "$URL")
  
  # Check for version 1.0.1
  if [[ "$content" == *"Application Version: 1.0.1"* ]]; then
    ((count_v1_0_1++))
  fi

  # Check for version 1.0.0
  if [[ "$content" == *"Application Version: 1.0.0"* ]]; then
    ((count_v1_0_0++))
  fi
done

# Print the results
echo "Application Version 1.0.0 found $count_v1_0_0 times"
echo "Application Version 1.0.1 found $count_v1_0_1 times"
