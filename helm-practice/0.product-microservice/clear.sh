kubectl delete pvc --all --all-namespaces
kubectl delete pv --all

# Patch all PVCs to remove finalizers
echo "Patching all PVCs to remove finalizers..."
for pvc in $(kubectl get pvc --all-namespaces -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.metadata.namespace}{"\n"}{end}'); do
name=$(echo $pvc | awk '{print $1}')
namespace=$(echo $pvc | awk '{print $2}')
echo "Patching PVC $name in namespace $namespace"
kubectl patch pvc $name -n $namespace -p '{"metadata":{"finalizers":null}}'
done

# Patch all PVs to remove finalizers
echo "Patching all PVs to remove finalizers..."
for pv in $(kubectl get pv -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{end}'); do
echo "Patching PV $pv"
kubectl patch pv $pv -p '{"metadata":{"finalizers":null}}'
done

echo "All PVCs and PVs patched successfully."

kubectl delete cm mysql-service-config -n practice