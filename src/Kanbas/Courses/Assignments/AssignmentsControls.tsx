import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function AssignmentControls() {
  const { cid } = useParams();
  return (
    <div className="float-end">
      40% of Total
      <FaPlus/>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
