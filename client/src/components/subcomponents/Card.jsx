import * as React from "react"

const Card = ({ label, description, icon }) => {
    return (
        <div>
            <div className='text-center'>
                <p>{label}</p>
            </div>
            <p className='text-sm text-gray-500 text-center'>{description}</p>
        </div>
    );
}

export default Card;