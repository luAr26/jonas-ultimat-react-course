/** @format */

import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";
import { useState } from "react";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id, ...editValues } = cabinToEdit;
  const [editId, setEditId] = useState(id);
  const isEditSession = Boolean(editId);

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            setEditId(data.id);
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label='Cabin name' $error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register("name", { required: "This field is required." })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label='Maximum capacity' $error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register("maxCapacity", {
            required: "This field is required.",
            min: { value: 1, message: "Capacity should be at least 1." },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label='Regular price' $error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register("regularPrice", {
            required: "This field is required.",
            min: { value: 1, message: "Price should be at least 1." },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label='Discount' $error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              (value >= 0 && value <= +getValues().regularPrice) ||
              "Discount should be greater than 0 and less than the regular price.",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        label='Description for website'
        $error={errors?.description?.message}
      >
        <Textarea
          id='description'
          defaultValue=''
          {...register("description", { required: "This field is required." })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <Row
        type='horizontal'
        style={{ marginTop: "24px", justifyContent: "flex-end", gap: "12px" }}
      >
        <Button
          $variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? "Adding cabin" : isEditSession ? "Save" : "Add cabin"}
        </Button>
      </Row>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
