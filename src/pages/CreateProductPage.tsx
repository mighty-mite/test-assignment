import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function CreateProductPage() {
  return (
    <section>
      <h2>Create new product</h2>
      <form action="">
        <Stack style={{ width: "60vw", gap: "20px" }}>
          <TextField id="title" label="Title" type="text" />
          <TextField id="price" label="Price" type="number" />
          <TextField id="description" label="Description" type="text" />
          <Button variant="contained" size="large" endIcon={<SendIcon />}>
            Create Product
          </Button>
        </Stack>
      </form>
    </section>
  );
}
