import React, { useState, FormEvent } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const PostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        createdAt: new Date(),
        userId: auth.currentUser?.uid, // 현재 사용자 ID 저장
      });
      console.log("게시글 추가됨:", docRef.id);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("게시글 추가 오류:", error);
    }
  };

  return (
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
  );
};

export default PostForm;