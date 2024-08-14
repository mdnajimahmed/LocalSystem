- update istiod config map with following values - 
```
mixer:
    policy:
        enabled: true
global:
    disablePolicyChecks: false
```
- kubectl rollout restart deployment istiod -n istio-system