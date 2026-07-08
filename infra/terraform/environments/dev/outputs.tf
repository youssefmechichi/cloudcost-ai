output "postgres_fqdn" {
  description = "PostgreSQL server FQDN"
  value       = module.postgres.fqdn
}

output "postgres_server_name" {
  description = "PostgreSQL server name"
  value       = module.postgres.server_name
}