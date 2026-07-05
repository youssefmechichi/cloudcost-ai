variable "resource_group_name" {
  description = "Resource Group Name"
  type        = string
}

variable "location" {
  description = "Azure Region"
  type        = string
}

variable "vnet_name" { 
  description = "Virtual Network name"
  type        = string
}

variable "address_space" {
  description = "Virtual Network address space"
    type        = list(string)
}

variable "subnet_prefixes" {
  description = "CIDR blocks for the subnets"

  type = map(string)
}