#!/bin/bash

DB_DUMP_LOCATION="/sql-init/init.sql"

echo "*** Loading SQL file ***"

psql -U open-grocery < "$DB_DUMP_LOCATION"