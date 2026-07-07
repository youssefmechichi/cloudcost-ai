# ADR-0004: AKS Module

## Status

Accepted

## Context

CloudCost AI requires a managed Kubernetes platform to host containerized workloads.

The solution must:

- Integrate with the existing Azure networking
- Pull images securely from Azure Container Registry
- Be reusable across environments
- Follow Infrastructure as Code best practices

## Decision

An AKS Terraform module was created.

The cluster is deployed using:

- Existing Virtual Network
- Existing AKS subnet
- System Assigned Managed Identity
- Azure CNI networking
- Dedicated system node pool

## Consequences

### Advantages

- Managed Kubernetes control plane
- Native Azure networking
- Secure Azure authentication through Managed Identity
- Reusable Terraform module
- Production-ready architecture

### Trade-offs

- Higher cost than running containers directly
- Increased operational complexity
- Kubernetes knowledge required