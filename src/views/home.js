import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from "react";
import rehypeSanitize from "rehype-sanitize";
import Layout from '../components/layout.js';
import supabase from '../utils/supabase.js';
import './views.css';

export default function Home() {
  const [userSession, setSession] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { userSession } } = await supabase.auth.getSession();
      setSession(userSession);
      supabase.auth.onAuthStateChange((_event, userSession) => setSession(userSession));
    };
    fetchUser();
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(5);
    if (!error) setPosts(data);
  };

  const handleLogin = async (provider) => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    const { error } = await supabase.from("posts").insert([{ title, content, user_id: userSession.user.id, email: userSession.user.email }]);
    console.log(error);
    if (!error) {
      setTitle("");
      setContent("");
      fetchPosts();
    }
  };

  return (
    <div>
      <Layout>
        <div className="container">
          <h1 className="header">Blog entries</h1>
          {!userSession ? (
            <div className="center">
              <button className="btn btn-primary" onClick={() => handleLogin("google")}>
                Login with Google
              </button>
            </div>
          ) : (
            <div className="user-section">
              <div className="user-info">
                <p>Welcome, <strong>{userSession.user.email}</strong>!</p>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <div className="form-section">
                <form onSubmit={handleSubmit}>
                  <label>
                    Title:
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter the title"
                      className="input"
                    />
                  </label>
                  <label>
                    Content:
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your content here..."
                      className="textarea"
                    ></textarea>
                  </label>
                  <button type="submit" className="btn btn-success">
                    Submit Post
                  </button>
                </form>
              </div>
            </div>
          )}
          <div className="posts-section">
            <h2>Recent Posts</h2>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="post-card">
                  <h3>{post.title} <span style={{ fontSize: "0.9rem", fontStyle: "italic", marginLeft: "10px", color: "#555" }}>
                    by {post.email} on {new Date(post.created_at).toLocaleDateString("en-US")}
                  </span></h3>
                  <hr />
                  <div className="markdown-content">
                    <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{post.content}</ReactMarkdown>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available. Be the first to post!</p>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
