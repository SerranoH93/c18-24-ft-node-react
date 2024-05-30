-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'follower',
    "avatar_url" TEXT NOT NULL
);
INSERT INTO "new_users" ("avatar_url", "email", "first_name", "genre", "id", "last_name", "password", "role") SELECT "avatar_url", "email", "first_name", "genre", "id", "last_name", "password", "role" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check("users");
PRAGMA foreign_keys=ON;
