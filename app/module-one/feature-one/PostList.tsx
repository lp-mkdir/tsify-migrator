export interface IPostList {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export default function PostList({ data }: { data: IPostList[] }) {
  return (
    <div>
      <h1>Post List</h1>
      <ul>
        {data.map((item) => (
          <li key={item.userId}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
