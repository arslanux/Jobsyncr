const Arrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block", // Ensure the arrow is visible
                background: "black",
                padding: "10px", // Add some padding for a larger click area
                borderRadius: "50%", // Make the arrow circular
                zIndex: 1, // Ensure it's on top of the content
            }}
            onClick={onClick}
        />
    );
};
