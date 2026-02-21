# MRG Contact Worker

This is a Cloudflare Worker that handles contact form submissions by sending emails using [MailChannels](https://mailchannels.com/). It is designed to be a lightweight, serverless endpoint for your contact form.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- A [Cloudflare](https://dash.cloudflare.com/) account

## Setup

1. Open a terminal and navigate to the `worker` directory:
   ```bash
   cd worker
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Configuration

The configuration variables are located in `wrangler.toml`. Before deploying, you can update them if needed:

- `RECIPIENT_EMAIL`: The destination email address where the contact form submissions will be sent.
- `FROM_EMAIL`: The email address the messages will appear to be sent from (e.g., `contact@mrgdevelops.com`).
- `FROM_NAME`: The display name of the sender.
- `ALLOWED_ORIGIN`: The URL of your frontend application to configure CORS (e.g., `https://mrgdevelops.com`).

_(Note: During local development, the worker allows any origin.)_

## Local Development

To run the worker locally for testing:

```bash
npm run dev
```

This will start a local Cloudflare worker development server, usually at `http://localhost:8787`. You can test the endpoint using `curl` or Postman by sending a POST request with a JSON body containing `name`, `email`, and `message`.

## Deployment

To deploy the worker to Cloudflare:

1. If you haven't authenticated Wrangler with your Cloudflare account yet, you may be prompted to log in:
   ```bash
   npx wrangler login
   ```
2. Run the deployment script:
   ```bash
   npm run deploy
   ```

This process will bundle the worker and upload it to your Cloudflare account. Once finished, Wrangler will display the live URL where your worker is hosted.

You can then update your frontend application to point its contact form submissions to this live URL.
