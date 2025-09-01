import axios from 'axios';
import React from 'react';
import data from "./result.json";
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import * as fabric from "fabric"
const SearchImages = () => {
  const [imageList, setImageList] = React.useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const { canvasEditor } = useCanvasHook()
  const url = "https://api.unsplash.com/search/photos";

  const GetImageList = async (search: string) => {
    if (!search) return; // Prevent empty search call

    // If you want to use real API call, uncomment below and remove mock data usage
    // try {
    //   const result = await axios.get(url, {
    //     params: {
    //       query: search,
    //       page: 1,
    //       per_page: 20,
    //     },
    //     headers: {
    //       Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    //     }
    //   })
    //   setImageList(result.data.results);
    //   console.log({ result })
    // } catch (error) {
    //   console.error(error);
    // }

    // Using mock data
    const result = data;
    setImageList(result.data.results);
    console.log({ result });
  };

  const addImagetoCanvas = async (image_url: string) => {
    const canvasImageRef = await fabric.FabricImage.fromURL(image_url);

    canvasEditor?.add(canvasImageRef);
    canvasEditor?.renderAll()
  }
  React.useEffect(() => {
    GetImageList("gradient");
  }, []);

  return (
    <div className='mt-5'>
      <div className='flex gap-2 items-center my-2'>
        <Input
          placeholder={"Mountain"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={() => GetImageList(searchQuery)}>
          <SearchIcon />
        </Button>
      </div>
      <div className='mt-3 grid grid-cols-2 gap-2 overflow-auto h-[75vh]'>
        {imageList.map((image, i) => (
          <div key={i} onClick={() => { addImagetoCanvas(image.urls.regular) }} className='cursor-pointer'>
            <Image
              src={image.urls.thumb}
              alt={image.alt_description || "Image"}
              width={300}
              height={200}
              className='w-full rounded-sm object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchImages;
