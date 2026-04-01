# Design do Cardapio Digital da Clinica

**Data:** 2026-04-01

## Objetivo

Criar um cardapio digital mobile-first para pacientes de uma clinica, acessado por QR Code, com fluxo simples de pedido por nome, painel `/admin` para a recepcao acompanhar pedidos em tempo real com alerta visual e sonoro, e um mini estoque para controlar disponibilidade e avisos de baixa.

## Resumo da Solucao

A solucao sera um app web com visual de app, construido em Next.js e Supabase.

- Area publica para o paciente visualizar itens, informar o nome e enviar o pedido pelo celular
- Area `/admin` para recepcao acompanhar pedidos em tempo real
- Estoque simples por item, com quantidade atual e limite minimo de alerta
- Imagens ilustrativas para tornar a escolha mais visual e intuitiva
- Fluxo de status reduzido ao minimo: `novo` e `entregue`

## Requisitos Validados

- Uso real online
- Experiencia mobile-first
- Pedido com identificacao apenas por nome
- Painel mestre em `/admin`, aberto em um ou mais dispositivos
- Status do pedido apenas `novo` e `entregue`
- Mini estoque simples com aviso de item acabando
- Visual amigavel, com cards e ilustracoes por produto

## Abordagem Escolhida

Foi escolhida a stack `Next.js + Supabase` por oferecer:

- Boa experiencia web com cara de app no celular
- Banco de dados online simples de administrar
- Atualizacao em tempo real para a tela da recepcao
- Menor complexidade operacional do que alternativas mais pesadas
- Integracao pratica com deploy em Vercel

## Estrutura de Telas

### Cardapio do Paciente

Rota principal publica com foco em navegacao por celular.

- Campo para o paciente informar o nome
- Categorias visuais para navegar pelos produtos
- Cards com imagem, nome e acao de adicionar
- Carrinho simples e revisao antes do envio
- Confirmacao clara apos o pedido ser enviado

### Painel `/admin`

Tela de operacao da recepcao.

- Lista de pedidos em tempo real
- Destaque visual forte para pedidos `novo`
- Alerta sonoro sempre que um novo pedido entrar
- Acao unica de marcar como `entregue`
- Indicadores de horario e nome do paciente

### Estoque

Area simples dentro do admin.

- Quantidade atual por item
- Limite minimo de alerta por item
- Aviso visual de estoque baixo
- Marcacao de indisponivel quando zerar
- Atualizacao manual simples pela recepcao

## Modelo de Dados

### `items`

Responsavel pelo catalogo.

- id
- slug
- nome
- descricao opcional
- categoria
- imagem_url
- ativo
- destaque_ordenacao

### `inventory`

Responsavel pelo controle de disponibilidade.

- item_id
- quantidade_atual
- limite_alerta
- indisponivel_manual
- atualizado_em

### `orders`

Cabecalho do pedido.

- id
- paciente_nome
- status
- criado_em
- entregue_em

### `order_items`

Itens dentro do pedido.

- id
- order_id
- item_id
- item_nome_snapshot
- quantidade

## Fluxo de Pedido

1. Paciente le o QR Code e abre o cardapio no celular
2. Informa o nome
3. Escolhe os itens e envia o pedido
4. O pedido e gravado no Supabase
5. O painel `/admin` recebe o novo pedido em tempo real
6. O admin toca som e destaca o pedido visualmente
7. A recepcao entrega e marca como `entregue`
8. O estoque e reduzido automaticamente pelos itens pedidos
9. Itens com quantidade baixa geram aviso visual no admin

## Regras de Negocio

- Todo pedido precisa ter nome do paciente
- Pedido nasce sempre com status `novo`
- O unico encerramento e a mudanca para `entregue`
- Itens zerados ficam indisponiveis no cardapio
- Itens abaixo do limite minimo aparecem como estoque baixo
- O desconto do estoque acontece no momento do pedido

## Experiencia Visual

- Layout mobile-first com cara de aplicativo
- Hierarquia visual forte para facilitar uso em celular
- Cards grandes, toque facil e feedback imediato
- Ilustracoes por item para tornar a escolha intuitiva
- Admin com blocos destacados, cores de estado e prioridade visual para pedidos novos

## Notificacoes

- Som no admin para novo pedido
- Destaque visual persistente enquanto o pedido estiver como `novo`
- Contador ou selo de novos pedidos, se fizer sentido durante a implementacao

## Publicacao

- Frontend hospedado na Vercel
- Banco, realtime e storage no Supabase
- QR Code apontando para a URL publica do cardapio

## Escopo Inicial

Entram no MVP:

- Cardapio do paciente
- Carrinho e envio de pedido
- `/admin` em tempo real
- Marcacao de entregue
- Mini estoque com alerta de baixa
- Cadastro inicial dos produtos
- Upload ou associacao de imagens ilustrativas

Ficam fora do MVP:

- Pagamento online
- Multiunidade
- Multiusuario com permissoes complexas
- Historico analitico avancado
- Impressao termica

## Catalogo Inicial

O sistema sera preparado com os seguintes itens:

- Agua com gas
- Agua sem gas
- Agua de coco
- Suco laranja
- Agua saborizada abacaxi e hortela
- Agua saborizada limao e alegria
- Agua saborizada bergamota e capim limao
- Agua saborizada pessego
- Agua saborizada frutas vermelhas
- Dolce Gusto
- Chocolate quente
- Cappuccino
- Cafe au lait
- Mochaccino canela
- Mochaccino avela
- Expresso
- Chocolate
- Lacreme ao leite
- Lacreme branco
- Chocolate menta
- Chocolate 70% cacau
- Bombons
- Leite-creme
- Pistache
- Ao leite
- Balas
- Chas
- Peppermint - marca Celestial
- True Blueberry - marca Celestial
- Cereal
- Barra de cereal avela com chocolate
- Barra de cereal castanha de caju

## Riscos e Cuidados

- O som do admin depende de permissao/autorizacao do navegador em alguns cenarios
- O estoque automatico exige cuidado para nao permitir pedido de item zerado
- As imagens precisam ser padronizadas para manter o cardapio bonito e leve no celular
- Como o projeto comecou em pasta vazia, a estrutura inicial deve ser pensada para crescer sem retrabalho
