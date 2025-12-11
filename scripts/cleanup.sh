docker-compose down -v --rmi all --remove-orphans
docker builder prune -f
docker buildx prune -f