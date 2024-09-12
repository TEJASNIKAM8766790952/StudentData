import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const Students = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/api/data')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(err => console.error("Error fetching data:", err));
    }, []);

    const handleDelete = (Roll) => {
        fetch(`http://localhost:4000/api/delete/${Roll}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            if (response.ok) {
                // Update state after successful deletion
                setData(prevData => prevData.filter(student => student.Roll !== Roll));
            } else {
                console.error("Failed to delete student with Roll:", Roll);
            }
        })
        .catch(err => console.error("Error deleting student:", err));
    };

    return (
        <div>
            {data.length > 0 ? (
                data.map(student => (
                    <div key={student.Roll}>
                        <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "green", margin: "12px" }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {student.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Roll: {student.Roll}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        College: {student.collage}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Branch: {student.Branch}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <button onClick={() => handleDelete(student.Roll)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No students available</p>
            )}
        </div>
    );
};

export default Students;
