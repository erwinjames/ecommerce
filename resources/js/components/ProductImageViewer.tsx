import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useState } from 'react';

interface ProductImageViewerProps {
    src: string;
    alt: string;
    className?: string;
}

export function ProductImageViewer({ src, alt, className }: ProductImageViewerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [is360Mode, setIs360Mode] = useState(false);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
    const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;

        if (is360Mode) {
            // 360 Rotation Logic
            setRotation((prev) => prev + deltaX * 0.5);
            setStartPos({ x: e.clientX, y: e.clientY });
        } else if (scale > 1) {
            // Pan Logic
            setPosition((prev) => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY,
            }));
            setStartPos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const resetView = () => {
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
        setIs360Mode(false);
    };

    return (
        <>
            <div
                className={`cursor-zoom-in ${className}`}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetView();
            }}>
                <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden bg-black/95 border-zinc-800">
                    <DialogTitle className="sr-only">View {alt}</DialogTitle>

                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-1000">
                        <div
                            className="relative transition-transform duration-75 ease-out"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotateY(${is360Mode ? rotation : 0}deg) rotate(${!is360Mode ? rotation : 0}deg)`,
                                cursor: isDragging ? 'grabbing' : (is360Mode ? 'grab' : (scale > 1 ? 'grab' : 'default')),
                                transformStyle: 'preserve-3d',
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="max-h-[70vh] max-w-full object-contain select-none pointer-events-none"
                                style={{ backfaceVisibility: 'visible' }}
                            />
                        </div>

                        {/* Controls */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                            <Button
                                variant={is360Mode ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => {
                                    setIs360Mode(!is360Mode);
                                    setRotation(0);
                                    setPosition({ x: 0, y: 0 });
                                }}
                                className={`rounded-full px-4 font-medium ${is360Mode ? 'bg-white text-black' : 'text-white hover:bg-white/20'}`}
                            >
                                360° View
                            </Button>
                            <div className="w-px h-6 bg-white/20 mx-1" />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomOut}
                                disabled={scale <= 1 || is360Mode}
                                className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                            >
                                <ZoomOut className="w-5 h-5" />
                            </Button>
                            <span className="text-white text-sm font-medium min-w-[3rem] text-center">
                                {Math.round(scale * 100)}%
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomIn}
                                disabled={scale >= 4 || is360Mode}
                                className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </Button>
                            <div className="w-px h-6 bg-white/20 mx-1" />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleRotate}
                                disabled={is360Mode}
                                className="text-white hover:bg-white/20 rounded-full h-10 w-10"
                                title="Rotate 90°"
                            >
                                <RotateCw className="w-5 h-5" />
                            </Button>
                        </div>

                        {is360Mode && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-fade-out">
                                <div className="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-md">
                                    Drag to Rotate
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
