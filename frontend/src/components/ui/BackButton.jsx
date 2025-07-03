import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const BackButton = () => (
  <div className="mb-4 flex items-center space-x-2 text-base">
    <Link to="/feed">
      <FontAwesomeIcon icon={faArrowLeftLong} className="cursor-pointer" />
    </Link>
    <Link to="/feed">
      <Button style="inline">Back to feed</Button>
    </Link>
  </div>
);

export default BackButton;
