const Background = () => {
    const n = 12;

    const renderSquares = () => {
        const squares = [];
        for (let i = 0; i < n * n; i++) {
            squares.push(
                <div key={i} className="dynamicBackgroundSquare">
                    <div className="dynamicBackgroundDot" />
                    <div className="dynamicBackgroundDot" />
                </div>
            );
        }
        return squares;
    };

    return (
        <div className="dynamicBackgroundContainer fixed z-0 max-w-full">
            {renderSquares()}
        </div>
    );
};

export default Background;
