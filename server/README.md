# Roman Numeral Converter API Server

This is a Node.js Express server that provides an API for converting Roman numerals to integers and managing conversion history. It uses MongoDB for data storage.

## Features

- Convert Roman numerals to integers via API
- Validate Roman numeral input
- Store and retrieve conversion history
- Update and delete conversion records

## Project Structure

```
server/
├── app.js                  # Express app configuration (if used)
├── index.js                # Server entry point
├── controllers/
│   └── conversionsController.js  # Request handlers
├── models/
│   └── ConversionModel.js        # Mongoose model
├── routes/
│   └── conversions.js            # API routes
└── utils/
    └── romanUtils.js             # Roman numeral utilities
```

## Prerequisites

- Node.js (v14 or higher recommended)
- npm
- MongoDB (local or remote)

## Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

Start MongoDB if running locally, then:

```bash
npm run serve
```

The server will run on [http://localhost:3000](http://localhost:3000) by default.

## API Endpoints

### Convert Roman to Integer

- **POST** `/api/convert`
- **Body:**
  ```json
  { "roman": "XIV" }
  ```
- **Response:**
  ```json
  { "integer": 14 }
  ```

### Get All Conversions

- **GET** `/api/conversions`
- **Response:** Array of conversion records

### Get Conversion by ID

- **GET** `/api/conversions/:id`

### Update a Conversion

- **PUT** `/api/conversions/:id`
- **Body:**
  ```json
  { "roman": "XX" }
  ```

### Delete a Conversion

- **DELETE** `/api/conversions/:id`

## Example MongoDB Model

```js
{
  roman: "XIV",
  integer: 14,
  createdAt: "2025-07-15T12:00:00Z"
}
```

## License

ISC
