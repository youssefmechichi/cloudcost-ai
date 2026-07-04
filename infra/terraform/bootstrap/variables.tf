variable "resource_group_name" {
  description = "Bootstrap Resource Group"
  type        = string
  default     = "cloudcost-bootstrap-rg"
}

variable "location" {
  description = "Azure Region"
  type        = string
  default     = "France Central"
}

variable "storage_account_name" {
  description = "Terraform State Storage Account"
  type        = string
  default     = "cloudcostyousseftfstate001"
}

variable "container_name" {
  description = "Terraform State Container"
  type        = string
  default     = "tfstate"
}