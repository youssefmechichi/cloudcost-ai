locals {
  project     = "cloudcost-ai"
  environment = "dev"

  location = "France Central"

  resource_group_name = "${local.project}-${local.environment}-rg"

  vnet_name = "${local.project}-${local.environment}-vnet"

  address_space = ["10.0.0.0/16"]

  subnet_prefixes = {
    aks               = "10.0.1.0/24"
    database          = "10.0.2.0/24"
    private_endpoints = "10.0.3.0/24"
  }

  acr_name = "cloudcostaiyoussefdev"

  cluster_name = "cloudcost-ai-dev-aks"

  dns_prefix = "cloudcost-ai-dev"

  kubernetes_version = "1.33"

  node_count = 2

  vm_size = "Standard_FX2ms_v2"

}