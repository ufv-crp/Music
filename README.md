### Music

Application for music school management

#### Setup

<details>
<summary>Yarn</summary>
Configure the repository:

```sh
sudo curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

Update the source list:

```sh
sudo apt update
```

Install Yarn:

```sh
sudo apt install yarn
```

</details>

<details>
<summary>Project Dependencies</summary>
Install project dependencies:

```sh
yarn install
```

</details>

<details>
<summary>API</summary>

This project was built in a modularized way, this means that this is the front-end and the back-end is in a separete [project](https://github.com/Sphinxs/Graph). Access the Graphql API [project](https://github.com/Sphinxs/Graph) to set the API.

</details>

#### Run

<details>
<summary>Start</summary>
Start the application:

```sh
yarn start
```

Open the [localhost:4000](http://localhost:4000) URL in the browser. If is there already a service running at this port, try to kill the service `fuser -k 4000/tcp`.

</details>

#### Deploy

This project can be deployed of different ways: using Docker or Docker Compose, generating a build and serving it through NGINX, Traefik or any other proxy  / server and using PM2 by installing it `yarn global add pmp`, generating a build and starting the service `pm2 start application.config.json`; or just `export PORT=4000 && pm2 start node_modules/react-scripts/scripts/start.js --name "music"`.

#### Collections

Collections can be found in the [Graphql API](https://github.com/Sphinxs/Graph/tree/master/collections) project, to test the API, besides the interface implemented here.

#### Debug

To debug this project, you can use the [Visual Studio Code](https://code.visualstudio.com/) and [GraphiQL](https://github.com/graphql/graphiql). To understand the schema, you can use the [GraphQL Editor](https://app.graphqleditor.com/grapher/grapher).

To understand the state you can use the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), once the state is built using the React context native API - change the `encryptLocalStorage = true` to `false` at the _src/states/utils.js_ to see the state persisted at the local storage.

#### Style

This project follow the [Prettier](https://prettier.io/) guide lines.

#### Publication

This project was developed as an extension project at the Federal University of Viçosa and published in the [UFG Journal](https://www.revistas.ufg.br/revistaufg). The article is available [here](https://www.revistas.ufg.br/revistaufg/article/view/60606/34032). The API intends to be a reusable project, while the front-end attend the requirements of a specific school, but can also be reusable.

#### Credits

Developed by [Iguit0](https://github.com/iguit0) and [Sphinxs](https://github.com/Sphinxs).
