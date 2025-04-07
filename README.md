# Database
Database and schema exports as a private npm package



# commands

🧼 Recreate test_db from scratch

CREATE DATABASE test_db;

(Optional) Grant all permissions to your user if needed:
GRANT ALL PRIVILEGES ON DATABASE test_db TO postgres;

Switch into the new database:
\c test_db