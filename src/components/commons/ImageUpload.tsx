import { useRef } from "react";
import styled from "styled-components";

const ImageFileUploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(5, 5, 5, 0.12);
  border-radius: 8px;
`;

const ImagePreview = styled.img`
  background-size: cover;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

interface ImageUploadProps {
  setImgFile: (imgFile: string) => void;
  imgFile: string;
  htmlFor: string;
}

function ImageUpload({ setImgFile, imgFile }: ImageUploadProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const htmlFor = `imgFileUpload_${Math.random()}`;

  const saveImgFile = () => {
    if (
      imgRef.current &&
      imgRef.current.files &&
      imgRef.current.files.length === 1
    ) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) {
          setImgFile(reader.result.toString());
        }
      };
    }
  };

  return (
    <div>
      {imgFile ? (
        <ImageFileUploadLabel htmlFor={htmlFor}>
          <ImagePreview src={imgFile} alt="img" />
        </ImageFileUploadLabel>
      ) : (
        <ImageFileUploadLabel htmlFor={htmlFor}>
          <div>+</div>
          <div>이미지 추가</div>
        </ImageFileUploadLabel>
      )}

      <input
        type="file"
        accept="image/*"
        id={htmlFor}
        style={{ visibility: "hidden" }}
        onChange={saveImgFile}
        ref={imgRef}
      />
    </div>
  );
}

export default ImageUpload;
