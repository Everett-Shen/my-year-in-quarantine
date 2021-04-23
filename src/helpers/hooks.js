import { useState, useEffect } from "react";

const useVisited = (pageKey) => {
  const [pageVisited, setPageVisited] = useState(false);
  useEffect(() => {
    let visited = localStorage.getItem(pageKey);
    if (visited) setPageVisited(true);
    else localStorage.setItem(pageKey, true);
  }, []);

  return pageVisited;
};

export { useVisited };
