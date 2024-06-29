import React, { useState, useRef, useEffect } from 'react';
import Modal from '@components/Modal';

const AvatarEditor = ({ onConfirm }) => {
    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [modalOpen, setModalOpen] = useState(false);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const containerRef = useRef(null);
    const isDraggingRef = useRef(false);
    const lastMousePositionRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (image) {
            const aspectRatio = image.width / image.height;
            const canvasSize = 250;
            const initialScale = canvasSize / (image.width > image.height ? image.width : image.height);
            setScale(initialScale);

            // Calculate initial position to center the image
            const initialX = (canvasSize - image.width * initialScale) / 2;
            const initialY = (canvasSize - image.height * initialScale) / 2;
            setPosition({ x: initialX, y: initialY });

            drawImage(image, initialX, initialY, initialScale);
        }
    }, [image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    setImage(img);
                    setModalOpen(true);
                };
            };
            reader.readAsDataURL(file);
        } else {
            // Handle cancellation: reset image state and input value
            setImage(null);
            e.target.value = null; // Reset the input value to allow re-selection of the same file
        }
    };

    const handleScaleChange = (e) => {
        const newScale = parseFloat(e.target.value);
        setScale(newScale);
        if (image) {
            drawImage(image, position.x, position.y, newScale);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        isDraggingRef.current = true;
        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;

        const dx = e.clientX - lastMousePositionRef.current.x;
        const dy = e.clientY - lastMousePositionRef.current.y;

        const newPosX = position.x + dx;
        const newPosY = position.y + dy;

        setPosition({ x: newPosX, y: newPosY });
        drawImage(image, newPosX, newPosY, scale);

        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const drawImage = (img, x, y, scale) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error('Canvas element not found.');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context from canvas.');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const aspectRatio = img.width / img.height;
        let drawWidth = img.width * scale;
        let drawHeight = img.height * scale;

        // Calculate the top-left corner to center the image
        const drawX = x + (250 - drawWidth) / 2;
        const drawY = y + (250 - drawHeight) / 2;

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            drawImage(image, position.x, position.y, scale);
        }
    }, [image, position.x, position.y, scale]);

    const handleModalClose = (confirmed) => {
        if (confirmed) {
            const canvas = canvasRef.current;
            if (canvas) {
                // Convert canvas to JPEG image data URL
                const dataURL = canvas.toDataURL('image/jpeg');
                onConfirm(dataURL); // Pass the JPEG data URL to the onConfirm callback
            }
        } else {
            // Reset image and input if not confirmed
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Reset the input value to allow re-selection of the same file
            }
        }
        setModalOpen(false);
    };

    const renderBody = () => (
        <div className="relative">
            <div
                ref={containerRef}
                className="w-[250px] cursor-move rounded-full aspect-square dark:border-gray-600 border-2 border-gray-600 overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Handle mouse leaving container
            >
                <canvas
                    ref={canvasRef}
                    width={250}
                    height={250}
                    className="w-full h-full"
                />
            </div>
            <br />
            {image && (
                <>
                    <div className="flex flex-grow">
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.01"
                            value={scale}
                            onChange={handleScaleChange}
                            className="w-full dark:bg-gray-700 bg-zinc-400"
                        />
                    </div>
                </>
            )}
        </div>
    );

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                className="flex flex-grow w-full dark:bg-gray-700 bg-zinc-400 p-2 rounded-lg"
            />
            <Modal isOpen={modalOpen} onClose={() => handleModalClose(false)} onConfirm={() => handleModalClose(true)}>
                <div className="py-4 px-2 text-center flex flex-grow justify-center items-center flex-col gap-4">
                    <p className="mb-4 font-bold text-xl">¿Estás seguro de que quieres subir la imagen?</p>
                    {renderBody()}
                </div>
            </Modal>
        </>
    );
};

export default AvatarEditor;
