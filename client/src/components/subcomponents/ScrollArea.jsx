export const ScrollArea = ({ children, className = '' }) => {
    return (
        <div className={`overflow-auto block ${className}`}>
            {children}
        </div>
    );
}