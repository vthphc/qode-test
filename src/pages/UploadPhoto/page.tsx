"use client";

import { Button, Form, Input } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

// model Photo {
//     id        Int       @id @default(autoincrement())
//     url       String
//     comments  String[]
// }

export default function UploadPhoto() {
    const [imageURL, setImageURL] = React.useState("");
    const [description, setDescription] = React.useState("");

    const handleSubmit = async () => {
        if (imageURL === "") {
            alert("Please upload an image");
            return;
        }

        if (description === "") {
            alert("Please enter first comment");
            return;
        }


        try {
            const response = await fetch("/api/photos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    photoURL: imageURL,
                    comment: description,
                }),
            });

            if (response.ok) {
                console.log("Photo uploaded successfully");
            } else {
                console.error("Failed to upload photo");
            }

            window.location.href = "/photos";
        } catch (error) {
            console.error("Failed to upload photo", error);
        }
    };

    return (
        <div className="flex bg-gray-50 h-screen flex-col justify-center items-center w-full p-4 sm:p-12 lg:p-32">
            <Form
                name="upload-image"
                className="w-full bg-white shadow-lg rounded-lg p-6 lg:p-8 space-y-6"
                layout="vertical"
            >
                {/* Image Upload */}
                <CldUploadWidget
                    uploadPreset="plmii4sz"
                    options={{
                        sources: ["local", "url"],
                        multiple: false,
                        maxFiles: 1,
                    }}
                    onSuccess={(result) =>
                        setImageURL(
                            (result?.info as { secure_url: string })
                                ?.secure_url || ""
                        )
                    }
                >
                    {({ open }) => {
                        if (imageURL !== "") {
                            return (
                                <div className="relative mb-4 shadow-md w-[300px] h-[300px] rounded-lg overflow-hidden">
                                    <img
                                        src={imageURL}
                                        className="object-cover w-full h-full rounded-lg"
                                        alt="Uploaded Image"
                                    />
                                    <button
                                        onClick={() => open()}
                                        className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center text-white text-sm font-semibold hover:bg-opacity-70 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        Change Image
                                    </button>
                                </div>
                            );
                        }
                        return (
                            <div className="relative mb-4 shadow-md w-full h-[60px] rounded-lg overflow-hidden">
                                <button
                                    onClick={() => open()}
                                    className="absolute inset-0 w-full h-full bg-gray-200 flex justify-center items-center text-gray-700 font-semibold hover:bg-gray-300 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Upload Product's Image
                                </button>
                            </div>
                        );
                    }}
                </CldUploadWidget>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="First Comment"
                >
                    <Input.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                        placeholder="Enter a brief description of the photo..."
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        className="w-full py-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}