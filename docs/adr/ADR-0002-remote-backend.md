# ADR-0002 — AzureRM Remote Backend

## Status

Accepted

## Context

Terraform initially stores its state locally.

Local state is unsuitable for collaborative development because it can be lost or become inconsistent across machines.

## Decision

Use Azure Blob Storage as the Terraform backend.

Backend configuration:

- Backend: AzureRM
- Storage Account: cloudcostyousseftfstate
- Container: tfstate
- Key: bootstrap/terraform.tfstate

## Consequences

Advantages

- Shared state
- State locking support
- Durable storage
- Native Azure integration
