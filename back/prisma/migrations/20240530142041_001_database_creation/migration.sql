-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'follower',
    "avatar_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "celebrities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "celebrity_alias" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "active_region" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "id_image_url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "celebrities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "event_poster_url" TEXT NOT NULL,
    "celebrity_id" INTEGER NOT NULL,
    CONSTRAINT "events_celebrity_id_fkey" FOREIGN KEY ("celebrity_id") REFERENCES "celebrities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users_events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    CONSTRAINT "users_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "celebrities_celebrity_alias_key" ON "celebrities"("celebrity_alias");

-- CreateIndex
CREATE UNIQUE INDEX "celebrities_user_id_key" ON "celebrities"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "events_name_key" ON "events"("name");
