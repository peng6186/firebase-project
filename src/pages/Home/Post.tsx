import React, { useEffect, useState } from "react";
import { Post as IPost } from "./Home";
import { db, auth } from "../../config/firebase.config";
import {
  addDoc,
  collection,
  query,
  getDocs,
  where,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Post {
  post: IPost;
}
interface Like {
  userID: string;
  likeID: string;
}
const Post = (props: Post) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);
  const likeRef = collection(db, "likes");

  const likeQuery = query(likeRef, where("postID", "==", post.id));
  const getLikeDocs = async () => {
    const result = await getDocs(likeQuery);
    setLikes(
      result.docs.map((doc) => ({
        userID: doc.data().userID,
        likeID: doc.id,
      })) as Like[]
    );
  };

  let hasLiked = likes?.find((like) => like.userID === user.uid);

  useEffect(() => {
    getLikeDocs();
  }, []);

  const addLike = async () => {
    try {
      const returnedAdd = await addDoc(likeRef, {
        postID: post.id,
        userID: user.uid,
      });
      setLikes((prev) =>
        prev
          ? [...prev, { userID: user.uid, likeID: returnedAdd.id }]
          : [{ userID: user.uid, likeID: returnedAdd.id }]
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  const removeLike = async () => {
    try {
      const toDeleteQuery = query(
        likeRef,
        "likes",
        where("postID", "==", post.id),
        where("userID", "==", user.uid)
      );
      const toDeleteData = await getDocs(toDeleteQuery);
      console.log(toDeleteData.docs[0].id);

      const toDeleteID = toDeleteData.docs[0].id;
      const toDeleteDoc = doc(db, "likes", toDeleteID);
      await deleteDoc(toDeleteDoc);

      setLikes(
        (prev) => prev && prev?.filter((like) => like.likeID !== toDeleteID)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div>
        <div className="title">
          <h3>{post.title}</h3>
        </div>
        <div className="body">
          <p>{post.description}</p>
        </div>
        <div className="footer">
          <p>@{post.userName}</p>
          <button onClick={hasLiked ? removeLike : addLike}>
            {" "}
            {hasLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
          {likes && <p>Likes: {likes.length} </p>}
        </div>
      </div>
    </div>
  );
};

export default Post;
