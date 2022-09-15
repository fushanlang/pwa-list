import { memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  imageUrl: string;
  handleClickDelete: (index: number) => void;
  maxHeight: string;
  index?: number;
};

const ImagePreview: React.FC<Props> = memo(({ imageUrl, handleClickDelete, maxHeight, index = 0 }) => {
  return (
    <div className="relative">
      <img className={`border rounded mx-2 ${maxHeight}`} alt="preview" src={imageUrl} />
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
  );
});

export default ImagePreview;
