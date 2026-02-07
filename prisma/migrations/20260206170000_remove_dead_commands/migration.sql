-- Remove dead commands that rely on the Twitter API
DELETE FROM "TwitchChatCommand" WHERE "name" = 'twitchsupport';
