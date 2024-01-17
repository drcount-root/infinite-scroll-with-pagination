"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface PostInterface {
  userId: string;
  id: number;
  title: string;
  body: string;
}

const InfiniteScroll = () => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
        const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
        if(bottom) {
            setPage(page=>page+1)
        }
      };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
      );
      setPosts((prev) => [...prev, ...res.data]);
      setLoading(false);
    };
    loadPosts();
  }, [page]);

  return (
    <div className="flex flex-col gap-2 w-[500px] mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-400">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
