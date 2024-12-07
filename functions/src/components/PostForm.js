// src/components/PostForm.js
import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 게시글 저장 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        createdAt: new Date(),
        userId: auth.currentUser.uid // 현재 사용자 ID 저장
      });
      console.log("게시글 추가됨:", docRef.id);
      // 게시글 작성 후 입력 필드 초기화
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