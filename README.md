<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/BrunoCarvalhoFeitosa/ecommerce-store">
    <img src="\public\images\ifood-logo.png" alt="Logo" width="120" weight="120" />
  </a>

  <p align="center">
    Redesign completo do iFood feito em Next.js, Typescript, Prisma, PostgreSQL e TailwindCSS. A aplicação possui página de cadastro e login feitos com o Next-Auth, Prisma e PostgreSQL. A aplicação possui uma home page, onde são exibidas as categorias e os respectivos produtos, há um mural de exibição dos testemunhos, bem como a funcionalidade em si, onde o usuário descreve sua experiência aoo utilizar a aplicação e ao submeter os dados eles são expostos publicamente neste mural. Nas páginas de categoria são exibidos os produtos e restaurantes relacionados. Na página de produto há uma galeria de imagens com funcionalidade para aplicar e remover zoom das imagens, há a funcionalidade de adição do produto ao carrinho, também há uma vitrine de produtos relacionados, bem como opção para postar uma comentário avaliando o produto. Na página de checkout, os produtos adicionados ao carrinho são exibidos, o usuário pode remover o produto que quiser e ao finalizar a compra, o pedido é salvo no banco de dados e fica disponível para visualização na página de minha conta. A página de minha conta contém os dados cadastrados pelo usuários, os pedidos realizados bem como o status de compra e os produtos e restaurantes que foram favoritados pelo usuário.
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#feito-com">Feito com</a></li>
        <li><a href="#hospedagem">Hospedagem</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#license">Licenças</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre o projeto

### Homepage
A homepage é totalmente responsiva, se adapta a qualquer tamanho de tela, as categorias são exibidas de acordo com o que está cadastrado no banco de dados, portanto, as categorias cadastradas foram comida brasileira, comida japonesa, hambúrgueres, pizzas e sobremesas. Foi criada uma seção customizada para exibir as funcionalidades do app disponível nas lojas Android e iOS, bem como foi criado o mural de testemunhos a cerca da avaliação do usuário com base na experiência de compra.

https://github.com/BrunoCarvalhoFeitosa/ifood/assets/46093815/bc884458-e1b7-48f7-a57d-db044378b3e8

### Categoria
A página de categoria é totalmente responsiva, se adapta a qualquer tamanho de tela, a busca dos produtos é dinâmica, a partir do ID da categoria os produtos e restaurantes relacionados são exibidos. O usuário tem duas ações nesta página, visualizar o produto ou restaurante ou favorita-los.

https://github.com/BrunoCarvalhoFeitosa/ifood/assets/46093815/3588bbfe-ef93-4cc4-83e6-4ef432adb67c

### Produto
A página de produto é totalmente responsiva, se adapta a qualquer tamanho de tela, possui uma galeria contendo todas as imagens do produto, possui mecanismos para dar zoom na imagem ou remover, possui funcionalidade para favoritar o produto, npossui funcionalidade para adicionar o produto ao carrinho, sendo limitado q quantidade de 10 por compra. A funcionalidade de compra possui uma regra específica, caso o usuário adicione um produto de um restaurante diferente, ele tem a opção de prosseguir e remover todos os outros produtos que já estão no carrinho para prosseguir com este novo, ou cancelar e manter os produtos que ele já tinha. Nesta página existe uma vitrine com sugestão de produtos da mesma categoria e também existe a funcionalidade de avaliação, onde ao preencher o campo, o usuário deixa sua opinião exposta na página daquele produto.

https://github.com/BrunoCarvalhoFeitosa/ifood/assets/46093815/73e63837-3f4a-4676-9dc9-6f2d3fe50985

### Checkout
A página de checkout é totalmente responsiva, se adapta a qualquer tamanho de tela, os produtos adicionados ao carrinho são salvos no local storage e são exibidos na página de checkout. Está página exibe os produtos selecionados pelo usuário, exibe o subtotal, o valor de desconto, valor de entrega e o total final. O usuário tem a opção de remover os produtos do carrinho e finalizar sua compra. Ao finaliza-la, os dados são salvos e exibidos na página de minha conta, onde ele pode ver o resumo daquela compra, bem como o status da compra em si.

https://github.com/BrunoCarvalhoFeitosa/ifood/assets/46093815/f6d0db99-ff6d-45e0-9515-690d82ceaefe

### Minha Conta
A página de minha conta é totalmente responsiva, se adapta a qualquer tamanho de tela, nesta página é possível atualizar alguns dos dados pessoais já cadastrados, acompanhar o status dos pedidos que já foram feitos, bem como ver os produtos e restaurantes que foram favoritados e removê-los dos favoritos.

https://github.com/BrunoCarvalhoFeitosa/ifood/assets/46093815/056aadb2-9a0e-485b-be2f-34d2125ae4ad

### Feito com

* [Next.js](https://nextjs.org)
* [Typescript](https://www.typescriptlang.org)
* [Prisma](https://www.prisma.io)
* [PostgreSQL](https://www.postgresql.org)
* [TailwindCSS](https://tailwindcss.com)
* [Vercel](https://vercel.com)

### Hospedagem

A aplicação está em produção neste link: (https://bruno-carvalho-feitosa-ifood.vercel.app).

<!-- GETTING STARTED -->
## Iniciando o projeto

Primeiramente será necessário clonar este projeto em (https://github.com/BrunoCarvalhoFeitosa/ifood.git), após o download será necessário abrir este projeto no seu editor e no terminal digitar npm install ou yarn, posteriormente é só rodar em seu terminal o comando npm run dev ou yarn dev, após isso, a página será aberta em seu navegador.

### Pré-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/BrunoCarvalhoFeitosa/ifood.git
   ```
2. Instale os pacotes do NPM
   ```sh
   npm install ou yarn
   ```
   
3. Inicie o projeto
   ```sh
   npm run dev ou yarn dev
   ```   

<!-- LICENSE -->
## License

Distribuído sob a licença MIT.

<!-- CONTACT -->
## Contato

Bruno Carvalho Feitosa - [GitHub](https://github.com/BrunoCarvalhoFeitosa) - [LinkedIn](https://www.linkedin.com/in/bruno-carvalho-feitosa/)
