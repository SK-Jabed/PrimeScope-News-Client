import React, { useState } from "react";
import { Modal, Input, Textarea, Button } from "@nextui-org/react";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const DeclineArticleModal = ({ articleId, onClose, refetch }) => {
  const [reason, setReason] = useState("");

  const handleDecline = async () => {
    try {
    //   await axiosSecure.put(`/articles/${articleId}/decline`, { reason });
      await axiosSecure.patch(`/articles/decline/${articleId}`, { reason });
      refetch();
      onClose();
    } catch (error) {
      console.error("Error declining article:", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose} blur>
      <Modal.Header>
        <h3>Decline Article</h3>
      </Modal.Header>
      <Modal.Body>
        <Textarea
          label="Reason for Decline"
          placeholder="Enter reason here..."
          fullWidth
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat onPress={onClose}>
          Cancel
        </Button>
        <Button auto onPress={handleDecline}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeclineArticleModal;
