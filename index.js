const { z } = require("zod");//npm i zod
// Define schema
const userSchema = z.object({
    // String validation
    name: z.string().min(3).max(30).trim(), // Length and whitespace
    email: z.string().email(), // Valid email format
    website: z.string().url(), // Valid URL
    password: z.string().min(8).max(100), // Password length
    username: z.string().regex(/^[a-zA-Z0-9_]+$/), // Pattern matching
    // Number validation
    age: z.number().int().min(18).max(100), // Integer within range
    // Other data types
    isActive: z.boolean(), // Boolean
    skills: z.array(z.string()).min(1).max(10), // Array with 1–10 items
    role: z.enum(["user", "admin"]), // Allowed values only
    acceptedTerms: z.literal(true), // Must be exactly true
    // Optional, nullable and default values
    phone: z.string().optional(), // Field may be omitted
    bio: z.string().nullable(), // Value may be null
    status: z.string().default("active") // Default if undefined
});
// Example input
const user = {
    name: "Abhishek",
    email: "abhishek@example.com",
    website: "https://example.com",
    password: "secure123",
    username: "abhishek_123",
    age: 21,
    isActive: true,
    skills: ["JavaScript", "React"],
    role: "user",
    acceptedTerms: true,
    bio: null
};
// parse() — returns validated data or throws ZodError
try {
    const result = userSchema.parse(user);
    console.log("Valid data:", result);
} catch (error) {
    console.log("Validation failed:", error.issues);
}
// safeParse() — returns a success/error result
// Success: { success: true, data: validatedData }
// Failure: { success: false, error: ZodError }
const result = userSchema.safeParse(user);

if (result.success) {
    console.log("Success:", result.data);
} else {
    console.log("Errors:", result.error.issues);
}
