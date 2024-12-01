import React from 'react';

export function ClientDetailsCard({ children, className = '' }) {
    return (
        <div className={`bg-white mx-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg ${className}`}>
            {children}
        </div>
    );
}

