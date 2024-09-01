import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addCard } from "../store/cardsSlice";
import { useState } from "react";

interface IFormValues {
  title: string;
  price: number;
  description: string;
}

const defaultValues: IFormValues = {
  title: "",
  price: 0,
  description: "",
};

const schema = yup
  .object({
    title: yup.string().min(2, "2 symbols minimum").required(),
    price: yup.number().positive().integer().required(),
    description: yup.string().min(5, "5 symbols minimum").required(),
  })
  .required();

export default function CreateProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const newCard = { ...data, id: Math.random() };
    dispatch(addCard(newCard));
    reset();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    _: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <section>
      <h2>Create new product</h2>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <Stack style={{ width: "60vw", gap: "20px" }}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors?.title}
                helperText={errors?.title?.message ?? null}
              />
            )}
            name="title"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                error={!!errors?.price}
                helperText={errors?.price?.message ?? null}
              />
            )}
            name="price"
            control={control}
            rules={{
              required: true,
            }}
          />
          <Controller
            render={({ field }) => (
              <TextField
                error={!!errors.description}
                helperText={errors?.description?.message ?? null}
                {...field}
              />
            )}
            name="description"
            control={control}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}>
            Create Product
          </Button>
        </Stack>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}>
          Product created successfully!
        </Alert>
      </Snackbar>
    </section>
  );
}
