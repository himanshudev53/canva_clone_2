import React from 'react'
import { StickerList } from '../Options'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import * as fabric from 'fabric';
import ImageKit from 'imagekit';

const Stickers: React.FC = () => {
    const { canvasEditor } = useCanvasHook();
    var imagekit = new ImageKit({
        publicKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY),
        privateKey: String(process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY),
        urlEndpoint: String(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)
    });
    const handleStickerClick = async (stickerUrl: string) => {
        const canvasImageRef = await fabric.FabricImage.fromURL(stickerUrl);

        canvasEditor?.add(canvasImageRef);
        canvasEditor?.renderAll()
    }
    return (
        <div style={{
            maxWidth: 480,
            margin: "0 auto",
            maxHeight: "60vh",
            overflow: "scroll",
            padding: 20,
            background: "#f8f9fa",
            borderRadius: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.13)"
        }}>
            <h2 style={{ marginBottom: 16, fontWeight: 600 }}>Stickers</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(64px, 1fr))",
                    gap: 16
                }}
            >
                {StickerList.map((stickerUrl, i) => (
                    <div
                        key={stickerUrl}
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: 12,
                            boxShadow: "0 1px 3px rgba(80,90,100,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "box-shadow 0.2s"
                        }}
                        onClick={() => handleStickerClick(stickerUrl)}
                    >
                        <img
                            src={stickerUrl}
                            alt={`Sticker ${i + 1}`}
                            style={{ width: 40, height: 40, objectFit: "contain" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Stickers
