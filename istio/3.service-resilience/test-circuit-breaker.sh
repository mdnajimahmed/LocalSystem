#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <API_URL>"
  exit 1
fi

API_URL="$1"
DURATION=480
INTERVAL=3
END_TIME=$((SECONDS + DURATION))

while [ $SECONDS -lt $END_TIME ]; do
  response=$(curl -s -w "%{http_code}" -o /tmp/response_body "$API_URL")
  status_code="${response: -3}"
  response_body=$(cat /tmp/response_body)
  echo "API call to $API_URL returned status code: $status_code"
  echo "Response body: $response_body"
  sleep $INTERVAL
done

echo "Finished calling the API for $DURATION seconds."
