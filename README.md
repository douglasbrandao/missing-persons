# Missing Persons - SPA
Este projeto é uma Single Page Application (SPA) desenvolvida em Next.js para consultar e reportar informações sobre pessoas desaparecidas. Os dados são fornecidos pela API da Polícia Judiciária Civil de Mato Grosso.

## Tecnologias utilizadas
- **Next.js**: Framework para aplicações React.
- **Tailwind CSS**: Framework CSS para estilização.

## Funcionalidades

**Listagem de de pessoas desaparecidas**
- Exibição de cards com imagem e informações básicas da pessoa desaparecida ou encontrada.
- Paginação para exibição de 12 itens por vez.

**Detalhamento do caso**
- Página com mais informações sobre a pessoa com destaque da situação (desaparecida ou encontrada).
- Botão para reportar informações sobre o desaparecido.

## Imagens

![Home](/docs/img/home.png)

![Detail Missing Person](/docs/img/detail-missing-person.png)

![Detail Found Person](/docs/img/detail-found-person.png)

## Instalação e execução

### Sem Docker

Clone o repositório:
```sh
   git clone https://github.com/douglasbrandao/missing-persons.git
```
Instale as dependências:
```sh
   npm install
```
Execute o projeto:
```sh
   npm run dev
```
Acesse em: `http://localhost:3000`

### Com Docker
Construa a imagem:
```sh
docker build -t missing-persons-seplag-douglas .
```

Execute o container:
```sh
docker run -p 3000:3000 missing-persons-seplag-douglas
```
Acesse em `http://localhost:3000`

## Estrutura do Projeto
```
/
├── app/
│   ├── index.js  # Página inicial
│   ├── details/[id].js  # Página de detalhes
```
## Contato
Desenvolvido por [Douglas Brandão](https://github.com/douglasbrandao).
