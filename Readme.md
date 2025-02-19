# Chess Tournament API

A simple RESTful API to manage chess tournaments.

## Features

- Create and manage tournaments

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/laligb/chess-tournament-api.git
   cd chess-tournament-api
   ```

2. **Install dependencies:**

   - For Node.js/Express.js:
     ```bash
     npm install
     ```

3. **Configure the environment:**

   - Create `.env` and adjust settings as needed.

## Usage

Start the server:

```bash
mongod
node server.js
```

The API will be available at localhost/api/events
For production, access the API here: https://chess-tournament-api.vercel.app/api/events

## API Endpoints

- `GET /events` - List all tournaments
- `POST /events` - Create a new tournament
- `PUT /events/:id` - Update the tournament
- `DELETE /events/:id` - Delete the tournament

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/laligb/chess-tournament-api/issues).

## License

This project is licensed under the [MIT License](LICENSE).
