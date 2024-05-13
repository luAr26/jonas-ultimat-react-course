/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const queryClient = useQueryClient();
  // console.log(editId, editValues);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  // console.log(getValues().regularPrice, getValues().discount);

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
        <Button $variation='secondary' type='reset'>
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
};

export default CreateCabinForm;
