import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  index: number;
  imageUrl: string;
  handleDeleteImage: (index: number) => void;
};

const ImagePreview: React.FC<Props> = memo(({ index, imageUrl, handleDeleteImage }) => {
  return (
    <div className="relative mb-4">
      <img className="border rounded max-h-60 mx-2" src={imageUrl} />
      {
        <button
          className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
          onClick={(e) => {
            e.preventDefault();
            handleDeleteImage(index);
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} size="2x" />
        </button>
      }
    </div>
  );
});

export default ImagePreview;
