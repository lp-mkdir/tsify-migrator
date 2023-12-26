export default function CountryList({ data }: { data: any }) {
  return (
    <div>
      <h1>Europe Countries</h1>
      <ul>
        {data.map((item) => (
          <li key={item.userId}>{item.name.common}</li>
        ))}
      </ul>
    </div>
  );
}
