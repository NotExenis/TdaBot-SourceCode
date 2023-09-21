Dankjewel om de TDA-BOT gebruikt te hebben afgelopen jaar!

Ik (siebe_b) ben gestopt met de hosting van de TDA BOT, je kan vanaf nu de bot zelf hosten via de code in deze repository.

Hoe host ik de bot?
1. Maak een bot aan op de Discord Developer Portal (https://discord.com/developers/applications)
2. Download NodeJS (https://nodejs.org/en/download/)
3. Installeer alle dependencies met `npm ci` of `npm install`
4. Vul de src/assets/config.json in met de juiste gegevens
5. Pas de .env aan met de juiste gegevens (Bot token en MongoDB uri)
6. Voor een mongodb database kan je gebruik maken van MongoDB Atlas (https://www.mongodb.com/cloud/atlas) [GRATIS]
7. Start de bot met `npm start`

8. Optioneel: In tdabot.guilds.json vind je de data terug van de database (genomen op 31 augustus 2023). Je kan deze importeren in je database onder de guilds collection (table). Je kan ook manueel alles terug zetten via commands.

Als er iets niet lukt, probeer het zelf even te fixen (Zoek het op via google of vraag ChatGPT). Lukt het nog steeds niet na het onderzocht te hebben mag je mij (siebe_b) contacteren via discord.