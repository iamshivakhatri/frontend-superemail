import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb'; // Make sure to adjust this path to where your Prisma instance is configured.

export async function POST(request: Request) {
    try {
        // Get the request body
        const { email, name, profilePic } = await request.json();

        // Validate if email exists
        if (!email || !name || !profilePic) {
            return NextResponse.json({ error: 'Email, Name, and ProfilePic are required.' }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

    

        if (existingUser) {
            // If user exists, return the existing user's details
            const responseUser = {
                userId: existingUser.id, // Assuming your Prisma model has an 'id' field
                email: existingUser.email,
                name: existingUser.name,
                profilePic: existingUser.profilePic,
            };
            console.log('User already exists:', responseUser);
            return NextResponse.json(responseUser, { status: 200 });
        }

        // Create new user in the database
        const newUser = await prismadb.user.create({
            data: {
                email,
                name,
                profilePic,
            },
        });

        // Prepare the response with user information
        const responseUser = {
            userId: newUser.id, // Assuming your Prisma model has an 'id' field
            email: newUser.email,
            name: newUser.name,
            profilePic: newUser.profilePic,
        };

        console.log('User created:', responseUser);

        // Return success response with user info
        return NextResponse.json(responseUser, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
