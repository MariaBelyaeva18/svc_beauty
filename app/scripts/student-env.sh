#!/usr/bin/env bash
# Usage:
#   source ./scripts/student-env.sh

export POSTGRES_HOST="109.198.190.115"
export POSTGRES_PORT="32322"
export POSTGRES_USER="student"
export POSTGRES_PASSWORD="5432"
export POSTGRES_DB="BelyaevaM"

export POSTGRES_STATEMENT_TIMEOUT="30000"
export POSTGRES_POOL_MAX="10"
export POSTGRES_POOL_MIN="0"

export JWT_SECRET="student-secret"
export JWT_EXPIRES_IN_SECONDS="86400"
