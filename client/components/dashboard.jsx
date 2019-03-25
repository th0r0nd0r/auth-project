export default function Dashboard(props) {
  const {currentUser, logoutUser} = props;

  return (
    <div>
      <h1>Hi, {currentUser}!</h1>
      <h2>Look at all this room for activities</h2>
      <button className="btn btn-primary submit-btn" onClick={logoutUser}>Log Out</button>
    </div>
  );
}