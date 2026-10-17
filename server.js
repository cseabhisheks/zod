// Simplest Example of Zod with an Express Route
const express = require("express");
const { z } = require("zod");

const app = express();
app.use(express.json());

// Define schema
const userSchema = z.object({
    name: z.string(),
    age: z.number()
});

// POST route
app.post("/users", (req, res) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues
        });
    }

    res.status(201).json({
        message: "Valid data",
        user: result.data
    });
});

app.listen(3000);