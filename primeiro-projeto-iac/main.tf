resource "aws_s3_bucket" "s3_bucket"{
    bucket="${var.org_name}-murilo-bucket-iac-${terraform.workspace}" 

    tags = {
        Name = "Primeiro Bucket",
        Iac = true,
        context = "${terraform.workspace}"
    }
}