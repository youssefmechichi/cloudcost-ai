locals {
  project     = "cloudcost-ai"
  environment = "dev"

  location = "France Central"

  resource_group_name = "${local.project}-${local.environment}-rg"

  vnet_name = "${local.project}-${local.environment}-vnet"

  address_space = ["10.0.0.0/16"]

  subnets = {
    aks = {
      address_prefix = "10.0.1.0/24"
    }

    database = {
      address_prefix = "10.0.2.0/24"

      delegation = {
        name         = "postgres"
        service_name = "Microsoft.DBforPostgreSQL/flexibleServers"
      }
    }

    private_endpoints = {
      address_prefix = "10.0.3.0/24"
    }
  }

  acr_name = "cloudcostaiyoussefdev"

  cluster_name = "cloudcost-ai-dev-aks"

  dns_prefix = "cloudcost-ai-dev"

  kubernetes_version = "1.33"

  node_count = 2

  vm_size = "Standard_FX2ms_v2"

  postgres_server_name = "cloudcost-ai-dev-postgres"

  postgres_database_name = "cloudcost_ai"

  postgres_admin_username = "cloudcostadmin"

  postgres_version = "16"

  postgres_sku = "B_Standard_B1ms"

  private_dns_zone_name = "cloudcost-ai-dev.postgres.database.azure.com"

}

variable "postgres_admin_password" {
    description = "PostgreSQL administrator password"
    type        = string
    sensitive   = true
  }