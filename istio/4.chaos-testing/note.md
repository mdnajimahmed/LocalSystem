# Delay:
- works fine , nothing tricky
# Abort:
- works fine as well, nothing tricky
# Rewrite request response:
- Again requires envoy filter which rquires further study, it did not work this time.
# Traffic mirroring:
- kubectl logs payment-microservice-v2-67fb977569-9qmqn -n istio-demo -f --tail 0 
- kubectl logs -f payment-microservice-v1-5f4898d4d5-d45j4 -n istio-demo --tail 0
- curl http://payment-service.cloud/api/version