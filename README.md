# Warrior Cats by Chapter
Web app that shows the cats of the Warrior Cats book series by chapter.
Add, remove, or modify arcs, books, chapters, and characters.

# Development
Uses Docker to run two containers, PostgreSQL database and a Java Spring boot (semi)RESTful backend that serves the React frontend.

## Environment Variables
Make sure to have a **.env** file at the root directory with `POSTGRES_PASSWORD`, `POSTGRES_DB_NAME`, `POSTGRES_URL`, and `POSTGRES_USER`.
Make sure to have a **.env** file in the **react-frontend** directory with `REACT_APP_API_BASE_URL`.

Preload the database by changing the **service.app.environment.preload.database** to `true` in docker-compose.yml.

# Pre-requisites 
Make sure to have a PostgreSQL docker container:
```docker run --name wcbc-database -e POSTGRES_PASSWORD=mysecretpassword -d postgres-user```

## How to run/build
### run
```docker-compose up```

### build
```docker-compose up --build```

## Other commands
### build
```docker build -t jlegaspy/wcbc . ```

### run
```docker run -p 8080:8080 --name wcbc-app jlegaspy/wcbc```

## Production Notes
Remember to set **spring.jpa.hibernate.ddl-auto** to `validate` in production in **application.yml**.

## Docker
### List containers
```docker container ls```

### Connect to PostgreSQL database through docker
```docker container exec -it wcbc-db-1 psql -U postgres```

### Handy commands
- Show databases: `\l`
- Chose database: `\c wcbc-database`
- Show tables: `\dt`
- Example SQL command: `SELECT * FROM arc;`
- Quit: `\q` (also: `quit` and `exit`)