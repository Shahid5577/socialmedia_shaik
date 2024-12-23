

const Post = ({ post }: { post: any }) => {
  return (
    <div className="post-container">
      <h3>{post.username}</h3>
      <p>{post.text}</p>
      <div className="post-images">
        {post.images?.map((imageUrl: string, index: number) => (
          <img key={index} src={imageUrl} alt="Post image" className="post-image" />
        ))}
      </div>
      {post.video && (
        <video controls>
          <source src={post.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <p>{new Date(post.timestamp?.seconds * 1000).toLocaleString()}</p>
    </div>
  );
};

export default Post;
