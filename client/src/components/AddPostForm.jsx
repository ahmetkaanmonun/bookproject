import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createPost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const categories = [
  "Bilim ve Teknik",
  "Çizgi Roman",
  "Çocuk Kitapları",
  "Din",
  "Edebiyat",
  "Ekonomi & İş Dünyası",
  "Felsefe & Düşünce",
  "Hukuk",
  "Osmanlıca",
  "Referans & Başvuru",
  "Sağlık",
  "Sanat",
  "Sınav ve Ders Kitapları",
  "Spor",
  "Tarih",
  "Toplum & Siyaset",
  "Diğer & Çeşitli",
];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  publisher: yup.string().required(),
  language: yup.string().required(),
  situation: yup.string().required(),
  price: yup.string().required(),
  category: yup.mixed().oneOf(categories),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    clearForm();
  };

  const clearForm = () => {
    reset();
    setFile(null);
    handleClose();
  };

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="title"
              label="Başlık"
              name="title"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id="subtitle"
              label="Alt Başlık"
              name="subtitle"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.subtitle ? true : false}
              fullWidth
            />
            <Controller
              as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="category"
              control={control}
              error={errors.category ? true : false}
              defaultValue={categories[0]}
            />

            <TextField
              id="language"
              label="Dil"
              name="language"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.language ? true : false}
              fullWidth
            />
            <TextField
              id="publisher"
              label="Yayınevi"
              name="publisher"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.publisher ? true : false}
              fullWidth
            />
            <TextField
              id="situation"
              label="Durum"
              name="situation"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.situation ? true : false}
              fullWidth
            />
            <TextField
              id="price"
              label="Fiyat"
              name="price"
              variant="outlined"
              className={classes.textField}
              size="small"
              inputRef={register}
              error={errors.price ? true : false}
              fullWidth
            />

            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearForm} color="inherit">
          Vazgeç
        </Button>
        <Button
          type="submit"
          onClick={() => handleSubmit(onSubmit)()}
          color="primary"
          variant="outlined"
        >
          Yayınla
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
