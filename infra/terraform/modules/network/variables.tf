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

variable "subnets" {
  description = "Subnet configuration"

  type = map(object({
    address_prefix = string

    delegation = optional(object({
      name         = string
      service_name = string
    }))
  }))
}