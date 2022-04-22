<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ferdianfh/zwallet-web-app">
    <img src="./assets/zwalletLogoLg.png" alt="ZwalletLogo" width="80" height="80">
  </a>

  <h3 align="center">Zwallet Backend APIs</h3>

  <p align="center">
    A Web Service and Backend APIs for Zwallet Website Application.
    <br />
    <a href="https://github.com/ferdianfh/zwallet-web-app"><strong>View Zwallet Web App »</strong></a>
    <br />

  </p>
</div>

## About The Project

**Zwallet** is A Digital Wallet Website Based Application that offering the simplicity and rapidity for anything related to banking needs, such as, Top Up and Transfer activity.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This backend side app was built with some technologies below:

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JSON Web Token](https://jwt.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Cloudinary](https://cloudinary.com/)
- [Heroku](https://www.heroku.com/)
- [AWS](https://aws.amazon.com/id/)
- [Frontend Repository](https://github.com/ferdianfh/zwallet-web-app)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL Server](https://www.mysql.com/downloads/)
- Nodemon - Download and Install [Nodemon](https://www.npmjs.com/package/nodemon)

### Installation

1. Clone the APIs repo

   ```sh
   git clone https://github.com/ferdianfh/zwallet-backend-api.git
   ```

2. Move to project directory
   ```sh
   cd folder-project
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set Environtment variable in `.env` file

   ```sh
   DB_HOST = YOUR_DB_HOST
   DB_USER = YOUR_DB_USER
   DB_PASSWORD = YOUR_DB_PASSWORD
   DB_NAME = YOUR_TABLE_NAME

   PORT = YOUR_PORT
   SECRET_KEY_JWT = YOUR_SECRET_KEY

   ADMIN_EMAIL_ACCOUNT = YOUR_EMAIL_CONFIRMATION
   ADMIN_EMAIL_PASSWORD = YOUR_EMAIL_PASSWORD

   CLOUDINARY_CLOUD_NAME = YOUR_CLOUD_NAME
   CLOUDINARY_API_KEY = YOUR_CLOUD_API_KEY
   CLOUDINARY_API_SECRET = YOUR_CLOUD_API_SECRET
   ```

5. Start the Application
   ```sh
   npm run dev
   ```

## Postman Collection

This is a postman documentation for each APIs request:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/17519297/Uyr4Jezc)

## API Endpoint

### Base URL

- Start the Application
  ```sh
  https://zwallet-web-service.herokuapp.com/
  ```

### Auth Endpoint

| No  | HTTP Method | URI                       | Operation                                |
| --- | ----------- | ------------------------- | ---------------------------------------- |
| 1   | POST        | users/register            | Register new user                        |
| 2   | POST        | users/login               | Login user                               |
| 3   | POST        | users/verification/:token | Verify Email Addres user                 |
| 4   | POST        | users/PIN/:id             | Create PIN by userId before login to App |

### User Endpoint

| No  | HTTP Method | URI                               | Operation                                   |
| --- | ----------- | --------------------------------- | ------------------------------------------- |
| 1   | GET         | users/profile                     | Get Details profile user                    |
| 2   | PUT         | users/profile                     | Update phone number user                    |
| 3   | PUT         | users/profile/delete-phone-number | Update phone number to null                 |
| 4   | PUT         | users/profile/picture             | Update profile picture user                 |
| 5   | POST        | users/PIN                         | Confirm PIN user with PIN in database       |
| 6   | PUT         | users/PIN                         | Create new PIN after login to App           |
| 7   | PUT         | users/profile/chang-password      | Change password user                        |
| 8   | GET         | users/params?                     | Search user by name                         |
| 9   | GET         | users/details/:id                 | Get details user by userId                  |
| 10  | GET         | users                             | Get list users                              |
| 11  | DELETE      | users/profile/:id                 | Delete user by userId (Admin Authorization) |

### Wallet Endpoint

| No  | HTTP Method | URI                           | Operation                                     |
| --- | ----------- | ----------------------------- | --------------------------------------------- |
| 1   | GET         | wallet                        | Get all user's wallet (Admin's Authorization) |
| 2   | GET         | wallet/topup/list             | Get all users top up history                  |
| 3   | POST        | wallet/topup/method           | Choose topup method                           |
| 4   | PUT         | wallet/topup/input/:id        | Input amount topup by topupId                 |
| 5   | POST        | wallet/topup/confirmation/:id | Confirm topup by topupId and user's PIN       |
| 6   | GET         | wallet/topup/history          | Get topup history user                        |

### Transactions Endpoint

| No  | HTTP Method | URI                          | Operation                                     |
| --- | ----------- | ---------------------------- | --------------------------------------------- |
| 1   | GET         | transaction                  | Get All transactions (Admin's API)            |
| 2   | POST        | transaction/transfer         | Transfer to other user by phone number        |
| 3   | POST        | transaction/confirmation/:id | Confirm transfer by transferId and user's PIN |
| 4   | GET         | transaction/history          | Get user transactions by userId               |

## Related Project

- [Zwallet Frontend](https://github.com/ferdianfh/zwallet-web-app)

## Contact

Ferdi Ferdiana - [Linkedin](https://www.linkedin.com/in/ferdianfh/) - ferdifh82@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>
