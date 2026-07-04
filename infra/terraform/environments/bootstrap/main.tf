module "resource_group" {
  source   = "../../modules/resource-group"
  name     = "cloudcost-bootstrap-rg"
  location = "France Central"
}

module "terraform_backend" {
  source               = "../../modules/terraform-backend"
  resource_group_name  = module.resource_group.name
  location             = module.resource_group.location
  storage_account_name = "cloudcostyousseftfstate"
  container_name       = "tfstate"
}

