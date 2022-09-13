import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getAllUsers = async () => {
      const getAllData = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(getAllData.data);
    };
    getAllUsers();
  }, [render]);

  const formdata = new FormData();
  formdata.append("name", inputs.name);
  formdata.append("email", inputs.email);
  formdata.append("age", inputs.age);
  formdata.append("profile", profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9000/api/v1/users", formdata);
      setRender(true);
      setInputs({
        name: "",
        email: "",
        age: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ backgroundColor: "blue" }}>
          <h1 className="text-center text-white">MERN FILE UPLOAD</h1>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                value={inputs.name}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="email"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Age
              </label>
              <input
                value={inputs.age}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                type="number"
                name="age"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Profile
              </label>
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                name="profile"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <img
                          className="img img-fluid"
                          src={`http://localhost:9000/${user.profile}`}
                          alt="users"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;