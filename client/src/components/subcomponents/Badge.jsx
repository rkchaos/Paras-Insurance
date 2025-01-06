export const Badge = ({ label, status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'good':
                return 'bg-green-400 text-green-900';
            case 'bad':
                return 'bg-red-400 text-red-900';
            case 'neutral':
                return 'bg-yellow-400 text-yellow-900';
            default:
                return 'bg-blue-400 text-blue-900';
        }
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {label}
        </span>
    );
}