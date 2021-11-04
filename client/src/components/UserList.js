import User from "./User";
import { useGlobalContext } from "../context";

const UserList = () => {
  const { users } = useGlobalContext();
  if (users === undefined) {return <p>...loading users</p>}
  else {
    return (
        <section> 
          <h2>Users</h2>
          <div >
            {users.map((user) => {
              return (<User key={user.id} {...user}/>)

            })}
          </div>
        </section>
      );
  }
};

export default UserList;