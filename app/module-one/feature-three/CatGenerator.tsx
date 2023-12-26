export default function CatGenerator({ data }) {
  const { url } = data[0];
  return (
    <div>
      <h1>Cat Generator</h1>
      <img src={url} alt="cat" />
    </div>
  );
}
