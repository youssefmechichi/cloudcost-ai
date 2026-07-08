resource "azurerm_virtual_network" "this" {
  name                = var.vnet_name
  location            = var.location
  resource_group_name = var.resource_group_name

  address_space = var.address_space
}

resource "azurerm_subnet" "this" {
  for_each = var.subnets

  name                 = each.key
  resource_group_name  = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.this.name

  address_prefixes = [each.value.address_prefix]

  dynamic "delegation" {
    for_each = each.value.delegation != null ? [each.value.delegation] : []

    content {
      name = delegation.value.name

      service_delegation {
        name = delegation.value.service_name

        actions = [
          "Microsoft.Network/virtualNetworks/subnets/join/action",
        ]
      }
    } 
  }
}

resource "azurerm_network_security_group" "this" {
  for_each = var.subnets
  name                = "${each.key}-nsg"

  location            = var.location

  resource_group_name = var.resource_group_name
}

# Allow public HTTP/HTTPS traffic to reach the AKS ingress controller.
# Azure Load Balancer health probes are allowed by default, but client
# traffic from the Internet must also be permitted on the AKS subnet NSG.

resource "azurerm_network_security_rule" "allow_http_https" {
  for_each = {
    for name, subnet in var.subnets :
    name => subnet
    if name == "aks"
  }

  name                        = "allow-http-https"
  priority                    = 100
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"

  source_port_range           = "*"
  destination_port_ranges     = ["80", "443"]

  source_address_prefix       = "Internet"
  destination_address_prefix  = "*"

  resource_group_name         = var.resource_group_name
  network_security_group_name = azurerm_network_security_group.this[each.key].name
}

resource "azurerm_subnet_network_security_group_association" "this" {

    for_each = var.subnets

    subnet_id = azurerm_subnet.this[each.key].id

    network_security_group_id = azurerm_network_security_group.this[each.key].id

}