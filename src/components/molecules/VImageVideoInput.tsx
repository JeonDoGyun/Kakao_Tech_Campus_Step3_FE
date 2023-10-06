import FileInput from 'components/atoms/FileInput';

interface VImageVideoInputProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadButtonClick: () => void;
  imageRef: React.RefObject<HTMLInputElement>;
  videoRef: React.RefObject<HTMLInputElement>;
  handleCustomButtonClick: (file: React.RefObject<HTMLInputElement>) => void;
  isImageSelected: boolean;
  isVideoSelected: boolean;
}

const VImageVideoInput = (props: VImageVideoInputProps) => {
  const {
    handleInputChange,
    handleUploadButtonClick,
    imageRef,
    videoRef,
    handleCustomButtonClick,
    isImageSelected,
    isVideoSelected,
  } = props;

  return (
    <div className="flex flex-col">
      <button onClick={handleUploadButtonClick}>확인</button>
      <FileInput
        handleInputChange={handleInputChange}
        handleCustomButtonClick={handleCustomButtonClick}
        fileRef={imageRef}
        isFileSelected={isImageSelected}
        fileType="image"
        labelText="애니모리 친구들 프로필에 올라갈 사진을 업로드해주세요."
      />
      <FileInput
        handleInputChange={handleInputChange}
        handleCustomButtonClick={handleCustomButtonClick}
        fileRef={videoRef}
        isFileSelected={isVideoSelected}
        fileType="video"
        labelText="애니모리의 숏폼에 올라갈 짧은 동영상을 업로드해주세요."
      />
    </div>
  );
};

export default VImageVideoInput;
