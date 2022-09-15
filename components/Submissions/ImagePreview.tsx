import { memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  imageUrls: string[];
  handleClickDelete: (index: number) => void;
  maxHeight: string;
};

const ImagePreview: React.FC<Props> = memo(({ imageUrls, handleClickDelete, maxHeight }) => {
  return (
    <div className="flex">
      {imageUrls.map((url, index) => (
        <div className="relative mb-4" key={index}>
          <img className={`border rounded mx-2 max-h-${maxHeight}`} alt="preview" src={url} />
          <button
            className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
            onClick={(e) => {
              e.preventDefault();
              handleClickDelete(index);
            }}
          >
            <FontAwesomeIcon icon={faMinusCircle} size="2x" />
          </button>
        </div>
      ))}
    </div>
  );
});

export default ImagePreview;
