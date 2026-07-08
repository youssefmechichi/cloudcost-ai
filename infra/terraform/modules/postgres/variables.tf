variable "server_name" {
  description = "Azure PostgreSQL Flexible Server name"
  type        = string
}

variable "database_name" {
  description = "Application database name"
  type        = string
}

variable "resource_group_name" {
  description = "Resource Group where PostgreSQL will be created"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "administrator_login" {
  description = "PostgreSQL administrator username"
  type        = string
}

variable "administrator_password" {
  description = "PostgreSQL administrator password"
  type        = string
  sensitive   = true
}

variable "postgres_version" {
  description = "PostgreSQL version"
  type        = string
}

variable "sku_name" {
  description = "Azure PostgreSQL SKU"
  type        = string
}

variable "delegated_subnet_id" {
  description = "Delegated subnet for PostgreSQL Flexible Server"
  type        = string
}

variable "private_dns_zone_name" {
  description = "Private DNS Zone name"
  type        = string
}

variable "virtual_network_id" {
  description = "Virtual Network ID used to link the Private DNS Zone"
  type        = string
}