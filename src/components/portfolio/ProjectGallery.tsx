"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ProjectGallery({ title, images }: { title: string; images: string[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const move = (step: number) => setIndex(current => (current + step + images.length) % images.length);
  const controls = () => images.length > 1 && (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => move(-1)} aria-label={`Captura anterior de ${title}`} className="gallery-arrow"><ArrowLeft size={16} /></button>
      <span aria-live="polite" className="font-mono text-xs text-gray-400">{index + 1} / {images.length}</span>
      <button type="button" onClick={() => move(1)} aria-label={`Captura siguiente de ${title}`} className="gallery-arrow"><ArrowRight size={16} /></button>
    </div>
  );
  return (
    <>
      <div className="project-preview relative aspect-[16/10] overflow-hidden bg-[#0b0c10] border-b border-gray-800">
        <button type="button" onClick={() => setOpen(true)} className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 focus-visible:outline-offset-[-2px]" aria-label={`Ampliar imágenes de ${title}`}>
          <Image src={images[index]} alt={`${title}: captura ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 border-b border-gray-800 px-5 py-3">
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-orange-400 focus-visible:outline focus-visible:outline-orange-500"><Expand size={14} />Ver imágenes</button>
        {controls()}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-5xl bg-[#0b0c10] border-gray-800 p-4 sm:p-6" onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
          <DialogTitle className="text-white pr-6">{title}</DialogTitle>
          <DialogDescription>Capturas del proyecto. Usa las flechas para recorrerlas.</DialogDescription>
          <div className="relative h-[min(65vh,650px)]">
            {open && <Image src={images[index]} alt={`${title}: captura ampliada ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 1000px" className="object-contain" />}
          </div>
          <div className="flex justify-center">{controls()}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
