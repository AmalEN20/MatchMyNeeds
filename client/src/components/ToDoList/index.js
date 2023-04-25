import React from "react";
import { Link } from 'react-router-dom';

function TodoList = ({ requests }) => {
    if (!requests.length) {
        return <h3>Your to do list is empty.</h3>;
    }

    const newList = [request, ...]

    return (
        <div>
            {requests &&
                requests.map((request) => (
                    <div key={request._id} > 
                    <Link
                    to={`/requests/${request._id}`}>
                        <h3>Item: {request.requestItem}</h3>
                        <h3>Insert Button</h3>
                    </Link>
                    </div>
                ))

            }
        </div>
    );
};

export default TodoList;