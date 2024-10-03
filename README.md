# Request Header Parser Microservice

This is a **Request Header Parser** microservice built using **Next.js**. It is deployed on [Vercel](https://vercel.com/) and provides an API endpoint that returns information about the client's IP address, language, and operating system based on the HTTP request headers.

## Features

- Parses client IP address
- Detects language from the `Accept-Language` header
- Identifies the software/operating system from the `User-Agent` header
- Built using **Next.js** with a simple frontend and backend API integration

## Demo

You can check out the live demo of the project here: [Live Demo](https://header-parser-black.vercel.app/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js v14 or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/request-header-parser.git
   cd request-header-parser

    Install dependencies:

    bash
   ```

npm install

Run the development server:

bash

    npm run dev

    Open your browser and navigate to http://localhost:3000.

Building for Production

    To build the project for production, run:

    bash

npm run build

After building, you can start the production server with:

bash

    npm start

API Documentation
GET /api/whoami

Returns an object with the following details about the request:

    ipaddress: Client's IP address
    language: Preferred language from the Accept-Language header
    software: The client's operating system from the User-Agent header

Example Response:

json

{
"ipaddress": "192.168.1.1",
"language": "en-US",
"software": "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
}

Technologies Used

    Next.js - The React Framework for production
    Node.js - JavaScript runtime for server-side code
    HTML/CSS - For the frontend layout and styling

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements

    Thanks to Vercel for providing an easy-to-use deployment platform.
    Built with ❤️ by Naele
