resource "google_artifact_registry_repository" "docker" {
  location      = var.location
  repository_id = var.repository_id
  format        = "DOCKER"
  description   = "CloudCost AI Docker images"
}