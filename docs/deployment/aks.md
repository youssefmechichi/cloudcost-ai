# AKS Deployment

## Prerequisites

- Bootstrap infrastructure deployed
- Remote Terraform backend configured
- Virtual Network available
- Azure CLI authenticated

## Deployment

```bash
terraform init
terraform plan
terraform apply
```

## Connect

```bash
az aks get-credentials \
  --resource-group cloudcost-bootstrap-rg \
  --name cloudcost-ai-dev-aks
```

## Verify

```bash
kubectl get nodes

kubectl get namespaces

kubectl get pods -A
```

Expected result:

- Worker nodes in Ready state
- kube-system namespace populated
- CoreDNS and kube-proxy running