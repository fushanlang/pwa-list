import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
const ImagePreview = ({ imageUrl, setImage, setImageUrl }) => {
  return (
    <div className="relative">
      <img className="rounded max-h-96 mx-2" src={imageUrl} />
      {imageUrl && (
        <button
          className="text-red-500 hover:text-red-700 absolute top-0 right-0 mt-1 mr-3"
          onClick={() => {
            setImage(null);
            setImageUrl(null);
          }}
        >
          <FontAwesomeIcon icon={faMinusCircle} size="2x" />
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
