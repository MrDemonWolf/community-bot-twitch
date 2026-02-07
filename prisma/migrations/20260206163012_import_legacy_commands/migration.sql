-- Import legacy commands from the old bot JSON (45 commands)
-- Mapped from the previous seed script data

INSERT INTO "TwitchChatCommand" ("id", "name", "enabled", "response", "responseType", "globalCooldown", "userCooldown", "accessLevel", "streamStatus", "hidden", "aliases", "keywords", "regex", "limitToUser", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'divi', true, E'Woof! \U0001F43E Ready to build some pawsome websites? I use the Divi WordPress Theme with its front-end builder to make magic happen fast! See how: https://mrdwolf.net/elegantthemes (Heads up: I get a small kickback if you use these links! Thanks for your support! \U0001F60A)', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'font', true, E'Pawsitively in love with this font! It''s Cascadia Code, and it''s 100% free for all you cool cats and coding canines out there! Get it here: https://github.com/microsoft/cascadia-code \U0001F43E\u2728', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'github', true, E'Curious about my code? Here are my GitHub links! Public projects: https://git.new/mrdemonwolf | Personal profile: https://git.new/nathanialhenniges \U0001F60A\U0001F43E', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'lurk', true, E'Thanks for the lurk, @{user}! So glad you''re here! Awoooooooo! \U0001F43A\u2764\uFE0F', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'socials', true, E'Find me on socials! \U0001F449 https://mrdwolf.net \U0001F43A', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['social']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'editortheme', true, E'My current editor theme is Monokai Pro. It''s a premium theme I highly recommend! Find it here: https://monokai.pro/ \U0001F44D', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'time', true, E'{channel} current time is: ${time America/Chicago}', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'hosting', true, E'Looking for hosting? \U0001F914 I recommend Linode, Hetzner, or Hostinger (great for WordPress!). You can check out Hostinger here: https://mrdwolf.net/hostinger and Linode here: https://mrdwolf.net/linode (Heads up: I get a small kickback if you use these links! Thanks for your support! \U0001F60A)', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['linode', 'hostinger']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'discord', true, E'Ready to join the pack? \U0001F43A Come chat with us in the Discord community! Find the invite here: https://mrdwolf.net/discord \U0001F43E', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'website', true, E'Curious about my code adventures and company den? \U0001F609 Paw your way over to my website: https://www.mrdemonwolf.com \U0001F43E\U0001F43A', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['mrdemonwolf']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'manning', false, E'Want ebooks or audiobooks about tech check out http://www.manning.com/?a_aid=mrdemonwolf Make sure to use code MrDemonWolf40 for 40% off your purchase.', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'twitchsupport', false, E'Last Tweet from \U0001F527 ${lasttweet.twitchsupport}', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'lastseen', false, E'{user} was last seen ${user.lastseen} ago and last active in Chat ${user.lastactive} ago. Their last Message was: ${user.lastmessage}', 'MENTION', 5, 10, 'EVERYONE', 'BOTH', false, ARRAY['lastmessage', 'lastactive']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'sac', false, E'Epic''s Support-A-Creator program enables Creators to earn money from Fortnite and games in the Epic games store.  Make sure you use code MrDemonWolf to help support my content.  #epicpartner', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'mysetup', true, E'Step into my digital den! \U0001F3E1 You can read all about my development setup in this blog post: https://www.mrdemonwolf.com/blog/my-development-setup \U0001F43A\U0001F4A1', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'win', true, E'{channel} has gotten ${getcount wins} wins', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['wins']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'addwin', true, E'Updated win  ${count wins}  count.', 'SAY', 5, 15, 'MODERATOR', 'BOTH', true, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'delwin', true, E'Updated win ${count win -1} count.', 'SAY', 5, 15, 'MODERATOR', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'resetwin', true, E'Reseting the wins to ${count wins 0}', 'SAY', 5, 15, 'MODERATOR', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'emotes', false, E'Once you are subscribed you can use any of these emotes in any chat. mrdemo1Bone mrdemo1Gasm mrdemo1Heart mrdemo1Pog mrdemo1Sanity', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'prime', true, E'Wanna help out the stream without spending a bone? \U0001F609 If you have Amazon Prime, you can link it to Twitch for a FREE sub! twitch.amazon.com/prime Every sub helps the pack grow! \U0001F43A\u2764\uFE0F', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'merch', true, E'Looking for the official pack gear? You can find all the current MrDemonWolf designs right here. Thanks for wanting to rep the pack! \U0001F43A https://shop.mrdemonwolf.com', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['shop']::TEXT[], ARRAY['merch']::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'gamertag', true, E'Let''s game! \U0001F525 Find me on these platforms! \U0001F43E\U0001F3AE Xbox: MrDemonWolf #3568 | Minecraft: MrDemonWolf | Steam: MrDemonWolf | Epic: MrDemonWolf \U0001F43A\U0001F680', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['gamertags']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'subscribe', true, E'Join the Demonic Wolf Pack! \U0001F43A\u2728 Subscribe today for awesome perks like FIVE exclusive emotes, ad-free viewing, and more! https://www.twitch.tv/subs/mrdemonwolf Your support is everything! \u2764\uFE0F', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['sub']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'event', false, E'We are currently working on project one of this repo https://github.com/nathanhenniges/6-projects-6-streams due to reaching the community point goal.', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'today', false, E'The pack is ready! \U0001F43A Today we celebrate TWO milestones: 8 years as a Twitch Affiliate AND MrDemonWolf''s birthday! Fuel the celebration by helping us extend the stream! Let''s make this a legendary 24-hour howlin'' bash (and beyond)! Check !subathon for all the ways to join the hunt and add time!', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'irontek', true, E'Looking for a cool spot to work outside the den? \U0001F609 Irontek is a fantastic co-working space! https://www.irontek.co/ Pssst... mentioning my name when you contact them helps me out! Thanks! \U0001F43E\U0001F4BC', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'bakklog', true, E'Want your business to get noticed online? \U0001F914 Bakklog is on a mission to help! They create stunning websites and have experts manage your digital journey so you can focus on what you do best. Find out how: https://bakklog.com \U0001F4BB\U0001F680', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'cod', false, E'Download Call of Dragons for free and reach the goals to support the stream! Use code CODPCGAMER to get in-game rewards! https://strms.net/callofdragons_mrdemonwolf', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'subathon', false, E'HOW THE SUBATHON WORKS: This is MrDemonWolf''s Birthday Bash! We start with a 6-hour base stream which is split into two parts one on Jun 2 & other one on June 29. To keep the tech talks & tail wags going, YOU can add time! \U0001F525 New Follows, $1 Tips, and 100 Bits add +2 minutes each. Tier 1 Sub/Gifted adds +10 minutes. Tier 2 adds +20 minutes. Tier 3 adds a mighty +50 minutes! Join the hunt for a 24-hour stream!', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY['birthday', 'bash']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'goals', false, E'Check out the goals here https://x.com/MrDemonWolf/status/1931015727114600926/photo/1', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'coworking', true, E'What''s a co-working stream? \U0001F609 Think of it as our digital work den! \U0001F43A\U0001F4BB We work on tasks side-by-side, share progress, and keep each other accountable. Perfect for staying productive and feeling part of the pack! \U0001F43E\U0001F31F', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'mine', true, E'/me Awww, the big dragon has sneakily claimed the Chubby Wolf! He''s been adopted! Give him lots of headpats and tell him he''s a good floof!', 'SAY', 5, 15, 'BROADCASTER', 'BOTH', true, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'dance', true, E'${repeat 16 blobDance }', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'hug', true, E'/me @{user} ${random.pick ''wraps'' ''surprises'' ''snuggles'' ''envelopes'' ''squeezes''} ${1|@${random.chatter}} ${random.pick ''with a cuddly hug'' ''with a big bear hug'' ''with a soft and sweet hug'' ''in a warm, comforting embrace'' ''with a gentle, loving squeeze''} ${random.pick '' \u2764 \uFE0F'' '' \U0001F9E1 '' '' \U0001F49B '' '' \U0001F49A '' '' \U0001F499 '' '' \U0001F49C '' '' \U0001F90E '' '' \U0001F5A4 '' '' \U0001F90D '' '' \U0001F49F '' '' \U0001F493 '' '' \U0001F49E '' '' \U0001F495 '' '' \U0001F970 '' '' \U0001F60D '' '' \U0001F618 '' '' \U0001F63B '' '' \U0001F49D ''}', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'weather', true, E'$(weather ${1|''53511''}', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'dragonsquish', true, E'/me {args} gets squished by the big dragon.', 'SAY', 5, 15, 'MODERATOR', 'BOTH', false, ARRAY['dsquish']::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'stepladder', true, E'/me {args} grabs a stepladder.', 'SAY', 5, 5, 'MODERATOR', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'steppies', true, E'/me {args} gets stepped on by the big dragon.', 'SAY', 5, 5, 'MODERATOR', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'masters', false, E'Download Match Masters for free now, and reach the goals to support the stream! https://strms.net/match_masters_mrdemonwolf', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'star', false, E'Download Star Trek Fleet Command using my link, and reach the goals to support the stream. Use code KHANRULES to get in-game rewards! https://strms.net/startrek_mrdemonwolf', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'ram', true, E' @{user} offers a tasty stick of RAM! >> BEEP! << Data successfully nommed. My circuits are buzzing happily! Thank you! =^.^=', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'coworkingtools', true, E'\U0001F43A Wondering what tools the alpha uses to stay on track? For our focus timer, I use Minimal Pomo Timer, and the task list you see is the Chat Task Tic Overlay. You can learn how to add your own tasks by typing !taskh!', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'hydrate', false, E'\U0001F6A8 HYDRATION GOAL: Every 5 Subs = 1 Special Hydrate! \U0001F964 Keep the Wolf watered! \U0001F43A', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW()),

  (gen_random_uuid(), 'wolfwave', true, E'\U0001F43A WolfWave is my custom-built Music + Twitch integration that lets the stream show what the wolf is jamming to in real time! \U0001F3B6\u26A1 Check it out here: https://github.com/MrDemonWolf/WolfWave', 'SAY', 5, 15, 'EVERYONE', 'BOTH', false, ARRAY[]::TEXT[], ARRAY[]::TEXT[], NULL, NULL, NOW(), NOW());
