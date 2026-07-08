output "subnet_ids" {
  description = "Map of subnet IDs"

  value = {
    for name, subnet in azurerm_subnet.this :
    name => subnet.id
  }
}

output "virtual_network_id" {
  description = "Virtual Network ID"
  value       = azurerm_virtual_network.this.id
}