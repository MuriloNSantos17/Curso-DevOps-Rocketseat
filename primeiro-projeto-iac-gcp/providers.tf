terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.17.0"
    }
  }
}

provider "google" {
  credentials = file("rocketseat-467022-8452d52d80e0.json")
  project     = "rocketseat-467022"
  region      = "us-central1"
}