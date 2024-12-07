import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm"; // LoginForm 가져오기
import DetailPage from "./components/DetailPage";
import { User } from "firebase/auth";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    console.log("로그인 시도:", userData);
    setUser(userData); // 사용자 상태 업데이트
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/details" element={user ? <DetailPage user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;