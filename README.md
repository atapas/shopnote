# shopnote
`shopnote` is a JAMstack application helps in creating notes with shopping items. This application is built to showcase the JAMstack concept using `Fauna`, `Netlify Serverless Functions` and `GatsbyJS`. This is a sample application and should be used only for the learning purpose.

# How to run

This project uses `Fauna` as the data store. Plesae make sure to create an account with [Fauna](https://fauna.com/). Clone this project and follw these steps.

- Create a database in Fauna called, `shopnotes`.
- Upload the [shopnotes.gql](https://github.com/atapas/shopnote/blob/main/shopnotes.gql) file to the database created.
- Create the server secret key.
- Clone the project.
- Chage directory to the project locally(cd shopnote).
- Install `netlify-cli` globally,
 ```shell
 npm install -g netlify-cli
 ```
- Install dependencies,
 ```shell
 yarn install
 ```
- Create a file called `.env` at the root of the project and copy-paste the Fauna Server key as,
 ```shell
 FAUNA_SERVER_SECRET=YOUR_SECRET_KEY
 ```
- Run the commands
 ```shell
 netlify login
 
 netlify dev
 ```
 
You should have the application launched @ http://localhost:8888

# Step-by-step approach
A Step by Step guide to build `shopnote` kind of application is coming soon. Please stay tuned.

# Important Links
- [Netlify Functions](https://www.netlify.com/products/functions/)
- [Fauna GraphQL relations](https://docs.fauna.com/fauna/current/api/graphql/relations)
- [GatsbyJS](http://gatsbyjs.org/)
