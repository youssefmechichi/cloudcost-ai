# AKS Architecture

## Overview

The CloudCost AI platform runs on Azure Kubernetes Service (AKS).

The cluster is connected to the existing Virtual Network created during the networking sprint.

## Components

- AKS Cluster
- System Node Pool
- Azure Container Registry
- Azure Virtual Network
- Azure Managed Identity

## Networking

AKS is deployed inside the dedicated AKS subnet.

Azure CNI is used for networking.

A dedicated Service CIDR is configured to avoid overlap with the VNet address space.

## Authentication

The cluster uses a System Assigned Managed Identity.

Later, this identity will receive the AcrPull role to securely pull container images from Azure Container Registry.

No credentials are stored inside Kubernetes.