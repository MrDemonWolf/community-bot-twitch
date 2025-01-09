# Community Bot for MrDemonWolf, Inc. - Twitch

Community Twitch bot for MrDemonWolf, Inc. Community

Join our community across various platforms! Discover more about us, get the latest updates, and engage with our content. Built by a passionate furry web developer, MrDemonWolf, who loves tech, gaming, and creating engaging experiences for the community.

---

## Getting Started

### Setting Up the Database

Follow these steps to set up your database quickly using Docker:

#### Prerequisites

1. **Install Docker**  
   If you don't already have Docker installed, follow the instructions in the [Docker Documentation](https://docs.docker.com/get-docker/) to set it up.

2. **Install Docker Compose**  
   Docker Compose is usually included with Docker Desktop. If you need to install it separately, follow the guide in the [Docker Compose Documentation](https://docs.docker.com/compose/install/).

#### Steps to Run the Database

1. **Clone the Repository**  
   Ensure you have the repository containing the `docker-compose.yml` file.

2. **Run Docker Compose**  
   Open a terminal in the directory containing the `docker-compose.yml` file and run:
   ```bash
   docker-compose up
   ```

---

### Setting Up Twitch Integration

Follow these steps to generate a Twitch token:

1. **Visit the Twitch Token Generator**  
   Go to [https://twitchtokengenerator.com](https://twitchtokengenerator.com).

2. **Click "Uhhhh what? Just take me to the site."**  
   On the popup that appears, click the **"Uhhhh what? Just take me to the site."** button.

3. **Enter Your Client ID and Client Secret**

   - Obtain your **Client ID** and **Client Secret** from the [Twitch Developer Console](https://dev.twitch.tv/console).
   - Paste them into the respective fields on the site.

4. **Generate Your Token**  
   Follow the prompts to generate your token.

5. **Use Your Token**  
   Copy both the access token and refresh token and paste them into the respective fields in the `.env` file:

   ```env
   TWITCH_APPLICATION_TOKEN=your-access-token
   TWITCH_APPLICATION_REFRESH_TOKEN=your-refresh-token
   ```

   - Set the `TWITCH_APPLICATION_FIRST_RUN` environment variable to `false` after the initial seeding process:

   ```env
   TWITCH_APPLICATION_FIRST_RUN=false
   ```

---

**Note:** Ensure you keep your **Client Secret** and tokens secure. Do not share them publicly.

---

## License

![GitHub license](https://img.shields.io/github/license/MrDemonWolf/community-bot-twitch.svg?style=for-the-badge&logo=github)

---

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out to us on Discord!

- Discord: [Join our server](https://mrdwolf.com/discord)

Thank you for choosing FluffBoost to add motivation and positivity to your Discord server!

Made with ❤️ by [MrDemonWolf, Inc.](https://www.mrdemonwolf.com)
