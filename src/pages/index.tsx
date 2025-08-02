// pages/index.tsx or a component
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ImageEntry = {
  filename: string;
  time: string;
  date: string;
  comments: string;
  tags: string[];
};

export default function GalleryPage() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const { basePath } = useRouter();

  useEffect(() => {
    fetch(`${basePath}/images.json`)
      .then(res => res.json())
      .then(setImages);
  }, []);

  return (
    <div className="p-4 flex flex-wrap gap-4">
      {images.map((img) => (
        <div key={img.filename} className="w-48">
          <img src={`${basePath}/images/${img.filename}`} alt={img.filename} />
          <p className="text-sm">{img.date} {img.time}</p>
        </div>
      ))}
    </div>
  );
}
