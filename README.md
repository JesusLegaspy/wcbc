## Environment Variables
Make sure to have a **.env** file at the root directory with `POSTGRES_PASSWORD`.
Also have a **.env** file in **react-frontend** with `REACT_APP_API_BASE_URL`.

## How to run/build
### run
docker-compose up

### build
docker-compose up --build

## Other commands
### build
docker build -t jlegaspy/wcbc . 

### run
docker run -p 8080:8080 --name wcbc-app jlegaspy/wcbc
