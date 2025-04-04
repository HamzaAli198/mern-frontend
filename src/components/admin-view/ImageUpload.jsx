import React, { useEffect, useRef } from "react";
import { Label } from "reactstrap";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const ImageUpload = ({
  ImageFile,
  setImageFile,
  UploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const InputRef = useRef(null);

  const handleImageFileChange = (e) => {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const UploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("my_file", ImageFile);

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );
      console.log("response", response);

      if (response?.data?.sucsess) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (ImageFile !== null) {
      UploadImageToCloudinary();
    }
  }, [ImageFile]);

  const handleRemoveImage = () => {
    setImageFile(null);
    if (InputRef.current) {
      InputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="w-full px-4 max-w-md mx-auto">
        <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
        <div className="border-2 border-dashed p-4 rounded-lg">
          <input
            type="file"
            id="image-upload"
            className="hidden"
            ref={InputRef}
            onChange={handleImageFileChange}
          />
          {!ImageFile ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center cursor-pointer h-32"
            >
              <IoCloudUploadOutline size={80} />
              <span>Click to upload image</span>
            </Label>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CiFileOn className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{ImageFile?.name}</p>
              <button
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={handleRemoveImage}
              >
                <IoMdClose className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
