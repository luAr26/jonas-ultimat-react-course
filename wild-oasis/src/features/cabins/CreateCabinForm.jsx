/** @format */

import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Row from "../../ui/Row";

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(getValues().regularPrice, getValues().discount);

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  function onSubmit(data) {
    // console.log(data);

    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register("image", { required: "This field is required." })}
          disabled={isCreating}
        />
      </FormRow>

      <Row
        type='horizontal'
        style={{ marginTop: "24px", justifyContent: "flex-end", gap: "12px" }}
      >
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? "Adding cabin" : "Add cabin"}
        </Button>
      </Row>
    </Form>
  );
}

export default CreateCabinForm;
