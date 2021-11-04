import axios from "axios";
import { Tooltip, IconButton, Input } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

async function postImage({ image, userId }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("userId", userId);
  const result = await axios.post("https://footy-app-server-test.herokuapp.com/api/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return result.data;
}

export default function ImageUpload({ user }) {
  const submit = async (file) => {
    const result = await postImage({ image: file, userId: user.id });
    console.log(result);
  };
  const fileSelected = (event) => {
    const file = event.target.files[0];
    submit(file);
  };

  return (
    <label htmlFor="icon-button-file">
    <Input
      accept="image/*"
      id="icon-button-file"
      type="file"
      style={{ display: "none" }}
      onChange={fileSelected}
    />
    <IconButton aria-label="upload picture" component="span">
      <Tooltip title="change picture">
        <AddIcon />
      </Tooltip>
    </IconButton>
  </label>
  );
}
