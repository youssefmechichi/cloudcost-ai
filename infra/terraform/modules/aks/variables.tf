variable "resource_group_name" {
  description = "Resource Group name"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "cluster_name" {
  description = "Cluster Name"
  type        = string
}

variable "dns_prefix" {
  description = "DNS Prefix"
  type        = string
}

variable "kubernetes_version" {
  description = "Kubernetes Version"
  type        = string
}

variable "node_count" {
  description = "Number of nodes"
  type        = number
}

variable "vm_size" {
  description = "Number of nodes"
  type        = string
}

variable "subnet_id" {
  description = "Number of nodes"
  type        = string
}

variable "tags" {
  description = "Tags applied to all resources"

  type = map(string)

  default = {}
}