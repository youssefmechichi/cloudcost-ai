resource "google_sql_database_instance" "postgres" {

  name                 = var.instance_name
  region               = var.region
  database_version     = var.database_version
  deletion_protection  = false

  settings {
    tier    = "db-f1-micro"
    edition = "ENTERPRISE"
  }
}

resource "google_sql_database" "database" {

  name = var.db_name

  instance = google_sql_database_instance.postgres.name

}

resource "google_sql_user" "user" {

  instance = google_sql_database_instance.postgres.name

  name = var.db_user

  password = var.db_password

}