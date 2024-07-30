import React from 'react';

const Card = ({ component: Component }) => {
    return (
        <div className='bg-blue-400 bg-opacity-40 px-[50px] pb-[50px] pt-[10px] rounded-md shadow-dark text-white'>
            <Component />
        </div>
    );
};

export default Card;
