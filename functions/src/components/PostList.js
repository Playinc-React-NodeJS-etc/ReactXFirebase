// src/components/PostList.js
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // 게시글 읽기 함수
  const fetchPosts = async () => {
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(postsQuery);
    const postsArray = [];
    querySnapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postsArray);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>작성일: {post.createdAt.toDate().toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;