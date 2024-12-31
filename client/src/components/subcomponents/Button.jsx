const Button = ({ label, onClickFunction }) => {
    return (
        <button
            onClick={onClickFunction}
            className='px-4 py-1 font-semibold text-lg rounded-md text-white bg-gray-900 border-white hover:opacity-95'
        >
            {label}
        </button>
    );
};

export { Button };
