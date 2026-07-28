# Curso DevOps — Rocketseat

Repositório de estudos e projetos práticos desenvolvidos durante o curso de
DevOps da Rocketseat. O conteúdo explora infraestrutura como código com
Terraform em três provedores de nuvem e os primeiros conceitos de Kubernetes
com um cluster local criado pelo Kind.

> Este é um projeto educacional. Antes de provisionar recursos, revise nomes,
> regiões, credenciais e possíveis custos na sua conta de nuvem.

## Conteúdos praticados

- Terraform e infraestrutura como código (IaC);
- módulos, variáveis, outputs e estado remoto do Terraform;
- provisionamento de recursos na AWS, Azure e Google Cloud;
- criação de cluster Kubernetes local com Kind;
- Pods, ReplicaSets, Deployments e Services;
- limites e solicitações de CPU e memória.

## Estrutura do repositório

```text
.
├── primeiro-projeto-iac/          # AWS: S3, CloudFront e backend remoto
│   ├── modules/
│   │   ├── cloudfront/
│   │   └── s3/
│   ├── main.tf
│   ├── outputs.tf
│   ├── providers.tf
│   └── variables.tf
├── primeiro-projeto-iac-azure/    # Azure: Resource Group e Virtual Network
│   ├── main.tf
│   └── providers.tf
├── primeiro-projeto-iac-gcp/      # GCP: Service Account e Compute Engine
│   ├── main.tf
│   └── providers.tf
└── primeiro-cluster/              # Kubernetes: cluster Kind e workloads Nginx
    ├── kind.yaml
    ├── pod.yaml
    ├── replicaset.yaml
    ├── deployment.yml
    └── service.yml
```

## Pré-requisitos

Para executar todos os exemplos, instale:

- [Git](https://git-scm.com/);
- [Terraform](https://developer.hashicorp.com/terraform/install);
- [Docker](https://docs.docker.com/get-docker/);
- [kubectl](https://kubernetes.io/docs/tasks/tools/);
- [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation).

Também é necessário ter uma conta e a CLI autenticada no provedor que será
utilizado:

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html);
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli);
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).

Clone o repositório:

```bash
git clone https://github.com/MuriloNSantos17/Curso-DevOps-Rocketseat.git
cd Curso-DevOps-Rocketseat
```

## Projetos Terraform

O fluxo básico é o mesmo em cada diretório:

```bash
terraform init
terraform fmt -check
terraform validate
terraform plan
terraform apply
```

Ao terminar os testes, remova os recursos para evitar cobranças:

```bash
terraform destroy
```

### AWS

O projeto em `primeiro-projeto-iac/` utiliza módulos locais para criar:

- um bucket S3 com configuração de site estático;
- uma distribuição CloudFront;
- um bucket S3 versionado para armazenar o estado remoto.

Antes de executar, revise `providers.tf` e ajuste o perfil AWS, a região e o
nome do bucket de estado. O backend remoto precisa existir antes do primeiro
`terraform init`; ele não pode ser criado pelo mesmo estado que pretende
armazenar.

```bash
cd primeiro-projeto-iac
aws configure --profile SEU_PERFIL
terraform init
terraform plan
terraform apply
terraform output
```

Os nomes de buckets S3 são globais. Portanto, substitua os nomes presentes no
projeto por valores únicos antes de aplicar a infraestrutura.

### Azure

O projeto em `primeiro-projeto-iac-azure/` cria um Resource Group na região
`brazilsouth` e uma Virtual Network com o bloco `10.0.0.0/16`.

```bash
cd primeiro-projeto-iac-azure
az login
terraform init
terraform plan
terraform apply
```

Revise a assinatura ativa com `az account show` antes de confirmar o
provisionamento.

### Google Cloud

O projeto em `primeiro-projeto-iac-gcp/` cria uma Service Account e uma
instância Compute Engine `e2-micro` na zona `us-central1-a`.

```bash
cd primeiro-projeto-iac-gcp
gcloud auth application-default login
gcloud config set project SEU_PROJECT_ID
terraform init
terraform plan
terraform apply
```

O provider atual referencia um arquivo JSON e um projeto específicos. Ajuste
esses valores em `providers.tf` para a sua conta. Nunca envie chaves de contas
de serviço para o Git.

## Kubernetes com Kind

O diretório `primeiro-cluster/` contém a configuração de um cluster local com
um nó de control plane e um worker, além de diferentes formas de executar o
Nginx.

Crie o cluster:

```bash
cd primeiro-cluster
kind create cluster --name rocketseat --config kind.yaml
kubectl cluster-info --context kind-rocketseat
kubectl get nodes
```

Para o fluxo recomendado, use o Deployment e o Service:

```bash
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl get deployments,pods,services
kubectl port-forward service/nginx-svc 8080:80
```

Com o port-forward em execução, acesse `http://localhost:8080`.

Os arquivos `pod.yaml` e `replicaset.yaml` permitem estudar os recursos de
forma isolada. Evite aplicar o ReplicaSet junto com o Deployment durante o
mesmo exercício, pois ambos gerenciam Pods com o rótulo `app: nginx`.

Exclua o cluster quando não precisar mais dele:

```bash
kind delete cluster --name rocketseat
```

## Boas práticas de segurança

- não versione arquivos de credenciais, chaves privadas ou variáveis secretas;
- use perfis locais, variáveis de ambiente ou mecanismos de identidade do
  provedor;
- confira o plano do Terraform antes de executar `apply`;
- execute `terraform destroy` ao finalizar laboratórios temporários;
- mantenha arquivos de estado e credenciais fora do controle de versão.

## Status

Repositório em evolução conforme o avanço das aulas e dos experimentos
práticos do curso.
