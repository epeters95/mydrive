import PropTypes from 'prop-types';
import React from 'react';
import { useLoaderData } from "react-router-dom";

const UsersList = () => {

  let { users } = useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <ul>
      {users.map((user) => (
        <li id={user.id}
            key={user.id}>
          <span className="user-span">
            {user.email}
          </span>
        </li>
      ))}
      </ul>
    </div>
  );

};

export default UsersList;
