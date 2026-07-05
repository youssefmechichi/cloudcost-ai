# ADR-0001 — Terraform Bootstrap Environment

## Status

Accepted

## Context

CloudCost AI requires a remote Terraform backend before provisioning production infrastructure.

Terraform cannot store its state remotely until the storage account and blob container already exist.

This creates a bootstrap problem.

## Decision

Create a dedicated Terraform environment named `bootstrap`.

This environment provisions:

- Azure Resource Group
- Azure Storage Account
- Blob Container

After deployment, Terraform state is migrated from the local backend to Azure Blob Storage.

## Consequences

Advantages

- Remote shared state
- Team collaboration
- State durability
- Production-ready workflow

Disadvantages

- Separate bootstrap deployment
- Additional Terraform root module
