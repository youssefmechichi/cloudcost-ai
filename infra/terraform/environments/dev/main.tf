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


