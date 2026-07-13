module "gke" {

  source = "../../modules/gke"

  cluster_name = "cloudcost-dev"

  region = "europe-west1"

}

module "artifact_registry" {

  source = "../../modules/artifact-registry"

  repository_id = "cloudcost"

  location = "europe-west1"

}

module "cloud_sql" {

  source = "../../modules/cloud-sql"

  instance_name = "cloudcost-postgres"

  region = "europe-west1"

  db_name = "cloudcost_ai"

  db_user = "cloudcostadmin"

  db_password = "ChooseAStrongPassword123!"
}