// pages/index.tsx or a component
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type ImageEntry = {
  filename: string;
  time: string;
  date: string;
  comments: string;
  tags: string[];
  location: string;
  speckled: string;
  alive: string,
};

type Filter = {
  tags: string[];
  locations: string[];
  alive: string;
  speckled: string[];
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([])
  const [availableSpeckles, setSpeckles] = useState<string[]>([])
  const [filter, setFilter] = useState<Filter>({
    tags: [],
    locations: [],
    alive: 'Alive',
    speckled: [],
  })
  const { basePath } = useRouter();

  useEffect(() => {
    fetch(`${basePath}/images.json`)
      .then(res => res.json())
      .then((data: ImageEntry[]) => {
        setImages(data)

        const locationsSet = new Set(data.map(img => img.location))
          setAvailableLocations(Array.from(locationsSet))

        const availableSpeckles = new Set(data.map(img => img.speckled))
          setSpeckles(Array.from(availableSpeckles))
        })
  }, []);

  const handleLocationChange = (location: string) => {
    if (location === "") {
      setFilter({...filter, locations: []})
      return
    }

    setFilter(prev => {
      const isSelected = prev.locations.includes(location)
      return {
        ...prev,
        locations: isSelected
          ? prev.locations.filter(loc => loc !== location)
          : [...prev.locations, location],
      }
    })
  }

  const handleSpeckleChange = (location: string) => {
    if (location === "") {
      setFilter({...filter, speckled: []})
      return
    }

    setFilter(prev => {
      const isSelected = prev.speckled.includes(location)
      return {
        ...prev,
        speckled: isSelected
          ? prev.speckled.filter(loc => loc !== location)
          : [...prev.speckled, location],
      }
    })
  }

  const filteredImages = images.filter(images => {
    const matchesTags =
      filter.tags.length === 0 || filter.tags.every(tag => images.tags.includes(tag))
  
    const matchesLocations =
      filter.locations.length === 0 || filter.locations.includes(images.location)

    const matchesSpeckles =
      filter.speckled.length === 0 || filter.speckled.includes(images.speckled)
  
    return matchesTags && matchesLocations && matchesSpeckles
  })

  return (
    <>
      <div className="p-4 flex flex-row gap-4 p-4 flex-wrap">
        <div>
          <label className="block mb-2 font-medium">Filter by location</label>
          <div className="flex flex-col gap-1">
            {availableLocations.map(tag => {
                const isSelected = filter.locations.includes(tag);
                return (
                  <button onClick={() => handleLocationChange(tag)} key={tag} value={tag} className={`cursor-pointer px-3 py-1 rounded border ${isSelected ? 'bg-sandstone text-darkpink border-darkpink' : 'bg-light-light-pink text-gray-700 border-darkish-blue'}
                  focus:outline-none`}>
                    {tag}
                  </button>
            )})}
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Filter by speckles</label>
          <div className="flex flex-col gap-1">
          {availableSpeckles.map(tag => {
              const isSelected = filter.speckled.includes(tag);
               return (
                <button onClick={() => handleSpeckleChange(tag)} key={tag} value={tag} className={`cursor-pointer px-3 py-1 rounded border ${isSelected ? 'bg-sandstone text-darkpink border-darkpink' : 'bg-light-light-pink text-gray-700 border-darkish-blue'}
                focus:outline-none`}>
                  {tag}
                </button>
          )})}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-wrap items-stretch gap-4">
      {filteredImages.map((img) => (
        <div key={img.filename} className="flex flex-col md:w-48 w-30 border-darkpink border-2 p-2 bg-light-light-pink">
            <img src={`${basePath}/images/${img.filename}`} alt={img.filename} className="h-auto w-full"/>
            <div className="md:text-sm text-xs mt-auto">{img.date} {img.time} <br /> Location: {img.location} <br /> Speckled: {img.speckled} <br /> Status: {img.alive}</div>
        </div>
      ))}
    </div>
    </>
  );
}
