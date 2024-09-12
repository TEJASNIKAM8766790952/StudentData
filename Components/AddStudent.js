import React, { useState } from "react";
import './AddStudent.css';

const AddStudents = () => {
  const [FromData, setFromData] = useState({
    name: "",
    Roll: "",
    collage: "",
    Branch: "",
  
  });

  const SubmitData = () => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:4000/api/student", {
      method: "POST",
      body: JSON.stringify(FromData),
      headers: myHeaders,

    }).then((data) => console.log(data)).catch((err) => console.log(err));
  }
  const Delete=()=>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("http://localhost:4000/api/delete", {
      method: "DELETE",
      body: JSON.stringify(FromData),
      headers: myHeaders,

    }).then((data) => console.log(data)).catch((err) => console.log(err));
  }

  const HandleChange = (e) => {
    setFromData({
      ...FromData,
      [e.target.name]:e.target.value

    })
  }

  return (
    <div>
      <h1>I am Add records</h1>

      <from onSubmit={SubmitData} method="POST"></from>
      <input type="text" name="name" value={FromData.name} onChange={HandleChange} />
      <input type="text" name="Roll" value={FromData.Roll} onChange={HandleChange} />
      <input type="text" name="collage" value={FromData.collage} onChange={HandleChange} />
      <input type="text" name="Branch" value={FromData.Branch} onChange={HandleChange} />

      <button className="button" onClick={SubmitData}>click me</button>

      <button onClick={Delete}>delete</button>

    </div>
  )
}

export default AddStudents;