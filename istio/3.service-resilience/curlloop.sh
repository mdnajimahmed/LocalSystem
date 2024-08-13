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
  call_start_time=$(date +%s.%N)

  response=$(curl -s -w "%{http_code}" -o /tmp/response_body "$API_URL")

  call_end_time=$(date +%s.%N)
  call_total_time=$(echo "scale=3; ($call_end_time - $call_start_time)" | bc)

  current_time=$(date -u +"%H:%M:%S")
  status_code="${response: -3}"
  response_body=$(cat /tmp/response_body)
  current_time=$(date -u +"%H:%M:%S")
  echo "$current_time"
  echo "API call to $API_URL returned status code: $status_code"
  echo "Response body: $response_body"
  echo "Time spent on API call: $call_total_time"
  sleep $INTERVAL
done

echo "Finished calling the API for $DURATION seconds."
