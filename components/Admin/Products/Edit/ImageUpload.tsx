"use client";

import { iconService } from "@/components/Icons/Icons";
// import { uploadImg } from "@/lib/services/client/uploadImg.client.service";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface Props {
  imgUrl: string | null;
}

export default function ImageUpload({ imgUrl }: Props) {
  const [stateImgUrl, setStateImgUrl] = useState<string | null>(imgUrl);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setStateImgUrl(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
      // const _imgUrl = await uploadImg(file);
      // setStateImgUrl(_imgUrl);
    } catch (error) {
      console.error("error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <label className=" w-48 aspect-square" htmlFor="img-upload">
        {stateImgUrl ? (
          <Image
            src={stateImgUrl}
            alt="product image"
            width={200}
            height={200}
          />
        ) : (
          iconService.UploadImageSvg()
        )}
      </label>
      <input
        type="file"
        id="img-upload"
        name="imgUrl"
        hidden
        onChange={onChange}
        disabled={loading}
      />
    </>
  );
}
