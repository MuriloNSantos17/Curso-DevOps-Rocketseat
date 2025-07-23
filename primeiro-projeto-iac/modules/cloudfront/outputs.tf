output "cdn_id" {
    value = data.aws_cloudfront_distribution.cloudfront.id
    sensitive = false 
    description = "id do cloud front"
}


output "cdn_domain_name" {
    value = data.aws_cloudfront_distribution.cloudfront.domain_name
    sensitive = false 
    description = "nome de domínio do CloudFront"
}