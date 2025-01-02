const PolicyCard = ({ label, description }) => {
    return (
        <div className="p-4 max-w-[750px]">
            <p className="font-semibold text-center">{label}</p>
            <p className='text-sm text-gray-500 text-center'>{description}</p>
        </div>
    );
}

export default PolicyCard;