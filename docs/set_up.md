## Set-by-step tutorial
1. Creat los .env correspondientes
2. docker-compose -f ./docker/docker-compose-dev.yml up --build
3. CREATE DATABASE users-manager; 3. CREATE DATABASE products-manager; 3. CREATE DATABASE sales-manager;
4. docker exec -it {}-manager bash; npm run migrate;