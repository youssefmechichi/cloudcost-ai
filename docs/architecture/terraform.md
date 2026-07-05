# Terraform Architecture

CloudCost AI follows a modular Terraform architecture.

## Repository Layout

terraform/

modules/

resource-group/

terraform-backend/

network/

...

environments/

bootstrap/

dev/

prod/

Modules encapsulate infrastructure logic.

Environments assemble reusable modules into deployable infrastructures.

## Bootstrap

The bootstrap environment provisions the Terraform backend.

After provisioning, Terraform state is migrated into Azure Blob Storage.
