import { IoEllipsisVertical } from "react-icons/io5";
import React, { useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment} from "./reducer";

export default function AssignmentsControlButtons({ id }: { id : string}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <FaTrash onClick={() => {setShowConfirmation(true)}}/>

      {showConfirmation && (
        <Modal show={showConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
            <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {setShowConfirmation(false)}}>Cancel</Button>
              <Button variant="danger" onClick={() => {dispatch(deleteAssignment(id));setShowConfirmation(false)}}>Delete</Button>
            </Modal.Footer>
        </Modal>
      )}
    </div>
);}