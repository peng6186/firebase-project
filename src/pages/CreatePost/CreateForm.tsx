import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";

interface Post {
  title: string;
  description: string;
}

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navi = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Must have a title"),
    description: yup.string().required("Must have a description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const myCollection = collection(db, "posts");

  const handleCreatePost = async (data: Post) => {
    console.log(data);
    await addDoc(myCollection, {
      ...data,
      userID: user?.uid,
      userName: user?.displayName,
    });
    navi("/");
  };

  return (
    <form onSubmit={handleSubmit(handleCreatePost)}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Title..."
        {...register("title")}
      />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea
        type="text"
        name=""
        id=""
        placeholder="Description..."
        {...register("description")}
      />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input type="submit" value="Submit" className="submitForm" />
    </form>
  );
};

export default CreateForm;
