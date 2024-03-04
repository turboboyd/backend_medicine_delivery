# backend_medicine_delivery

This project is a Node.js-based web application/API. It follows a structured approach to organize the codebase for ease of development and maintenance.

## TechnologiesUsed

This project is built using the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**
- **MongoDB**
- **Mongoose**

## Key Features

- **Medicine Search**: Enables searching for medicines available in specific drug stores by store ID.
- **Store Listings**: Provides a listing of all drug stores, including their names and addresses.
- **Order Placement**: Users can place orders for medicines, specifying their details and the quantity required.

## Configuration

- Copy the `.env.example` to `.env` and adjust the variables according to your environment.

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. Place an Order

- **POST** `/api/stores/order`: Submits a user's order.
  - **Body**:
    ```json
    {
      "address": "Banhof 12",
      "email": "examp2sss2l@example.com",
      "phoneNumber": "02980926098",
      "name": "Denis Aldi",
      "medicines": [
        {
          "medicineId": "65e35aa50a85a5b59aeff693",
          "storeId": "65e307adbff50d7bf6e1c2b7",
          "quantity": 2
        }
      ]
    }
    ```
  - **Success Response**: `Order successful`

### 2. Search for Products by Store

- **GET** `/api/drug-stores/{storeId}/medicines`: Retrieves products available in a specific store.
  - **Response Example**:
    ```json
    {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 17,
      "data": [
        {
          "_id": "65e35aa50a85a5b59aeff692",
          "name": "Paracetamol",
          "availableInStores": [
            {
              "_id": "65e57ff5942266b007553ec1",
              "storeId": "65e307adbff50d7bf6e1c2b1",
              "price": 80,
              "availableQuantity": 50
            }
          ]
        }
      ]
    }
    ```

### 3. Get List of Stores

- **GET** `/api/drug-stores/`: Retrieves a list of all drug stores.
  - **Response Example**:
    ```json
    {
      "currentPage": 1,
      "totalPages": 1,
      "totalData": 9,
      "data": [
        {
          "_id": "65e307adbff50d7bf6e1c2b1",
          "name": "Pharmacy One",
          "address": "1 First Street"
        }
      ]
    }
    ```
    
##  <h3 align="left">📫 Connect with me:</h3>

<p align="left"> 
<a href="https://www.github.com/turboboyd" target="_blank" rel="noreferrer"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github-dark.svg" /> <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" /> <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" width="32" height="32" /> </picture> </a> 
<a href="https://www.linkedin.com/in/denisdaniv" target="_blank" rel="noreferrer"> <picture> <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin-dark.svg" /> <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" /> <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" width="32" height="32" /> </picture> </a>
<a href="https://t.me/turbo_boyd" target="_blank" rel="noreferrer"> 
<picture> 
<img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" width="32" height="32" /> 
</picture> 
</a>
<a href="mailto:denisdaniv1@gmail.com" target="_blank" rel="noreferrer"> 
<picture> 
<img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" width="32" height="32" /> 
</picture> 
</a>
</p>