# Tugas Asisten Lab Programming

# Deskripsi Persoalan

BNMO (dibaca: Binomo) adalah sebuah robot video game console yang dimiliki oleh Indra dan Doni. Saat ini, BNMO memiliki beragam fitur seperti inventarisasi dan toko game. Karena sudah bosan dengan dunia video game yang tidak memberikan untung, Indra dan Doni ingin memasuki dan mengenal dunia fintech. Mereka ingin menambah fitur integrasi bank pada BNMO yang memiliki fitur-fitur seperti transfer dan deposit uang. Tetapi, Indra dan Doni tidak cukup ahli dalam ngoding.


## About The Project

**Gwallet** adalah project yang dibuat untuk menjadi solusi dari permasalahan di atas.

## Design Pattern yang dipakai
1. Singleton
- Sebuah objek bisa dikatakan Singleton, apabila hanya memiliki sebuah instance yang digunakan diseluruh kode logic yang dipakai. Oleh Karena itu, pada projek ini program yang dihubungkan ke database hanya membuat satu buah objek. Sehingga program yang dihubunkan ke database mengandung singleton pattern.
2. Object pool
- Object Pool merupakan pola design pattern yang menggunakan serangkaian objek yang sudah diinisialisasi dan siap digunakan sesuai dengan permintaan. Pada projek ini masing-masing objek yang sudah diinisialisasi siap digunakan sesuai dengan transaksi yang dilakukan.
3. Facade
- Pada facade pattern merupakan pola design pattern yang tidak peduli proses apa saja yang dilakukannya untuk memenuhi permintaan yang dilakukan. Pada program ini, pada saat melakukan suatu action baik itu transaksi atau pun yang lain-lain. Sistem akan memanggil action itu saja tanpa melakukan proses didalamnya (karena proses didalamnya akan dikerjakan oleh action itu tanpa harus diketahui oleh yang direquest).

### Built With

Adapun beberapa teknologi yang dipakai untuk membuat project ini :

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JSON Web Token](https://jwt.io/)
- [Multer](https://www.npmjs.com/package/multer)
- [Nodemailer](https://nodemailer.com/about/)
- [Cloudinary](https://cloudinary.com/)
- [Heroku](https://www.heroku.com/)
- [Frontend Repository](https://github.com/gilanglahat22/gwallet_frontend)

## Getting Started

### Requirements

- Node.js - Download dan Install [Node.js](https://nodejs.org/en/).
- Nodemon - Download dan Install [Nodemon](https://www.npmjs.com/package/nodemon)
- MySQL - Download dan Install [MySQL Server](https://www.mysql.com/downloads/)

### How to Use

1. Clone the APIs repo

   ```sh
   git clone https://github.com/gilanglahat22/gwallet_backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set Environtment variable in `.env` file

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

4. Start the Application
   ```sh
   npm run dev or npm start
   ```

## API Endpoint

### Base URL

- Deployed URL
  ```sh
  https://gwallet-labpro-2022.herokuapp.com/
  ```
- Local URL
  ```sh
  http://localhost:PORT/
  ```

### Auth Endpoint

| No  | HTTP Method | URI                       | Operation                                |
| --- | ----------- | ------------------------- | ---------------------------------------- |
| 1   | POST        | users/register            | Register new user                        |
| 2   | POST        | users/login               | Login user                               |
| 3   | POST        | users/verification/:token | Verify Email Addres user                 |
| 4   | POST        | users/PIN/:id             | Create PIN by userId before login to App |

### Wallet Endpoint

| No  | HTTP Method | URI                           | Operation                                     |
| --- | ----------- | ----------------------------- | --------------------------------------------- |
| 1   | GET         | wallet                        | Get all user's wallet (Admin's Authorization) |
| 2   | GET         | wallet/topup/list             | Get all users top up history                  |
| 3   | POST        | wallet/topup/method           | Choose topup method                           |
| 4   | PUT         | wallet/topup/input/:id        | Input amount topup by topupId                 |
| 5   | POST        | wallet/topup/confirmation/:id | Confirm topup by topupId and user's PIN       |
| 6   | GET         | wallet/topup/history          | Get topup history user                        |

### Users Endpoint

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

### Transactions Endpoint

| No  | HTTP Method | URI                          | Operation                                     |
| --- | ----------- | ---------------------------- | --------------------------------------------- |
| 1   | GET         | transaction                  | Get All transactions (Admin's API)            |
| 2   | POST        | transaction/transfer         | Transfer to other user by phone number        |
| 3   | POST        | transaction/confirmation/:id | Confirm transfer by transferId and user's PIN |
| 4   | GET         | transaction/history          | Get user transactions by userId               |

## Author

- Muhammad Gilang Ramadhan (13520137)
## Contact
- 13520137@std.stei.itb.ac.id
