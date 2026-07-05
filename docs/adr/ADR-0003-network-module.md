# ADR-0003 — Azure Networking Architecture

## Status

Accepted

## Context

CloudCost AI requires a secure and reusable networking foundation before deploying platform services such as AKS, PostgreSQL, and Key Vault.

The networking layer should support future growth while remaining simple enough for the current application.

## Decision

A reusable Terraform module named `network` was created.

The module provisions:

- Azure Virtual Network
- AKS subnet
- Database subnet
- Private Endpoints subnet
- One Network Security Group per subnet
- NSG associations

Subnets are created dynamically using `for_each` over a `map(string)`.

## Consequences

### Advantages

- Scalable module design
- Minimal duplicated code
- Easy addition of future subnets
- Clear network isolation
- Supports future platform services

### Disadvantages

- Slightly more complex Terraform syntax
- Consumers must understand maps and `for_each`