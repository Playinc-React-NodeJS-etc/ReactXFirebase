import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import app from "../firebaseConfig";

const db = getFirestore(app);

// 게시글 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: { toDate: () => Date };
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsArray: Post[] = [];
      snapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(postsArray);
    }, (error) => {
      console.error("게시글 가져오기 오류:", error);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
  }, []);

  return (
    <div>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>작성일: {post.createdAt.toDate().toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;