# CloudCost AI Infrastructure

CloudCost AI is deployed on Microsoft Azure using Terraform.

Infrastructure is organized into multiple independent Terraform environments.

Current environments:

- bootstrap
- dev
- prod

Terraform state is stored remotely in Azure Blob Storage.

Future infrastructure layers:

- Networking
- AKS
- PostgreSQL
- Azure Key Vault
- Azure OpenAI
- Monitoring
