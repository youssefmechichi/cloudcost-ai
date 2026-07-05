output "subnet_ids" {
  description = "Map of subnet IDs"

  value = {
    for name, subnet in azurerm_subnet.this :
    name => subnet.id
  }
}