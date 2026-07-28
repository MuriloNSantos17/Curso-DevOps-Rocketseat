kind delete cluster --name terceiro-cluster-rocketseat
kind create cluster --name terceiro-cluster-rocketseat
kubectl get nodes
kubectl apply -f .\replicaset.yaml
kubectl get pods
