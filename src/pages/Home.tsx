import React from "react";
import Feed from "../components/Feed";


const Home: React.FC = () => {
  return (
    <div className="bg-gray-100">
     
      <main className="p-4">
        <Feed />
      </main>
    </div>
  );
};

export default Home;
