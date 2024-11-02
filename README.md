# Web Scraping de Imóveis

Esta aplicação de **Web Scraping** em **TypeScript** foi desenvolvida para extrair dados de imóveis a partir dos sites https://www.vivareal.com.br/ e https://www.zapimoveis.com.br, utilizando **APIs ocultas (hidden APIs)** para obter informações de forma eficiente.

Esse projeto foi realizado durante meu estágio na Secretária Municipal da Fazenda, em Foz do Iguaçu, PR.

## Funcionalidades

-   Extração de dados de imóveis dos 2 sites.
-   Utilização de **hidden APIs** para garantir uma coleta de dados mais rápida e direta.
-   Dados coletados incluem informações como preço, localização, tamanho, e outros detalhes relevantes dos imóveis.
- Os dados extraídos são salvos em um banco de dados **MySQL**, utilizando **Prisma** como ORM.
- A aplicação usa um agente proxy para uso em ambientes corporativos.

## Tecnologias Utilizadas

-   **TypeScript**: Linguagem principal utilizada no desenvolvimento.
-   **Node.js**: Ambiente de execução do código.
-   **node-fetch**: Biblioteca que modifica o fetch nativo para aceitar agentes proxy.
-   **Prisma**: ORM utilizado para gerenciar e interagir com o banco de dados MySQL.
-   **MySQL**: Banco de dados onde os dados dos imóveis são armazenados.

## Como Executar

1.  Clone este repositório:
    
    `git clone https://github.com/bernardotonin/real-state-scraper.git` 
    
2.  Acesse o diretório do projeto:

    `cd real-state-scraper` 
    
3.  Instale as dependências:

    `npm install` 
    
5.  Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente **DATABASE_URL**, referente ao endereço do seu banco de dados MySQL
   
7.  No arquivo `/src/lib/constants.ts` adicione o endereço proxy desejado.
    
    
8.  Execute as migrações do banco de dados:
   
    `npx prisma migrate dev` 
    
9.  Execute o script de scraping:
    
    `npm start` 
