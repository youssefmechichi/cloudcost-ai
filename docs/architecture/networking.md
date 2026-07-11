# Azure Networking

CloudCost AI uses a dedicated Virtual Network to isolate platform resources.

## Topology

- Virtual Network
- AKS Subnet
- Database Subnet
- Private Endpoint Subnet

Each subnet has its own Network Security Group.

Terraform dynamically provisions networking resources using reusable modules.

## Module Interface

### Inputs

- resource_group_name
- location
- vnet_name
- address_space
- subnets

### Outputs

- subnet_ids

The output map is consumed by future infrastructure modules such as AKS and PostgreSQL.