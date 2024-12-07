import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const DetailPage: React.FC<{ user: any }> = ({ user }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // 게시글 읽기 함수
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsArray: any[] = [];
    querySnapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postsArray);
  };

  // 게시글 저장 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        createdAt: new Date(),
        userId: user.uid, // 현재 사용자 ID 저장
      });
      setTitle("");
      setContent("");
      fetchPosts(); // 게시글 추가 후 다시 읽기
    } catch (error) {
      console.error("게시글 추가 오류:", error);
    }
  };

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트될 때 게시글 읽기
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>작성자 ID: {post.userId}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
};

export default DetailPage;