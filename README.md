# projeto18-valex
#
# Rotas de criação e gerenciamento de cartões:

## Rota <span style="color:orange"> **POST** </span>/cards

Rota autenticada com header "x-api-key". Cria novos cartões para funcionários de uma
empresa pré-cadastrada.

Além do header é preciso um body da requisição no seguinte formato:

```json
{
  "employeeId": "id_do_funcionario", //number
  "type": "tipo_do_cartão" //string
}
```
type pode ser uma das strings: 'groceries','restaurant','transport','education','health'.
#
## Rota <span style="color:orange"> **POST** </span>/cards/activate

Rota não autenticada com o objetivo de ativar cartões criados.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "cardId": "id_do_cartao", //number
  "cardCVV": "cvc_do_cartao", //string
  "password": "senha_escolhida" //string
}
```
a senha será registrada ao ativar o cartão.
#
## Rota <span style="color:green"> **GET** </span>/showbalance/:cardId

Rota não autenticada. Sua função é verificar recargas, pagamentos e o saldo atual do cartão através do seu identificador.

O "cardId" passado na rota é o id do cartão criado.

A resposta da requisição virá no seguinte formato:

```json
{
  "balance": 7000,
  "transations": [
    {
      "id": 1,
      "cardId": 13,
      "businessId": 5,
      "timestamp": "05/09/2022",
      "amount": 3000,
      "businessName": "Unimed"
    }
  ],
  "recharges": [
    {
      "id": 1,
      "cardId": 13,
      "timestamp": "04/09/2022",
      "amount": 5000
    },
    {
      "id": 2,
      "cardId": 13,
      "timestamp": "04/09/2022",
      "amount": 5000
    }
  ]
}
```
#
## Rotas <span style="color:orange"> **POST** </span>/cards/blocked e cards/unblocked

Duas rotas não autenticadas com o objetivo de bloquear e desbloquear cartão especificado na requisição.

O Body da requisição nas duas rotas deve ser feito no seguinte formato:

```json
{
    "cardNumber": "numero_do_cartao", //string
    "password": "senha_do_cartão" //string
}
```
#

# Rota de recarga:

## Rota <span style="color:orange"> **POST** </span>/recharge

Rota autenticada com header "x-api-key". Sua função é recarregar cartões especificados por uma empresa registrada.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "cardNumber": "numero_do_cartão", //string
  "amount": "valor_escolhido" //number
}
```
#

# Rotas de pagamento:

## Rota <span style="color:orange"> **POST** </span>/payment/pos

Essa é uma rota não autenticada. Sua função é permitir aos funcionários fazerem compras em estabelecimentos **do mesmo tipo** dos seus cartões.

```json
{
  "cardId": "id_do_cartão", //number
  "password": "senha_do_cartão", //string
  "businessId": "id_do_estabelecimento", //number
  "amount": "valor_da_compra" //number
}
```
#

## Rota <span style="color:orange"> **POST** </span>/payment/online

Essa é uma rota não autenticada com a função de permitir funcionários fazerem compras compras **online** em estabelecimentos **do mesmo tipo** dos seus cartões.

```json
{
    "cardNumber": "numero_do_cartao", //string
    "holderName": "nome_do_titular", //string
    "expirationDate": "data_da_expiração", //string
    "cardCVV": "cvc_do_cartao", //string
    "businessId": "id_do_estabelecimento", //number
    "amount": "valor_da_compra" //number
}
```
#

**Template usado nesse readme** : https://github.com/grakzanchetta/projeto18-valex/blob/main/README.txt
