output "bucket_domain_name" {
  value       = ""
  sensitive   = false
  description = "Nome de domínio do bucket S3"
}

output "bucket_id" {
  value       = aws_s3_bucket.bucket.id
  sensitive   = false
  description = "Id de domínio do bucket S3"
}