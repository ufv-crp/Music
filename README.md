<h2 align="center">Web Music :musical_note:</h1>

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/751b7776075d4fd1bd9b1129c4df7762)](https://app.codacy.com/app/ufv-crp/web-music?utm_source=github.com&utm_medium=referral&utm_content=ufv-crp/web-music&utm_campaign=Badge_Grade_Settings)

This project was inspired on [Material Dashboard](https://www.creative-tim.com/product/material-dashboard-react) created by Creative Tim.

### Table of Contents

- [Table of Contents](#table-of-contents)
- [Dependencies](#dependencies)
- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Resources](#resources)
- [License](#license)
- [Useful Links](#useful-links)

### Dependencies

- [Docker](https://docs.docker.com/install/)

Install the Docker via package manager:

```sh
$ sudo apt install docker.io
```

Add the Docker to the group, this allows the Docker usage without root access:

```sh
$ sudo groupadd docker
```

Check the Docker status:

```sh
$ sudo service docker status # start | stop
```

[Docker Cheat Sheet](https://github.com/wsargent/docker-cheat-sheet)

- [Docker Compose](https://docs.docker.com/compose/install/)
  
Install the Docker Compose via package manager:

```sh
$ sudo apt install docker-compose
```

Check the Docker Compose status:

```sh
$ sudo service docker-compose status # start | stop
```

[Docker Compose Cheatsheet](https://gist.github.com/buonzz/054304b3145323c34ed05cb65f1b174f)

- MySQL

Create the MySQL container using Docker and Docker Composer:

```sh
$ docker-compose -f docker-compose.yml up
```

Copy the SQL script to the container
```sh
$ docker cp database/model.sql database-c:.
```

Open the MySQL console:

```sh
$ docker exec -it database-c mysql
```

Generate the SQL model inside the Docker container:

```sh
$ mysql> source /model.sql
```

Inscpect the container information:

```sh
$ docker inspect database-c
```

### Quick start

```sh
# Clone the repository
$ git clone https://github.com/ufv-crp/web-music.git web-music --depth=1

# Open the repository
$ cd web-music

# Install the dependencies
$ yarn i

# Start the serve
$ yarn start

# Generate a build
$ yarn build

# Run the tests
$ yarn test
```

### Documentation

The template documentation is hosted on [Creative Tim](https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial) site.

### Resources

[Material UI Kit React](https://www.creative-tim.com/product/material-kit-react?ref=github-mdr-free)

### License

[Apache License](LICENSE.md)

### Useful Links

[Federal University of Viçoca - Campus Rio Paranaíba](http://www.crp.ufv.br)
