import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const photos = await prisma.photo.findMany({});
    return NextResponse.json(photos);
}

export async function POST(req: Request) {
    const { photoURL, comment } = await req.json();

    const newPhoto = await prisma.photo.create({
        data: {
            url: photoURL,
            comments: [comment],
        },
    });
    return NextResponse.json(newPhoto);
}

export async function PUT(req: Request) {
    const { id, comment } = await req.json();

    const photo = await prisma.photo.update({
        where: {
            id: id,
        },
        data: {
            comments: {
                push: comment,
            },
        },
    });
    return NextResponse.json(photo);
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    const photo = await prisma.photo.delete({
        where: {
            id: id,
        },
    });
    return NextResponse.json(photo);
}
