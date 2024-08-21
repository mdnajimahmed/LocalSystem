#!/bin/bash

# Define the list of API URLs
API_URLS=("version" "message" "sleep" "unstable" "pascal-triangle")

DURATION=480
END_TIME=$((SECONDS + DURATION))

while [ $SECONDS -lt $END_TIME ]; do
  for API_URL in "${API_URLS[@]}"; do
    endpoint="http://payment-service.cloud/api/$API_URL"
    echo "endpoint = $endpoint"
    curl -s $endpoint &
    # Generate a random sleep interval between 100ms and 2000ms
    sleep_time=$(awk -v min=100 -v max=2000 'BEGIN{srand(); print int(min+rand()*(max-min+1))/1000}')
    sleep $sleep_time
  done
done

echo "Finished calling the API URLs for $DURATION seconds."
