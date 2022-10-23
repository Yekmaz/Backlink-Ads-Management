import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button} from "@mui/material";
import { useState, useEffect } from "react"; 

const ImageUpload = ({setImageFile}) => {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()

    useEffect(() => {

        if (!file) {
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)

    }, [file])


    const pickedHandler = event => {
        let pickedFile
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
        }
        setImageFile(pickedFile)
    }

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        startIcon={<AddAPhotoIcon />}
        sx={{ marginRight: "1rem", fontSize: "12px" }}
      >
        Image Upload
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          hidden
          onChange={pickedHandler}
        />
      </Button>
      {previewUrl && file && (

    <img src={previewUrl} alt={file.name} height="100px" />

)}
    </>
  );
};
export default ImageUpload;
