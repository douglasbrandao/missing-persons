# Desafio Front-end - SEPLAG

## Dados

- Nome: Douglas Frota Brandão
- E-mail: douglasfrb@gmail.com
- Linkedin: https://www.linkedin.com/in/douglasfbrandao/
- Inscrições: 8579 e 8582 

# Missing Persons - SPA
Este projeto é uma Single Page Application (SPA) desenvolvida em Next.js para consultar e reportar informações sobre pessoas desaparecidas. Os dados são fornecidos pela API da Polícia Judiciária Civil de Mato Grosso.

## Tecnologias utilizadas
- **Next.js**: Framework para aplicações React.
- **Tailwind CSS**: Framework CSS para estilização.
- **React Hook Form**: Lib para lidar com formulários.
- **Zod**: Lib para validação de dados vindos do formulário.
- **React Intersection Observer**: Implementação da Intersection Observer API para detectar quando um elemento aparece na tela. Foi utilizado para fazer a paginação no estilo infinite scroll, incrementando o número da página a cada vez que o elemento é detectado na tela.

## Funcionalidades

**Listagem de de pessoas desaparecidas**
- Exibição de cards com imagem e informações básicas da pessoa desaparecida ou encontrada.
- Paginação para exibição de 12 itens por vez.

**Detalhamento do caso**
- Página com mais informações sobre a pessoa com destaque da situação (desaparecida ou encontrada).
- Botão para reportar informações sobre o desaparecido.

## Imagens

![Home](/docs/img/home.png)

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
npm run build && npm start
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
├── actions/ # Chamadas API
├── app/
│   ├── index.js  # Página inicial
│   ├── details/[id].js  # Página de detalhes
├── components/ # Componentes
│   ├── ui/
├── types/ # Tipagem
├── utils/ # Utilitários
```
## Contato
Desenvolvido por [Douglas Brandão](https://github.com/douglasbrandao).
