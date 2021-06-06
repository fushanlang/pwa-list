import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const ImagePreview = ({
  imageUrl,
  handleDeleteImage,
  isLast = false,
  isBtnLastOnlyDisplay = false,
}) => {
  return (
    <div className="relative mb-4">
      <img className="border rounded max-h-60 mx-2" src={imageUrl} />
      {!isBtnLastOnlyDisplay && (
        <button
          className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
          onClick={handleDeleteImage}
        >
          <FontAwesomeIcon icon={faMinusCircle} size="2x" />
        </button>
      )}
      {isLast && (
        <button
          className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
          onClick={handleDeleteImage}
        >
          <FontAwesomeIcon icon={faMinusCircle} size="2x" />
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
