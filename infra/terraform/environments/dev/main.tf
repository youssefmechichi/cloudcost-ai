data "azurerm_resource_group" "bootstrap" {
  name = "cloudcost-bootstrap-rg"
}

module "network" {
  source              = "../../modules/network"
  resource_group_name = data.azurerm_resource_group.bootstrap.name
  location            = data.azurerm_resource_group.bootstrap.location
  vnet_name           = local.vnet_name
  address_space       = local.address_space
  subnet_prefixes     = local.subnet_prefixes
}

module "acr" {
  source = "../../modules/acr"

  resource_group_name = data.azurerm_resource_group.bootstrap.name
  location            = data.azurerm_resource_group.bootstrap.location

  acr_name      = local.acr_name
  sku           = "Basic"
  admin_enabled = false
}

module "aks" {
  source = "../../modules/aks"

  resource_group_name = data.azurerm_resource_group.bootstrap.name
  location            = data.azurerm_resource_group.bootstrap.location

  cluster_name       = local.cluster_name
  dns_prefix         = local.dns_prefix
  kubernetes_version = local.kubernetes_version

  node_count = local.node_count
  vm_size    = local.vm_size

  subnet_id = module.network.subnet_ids["aks"]
}

resource "azurerm_role_assignment" "acr_pull" {
  scope                = module.acr.id
  role_definition_name = "AcrPull"
  principal_id         = module.aks.kubelet_identity_object_id
}

