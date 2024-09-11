import React, { useEffect, useState } from 'react';

const Notification = ({ success, error }) => {
    const [visibleSuccess, setVisibleSuccess] = useState('');
    const [visibleError, setVisibleError] = useState('');

    useEffect(() => {
        if (success || error) {
            if (success) {
                setVisibleSuccess(success);
            } else {
                setVisibleSuccess('');
            }

            if (error) {
                setVisibleError(error);
            } else {
                setVisibleError('');
            }

            const timer = setTimeout(() => {
                setVisibleSuccess('');
                setVisibleError('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, error]);

    return (
        <>
            {visibleSuccess && <div className='text-green-500 bg-green-100 border border-green-300 shadow-md rounded-md mt-2 p-2'>{visibleSuccess}</div>}
            {visibleError && <div className='text-red-500 bg-red-100 border border-red-300 shadow-md rounded-md mt-2 p-2'>{visibleError}</div>}
        </>
    );
};

export default Notification;
