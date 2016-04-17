# Slack Deletron

This tool allows you to delete your extra Slack files from your team account.

It's built with Express and Passport on the server side, and React and Redux on the client side.

## Contributing

To contribute, fork the repo and then complete the following steps to get up and running.

1. Sign up for the Slack Web API at [https://api.slack.com/web](https://api.slack.com/web) and get yourself a Client ID and a Client Secret. In the 'Redirect URI(s)' field, put `http://localhost:3000/auth/slack/callback`


2. Create a `.env` file in the root of the project and add the following details

    ```
    clientID_DEV=CLIENTIDFROMTHESLACKAPI
    clientSecret_DEV=CLIENTSECRETFROMTHESLACKAPI
    SECRET_DEV=supersupersecretpartytime
    CALLBACK_DEV=http://localhost:3000/auth/slack/callback
    ```
3. Install dependencies

    ```
    npm install
    ```

4. In two separate terminals, run the following commands respectively

    ```
    nodemon server.js
    gulp
    ```

