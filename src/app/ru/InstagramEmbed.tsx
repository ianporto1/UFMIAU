"use client";

import { useEffect } from "react";

interface InstagramEmbedProps {
  postUrl: string;
}

export default function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  useEffect(() => {
    // Se o script já foi carregado, reprocessar os blocos
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
      return;
    }
    // Carregar o script do Instagram
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [postUrl]);

  return (
    <div className="flex justify-center w-full">
      <blockquote
        className="instagram-media w-full"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        data-instgrm-captioned
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "12px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "0",
          maxWidth: "540px",
          minWidth: "326px",
          padding: "0",
          width: "100%",
        }}
      >
        <div style={{ padding: "16px" }}>
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3897f0", fontFamily: "sans-serif", fontSize: "14px", fontWeight: 550, lineHeight: "18px" }}
          >
            Ver post no Instagram
          </a>
        </div>
      </blockquote>
    </div>
  );
}
