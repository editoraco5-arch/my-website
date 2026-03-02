"use client";

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function ImagePreviewInput({ name, defaultValue = "", placeholder = "https://..." }) {
    const [url, setUrl] = useState(defaultValue);
    const [hasError, setHasError] = useState(false);

    return (
        <div className="flex gap-2">
            <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
                {url && !hasError ? (
                    <img
                        src={url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setHasError(true)}
                        onLoad={() => setHasError(false)}
                    />
                ) : (
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                )}
            </div>
            <input
                name={name}
                type="text"
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value);
                    setHasError(false); // Reset error state on new input
                }}
                placeholder={placeholder}
                dir="ltr"
                className="flex-1 bg-[#0D0D12] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-champagne/50 text-left"
            />
        </div>
    );
}
