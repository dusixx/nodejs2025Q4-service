export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

sh scripts/cleanup-all.sh

# docker-compose down -v --rmi all --remove-orphans
docker-compose build --no-cache --pull
docker-compose up -d