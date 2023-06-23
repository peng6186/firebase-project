import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { useState, useEffect } from "react";
import Post from "./Post";

export interface Post {
  id: string;
  userID: string;
  userName: string;
  title: string;
  description: string;
}

const Home = () => {
  const collRef = collection(db, "posts");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const getPosts = async () => {
    const resp = await getDocs(collRef);
    setPosts(
      resp.docs.map((elm) => ({
        ...elm.data(),
        id: elm.id,
      })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <h2>Home Page</h2>
      {posts?.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};

export default Home;
