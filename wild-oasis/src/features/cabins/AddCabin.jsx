/** @format */

// import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Open opens='table'>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const handleClose = () => setIsOpenModal(false);
//   return (
//     <>
//       <Button
//         onClick={() => setIsOpenModal((prev) => !prev)}
//         $variation='secondary'
//         $size='large'
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onCloseModal={handleClose} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
