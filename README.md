# Number Classification API

## Introduction
This repository contains a simple RESTful API project that classifies a given number based on its mathematical properties and provides a fun fact about it.

## Requirements

- Technology Stack: 
    - Programming Language: Javascript JS
    - OS: Linux

## Features

- Determines if a number is prime, perfect, Armstrong, even, or odd.
- Computes the sum of digits of the given number.
- Fetches a fun fact about the number from Numbers API.
- Implements CORS support.

## API Endpoint
- **Classify a Number:** `GET /api/classify-number?number=<number>`
- **Example Request:** `GET http://<your-url>:3000/api/classify-number?number=371`
- **Example Response:**
```
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Handling

If a non-numeric input is provided, an error response is returned:
```
{
    "number": "alphabet",
    "error": true
}
```

## Quick Setup

1) Clone the repository:
```
git clone https://github.com/somex6/hng-api-project
cd hng-api-project
```

2) Install dependencies:
`npm install express axios` 

3) Run the server:
`node index.js`

4) The API will be accessible at: `http://<your-url>:3000`