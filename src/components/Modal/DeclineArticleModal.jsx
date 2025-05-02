import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { axiosSecure } from "../../hooks/useAxiosSecure";

const DeclineArticleModal = ({ articleId, onClose, refetch }) => {
  const [reason, setReason] = useState("");

  const handleDecline = async () => {
    try {
      await axiosSecure.patch(`/articles/decline/${articleId}`, { reason });
      refetch();
      onClose();
    } catch (error) {
      console.error("Error declining article:", error);
    }
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/20 backdrop-opacity-20",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      radius="lg"
      isOpen={true}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-lg font-semibold text-center text-white">
          Decline Article
        </ModalHeader>
        <ModalBody>
          <textarea
            className="w-full bg-gray-800 border border-gray-800 p-2 rounded"
            rows="4"
            placeholder="Enter reason for declining..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={handleDecline}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeclineArticleModal;