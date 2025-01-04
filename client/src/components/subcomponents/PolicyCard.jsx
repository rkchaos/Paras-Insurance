const PolicyCard = ({ label, description }) => {
    return (
        <div className="p-4 w-[400px]">
            <p className="font-semibold text-center">{label}</p>
            <p className='text-sm text-gray-500 text-center'>{description}</p>
        </div>
    );
}

export default PolicyCard;