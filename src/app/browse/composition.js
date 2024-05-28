export default function Composition({ title, composer, musicians }) {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{composer}</h4>
      <p>{...musicians}</p>
    </div>
  );
}
