"use client";

import PhotoCard from "@/Components/PhotoCard/page";
import React from "react";

interface Photo {
    id: number;
    url: string;
    comments: string[];
}

export default function Photo() {
    const [photos, setPhotos] = React.useState<Photo[]>([]);

    React.useEffect(() => {
        try {
            fetch("/api/photos")
                .then((response) => response.json())
                .then((data) => setPhotos(data));
        } catch (error) {
            console.error(error);
        }
    }, []);

    const navigateToUploadPhoto = () => {
        window.location.href = "/photos/add";
    };

    return (
        <div className="flex flex-col items-center bg-zinc-50 pb-12 2xl:px-72 xl:px-48 lg:px-24 md:px-16 sm:px-8 px-4">
            <div className="flex flex-row w-full justify-between pt-4 pb-8">
                <h1 className="text-black text-2xl font-bold mt-8">Photos</h1>
                <button
                    className="bg-blue-500 hover:scale-105 transform transition-transform duration-300 hover:bg-blue-700 text-white font-bold px-4 rounded mt-4"
                    onClick={navigateToUploadPhoto}
                >
                    Upload Photo
                </button>
            </div>
            <div className="space-y-8">
                {photos.map((photo) => (
                    <PhotoCard key={photo.id} photo={photo} />
                ))}
            </div>
        </div>
    );
}
