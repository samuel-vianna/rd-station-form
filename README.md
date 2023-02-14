# RD Station Form

A form to register leads integrated with **RD Station** API. To see the application [click here](https://samuel-vianna.github.io/rd-station-form).

## What i used to build

- Next JS: framework
- Chakra-UI: UI lib
- React-hook-form: forms control
- Yup: forms validation
- Axios: fetch requests

## How it works

When the user press the submit button, all the form fields are verified and an error message is displayed if any of them are invalid. If all fields are correctly filled the form will send a request to the RD Station API (using the dummy token provided in the `.env` file) and show the final screen if the request succeeds or an error message if fails.