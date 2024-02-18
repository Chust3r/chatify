-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Group" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "inviteCode" TEXT NOT NULL,
    "lastActivity" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Group_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Group" ("createdAt", "id", "imageUrl", "inviteCode", "name", "profileId", "updatedAt") SELECT "createdAt", "id", "imageUrl", "inviteCode", "name", "profileId", "updatedAt" FROM "Group";
DROP TABLE "Group";
ALTER TABLE "new_Group" RENAME TO "Group";
CREATE INDEX "Group_profileId_idx" ON "Group"("profileId");
CREATE TABLE "new_Conversation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Conversation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Conversation" ("createdAt", "groupId", "id", "type", "updatedAt") SELECT "createdAt", "groupId", "id", "type", "updatedAt" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
CREATE UNIQUE INDEX "Conversation_groupId_key" ON "Conversation"("groupId");
CREATE INDEX "Conversation_groupId_idx" ON "Conversation"("groupId");
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "fileUrl" TEXT,
    "conversationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("content", "conversationId", "createdAt", "deleted", "fileUrl", "id", "senderId", "updatedAt") SELECT "content", "conversationId", "createdAt", "deleted", "fileUrl", "id", "senderId", "updatedAt" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId");
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
