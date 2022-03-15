#!/bin/bash

DB_DUMP_LOCATION="/sql-init/init.sql"

echo "*** CREATING DATABASE ***"

psql -U open-grocery < "$DB_DUMP_LOCATION";

echo "*** DATABASE CREATED! ***"