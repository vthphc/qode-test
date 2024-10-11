import React from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

interface Photo {
    id: number;
    url: string;
    comments: string[];
}

export default function PhotoCard({ photo }: { photo: Photo }) {
    const [comment, setComment] = React.useState("");
    const [photoData, setPhotoData] = React.useState<Photo>(photo);

    const handleDelete = async () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this photo?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("/api/photos", {
                method: "DELETE",
                body: JSON.stringify({ id: photoData.id }),
            });
            if (response.ok) {
                console.log("Photo deleted successfully.");
            }

            window.location.reload();
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    const handleAddComment = async () => {
        try {
            const response = await fetch("/api/photos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: photoData.id,
                    comment: comment,
                }),
            });

            if (response.ok) {
                console.log("Comment added successfully.");

                setPhotoData((prevPhoto) => ({
                    ...prevPhoto,
                    comments: [...prevPhoto.comments, comment],
                }));
            } else {
                console.error("Failed to add comment.");
            }

            setComment("");
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    return (
        <div
            key={photoData.id}
            className="flex flex-col bg-white shadow-lg items-center p-4 border border-gray-300 rounded-md"
        >
            <div className="flex w-full pb-4 justify-end">
                <button
                    className="bg-red-500 px-4 py-2 hover:scale-105 transform transition-transform duration-300 hover:bg-red-700 text-white font-bold rounded"
                    onClick={handleDelete}
                >
                    <DeleteOutlined />
                </button>
            </div>
            <img
                src={photoData.url}
                alt="photo"
                className="object-cover w-full h-auto sm:max-w-xs sm:max-h-64 md:max-w-sm md:max-h-72 lg:max-w-md lg:max-h-80 xl:max-w-lg xl:max-h-96 2xl:max-w-2xl 2xl:max-h-xl"
            />
            <div className="mt-4 w-full">
                <h1 className="text-black text-lg font-bold">Comments</h1>
                {photoData.comments.length > 0 ? (
                    <div className="space-y-3 mt-4">
                        {photoData.comments.map((comment, index) => (
                            <div
                                key={index}
                                className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
                            >
                                <p className="text-md text-gray-700">
                                    {comment}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 mt-4">
                        No comments yet.
                    </p>
                )}
            </div>
            <div className="flex flex-row justify-between w-full space-x-4">
                <input
                    type="text"
                    placeholder="Add a comment"
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out hover:shadow-md"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />{" "}
                <button
                    className="bg-blue-500 hover:scale-105 transform transition-transform duration-300 hover:bg-blue-700 text-white font-bold px-4 rounded mt-4"
                    onClick={handleAddComment}
                >
                    <PlusOutlined />
                </button>
            </div>
        </div>
    );
}
