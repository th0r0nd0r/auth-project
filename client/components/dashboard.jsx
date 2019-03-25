export default function Dashboard(props) {
  return (
    <div>
      <h1>Hi, {props.currentUser}!</h1>
      <h2>Look at all this room for activities</h2>
    </div>
  );
}