const MiniMapNode = ({ x, y, color }) => {
	return (
		<circle
			cx={x}
			cy={y}
			r="30"
			fill={color}
		/>
	);
};

export default MiniMapNode;
