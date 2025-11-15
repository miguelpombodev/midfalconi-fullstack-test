#!/bin/sh

set -e 

echo "Running database migrations"
pnpm run migration:run:prod

echo "Running database seeds"
pnpm run seed:run

echo "Starting the application"
exec "$@"