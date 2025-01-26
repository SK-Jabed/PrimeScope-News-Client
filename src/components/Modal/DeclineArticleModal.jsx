// // import React, { useState } from "react";
// // import { Modal, Input, Textarea, Button } from "@nextui-org/react";
// // import { axiosSecure } from "../../hooks/useAxiosSecure";

// // const DeclineArticleModal = ({ articleId, onClose, refetch }) => {
// //   const [reason, setReason] = useState("");

// //   const handleDecline = async () => {
// //     try {
// //     //   await axiosSecure.put(`/articles/${articleId}/decline`, { reason });
// //       await axiosSecure.patch(`/articles/decline/${articleId}`, { reason });
// //       refetch();
// //       onClose();
// //     } catch (error) {
// //       console.error("Error declining article:", error);
// //     }
// //   };

// //   return (
// //     <Modal open={true} onClose={onClose} blur>
// //       <Modal.Header>
// //         <h3>Decline Article</h3>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <Textarea
// //           label="Reason for Decline"
// //           placeholder="Enter reason here..."
// //           fullWidth
// //           onChange={(e) => setReason(e.target.value)}
// //         />
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button auto flat onPress={onClose}>
// //           Cancel
// //         </Button>
// //         <Button auto onPress={handleDecline}>
// //           Submit
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //   );
// // };

// // export default DeclineArticleModal;



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
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-lg font-semibold">
          Decline Article
        </ModalHeader>
        <ModalBody>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            placeholder="Enter reason for declining..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button color="danger" onClick={handleDecline}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeclineArticleModal;



// import React, { useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";

// const DeclineArticleModal = ({ articleId, onClose, refetch }) => {
//   const [reason, setReason] = useState("");

//   const handleDecline = async () => {
//     try {
//       await axiosSecure.patch(`/articles/decline/${articleId}`, { reason });
//       refetch();
//       onClose();
//     } catch (error) {
//       console.error("Error declining article:", error);
//     }
//   };

//   return (
//     <Transition show={true} as={React.Fragment}>
//       <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
//         <div className="min-h-screen px-4 text-center">
//           <Transition.Child
//             as={React.Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
//           </Transition.Child>

//           <span
//             className="inline-block h-screen align-middle"
//             aria-hidden="true"
//           >
//             &#8203;
//           </span>
//           <Transition.Child
//             as={React.Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
//               <Dialog.Title
//                 as="h3"
//                 className="text-lg font-medium leading-6 text-gray-900"
//               >
//                 Decline Article
//               </Dialog.Title>
//               <textarea
//                 className="w-full mt-4 border border-gray-300 p-2 rounded-lg"
//                 rows="4"
//                 placeholder="Enter reason for declining..."
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               />
//               <div className="mt-4 flex justify-end space-x-2">
//                 <button
//                   className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg"
//                   onClick={onClose}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg"
//                   onClick={handleDecline}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default DeclineArticleModal;
