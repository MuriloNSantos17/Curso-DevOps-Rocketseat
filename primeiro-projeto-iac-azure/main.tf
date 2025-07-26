resource "azurerm_resource_group" "rg"{
    name = "rocketseat-murilo-hmg"
    location = "brazilsouth"
    tags = {
        Iac = "True"
    }
}

resource "azurerm_virtual_network" "vnet" {
    name = "rocketseat-murilo-vnet"
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
    address_space = ["10.0.0.0/16"]
    tags = {
        Iac = true
    }
}