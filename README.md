# Zod in Express.js

## What is Zod?

Zod is a JavaScript and TypeScript library used to validate data against a defined schema.

For example, suppose a user registration API expects:

- `name` — a string
- `email` — a valid email address
- `age` — a number greater than or equal to 18

Zod checks whether the received data satisfies these rules.

## Installation

```bash
npm install zod
```

## Example: Validating `req.body` using Zod in a Route

### `index.js`

```javascript
const express = require("express");
const { z } = require("zod");

const app = express();

app.use(express.json());

// Define validation schema
const userSchema = z.object({
    name: z.string(),
    email: z.email(),
    age: z.number().min(18)
});

// Route
app.post("/users", (req, res) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues
        });
    }

    res.status(201).json({
        message: "User data is valid",
        user: result.data
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Request Body

```json
{
    "name": "Abhishek",
    "email": "abhishek@example.com",
    "age": 22
}
```

### Output

```json
{
    "message": "User data is valid",
    "user": {
        "name": "Abhishek",
        "email": "abhishek@example.com",
        "age": 22
    }
}
```

If the email is invalid or the age is below 18, Zod returns validation errors, and the route responds with status `400`.

## Validating `req.params` and `req.query`

- `req.body` — data sent in the request body.
- `req.params` — values from route parameters, such as `/users/:id`.
- `req.query` — values from the query string, such as `/users?page=2`.

Example schemas:

```javascript
const paramsSchema = z.object({
    id: z.string().min(1)
});

const querySchema = z.object({
    page: z.string()
});
```

Usage inside a route:

```javascript
app.get("/users/:id", (req, res) => {
    const params = paramsSchema.safeParse(req.params);
    const query = querySchema.safeParse(req.query);

    if (!params.success || !query.success) {
        return res.status(400).json({
            message: "Invalid parameters or query"
        });
    }

    res.json({
        id: params.data.id,
        page: query.data.page
    });
});
```

Request:

```text
GET /users/123?page=2
```

Output:

```json
{
    "id": "123",
    "page": "2"
}
```

**Remember:** Route parameters and query parameters are strings by default. Use `z.coerce.number()` when you need to convert a numeric string into a number.

## Important Zod Methods

| Method | Purpose |
|---|---|
| `z.object({})` | Defines an object schema |
| `z.string()` | Validates a string |
| `z.number()` | Validates a number |
| `z.email()` | Validates an email address |
| `.min(18)` | Sets a minimum numeric value |
| `.min(1)` | Sets a minimum string length |
| `.optional()` | Makes a field optional |
| `.safeParse(data)` | Validates data without throwing an exception |
| `.parse(data)` | Validates data and throws an error if invalid |
| `z.coerce.number()` | Converts compatible input into a number before validation |

**Remember:** Use `safeParse()` when you want to handle validation errors manually without a thrown exception.
