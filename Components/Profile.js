import React, { useState, useEffect } from "react";

const Profile = () => {
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        Roll: "",
        collage: "",
        Branch: "",
    });

    // Fetch data from API on component mount
    useEffect(() => {
        fetch('http://localhost:4000/api/data')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    
    // Handle edit button click
    const handleEditClick = (student) => {
        setIsEditing(true);
        setEditData(student); // Populate form with the selected student’s data
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    // Handle form submission for updating data
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/api/put/${editData.Roll}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editData)
        })
        .then(response => {
            if (response.ok) {
                // Update the state with the updated data
                setData(prevData => prevData.map(student => 
                    student.Roll === editData.Roll ? editData : student
                ));
                setIsEditing(false);
            } else {
                console.error("Failed to update student");
            }
        })
        .catch(err => console.error("Error updating student:", err));
    };

    return (
        <div>
            {data.length > 0 ? (
                data.map(student => (
                    <div key={student.Roll}>
                        <h3>{student.name}</h3>
                        <p>Roll: {student.Roll}</p>
                        <p>College: {student.collage}</p>
                        <p>Branch: {student.Branch}</p>
                        
                        {/* Edit and Delete buttons */}
                        <button onClick={() => handleEditClick(student)}>Edit</button>
                    </div>
                ))
            ) : (
                <p>No students available</p>
            )}

            {/* Edit form */}
            {isEditing && (
                <form onSubmit={handleUpdate}>
                    <h3>Edit Student</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Roll:
                        <input
                            type="text"
                            name="Roll"
                            value={editData.Roll}
                            onChange={handleInputChange}
                            disabled
                        />
                    </label>
                    <br />
                    <label>
                        College:
                        <input
                            type="text"
                            name="collage"
                            value={editData.collage}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Branch:
                        <input
                            type="text"
                            name="Branch"
                            value={editData.Branch}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button type="submit">Update</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
