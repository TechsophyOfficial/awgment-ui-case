import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import FilterListView from './index.js';

export function GetId() {
    const navigate = useNavigate();

    function redirect(url) {
        navigate(url, { replace: true }); 
    }

    const { filterId } = useParams();
    return (
        <div>
            <FilterListView filterId={filterId} onFilterSaved={redirect}/>
        </div>
    );
}

export default GetId;