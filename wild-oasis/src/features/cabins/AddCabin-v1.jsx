/** @format */

import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClose = () => setIsOpenModal(false);
  return (
    <>
      <Button
        onClick={() => setIsOpenModal((prev) => !prev)}
        $variation='secondary'
        $size='large'
      >
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={handleClose}>
          <CreateCabinForm onCloseModal={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
