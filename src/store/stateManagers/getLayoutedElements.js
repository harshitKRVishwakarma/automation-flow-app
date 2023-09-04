/**
 * d3-hierarchy imports
 */
import { stratify, tree } from "d3-hierarchy";

const g = tree();

const getLayoutedElements = (nodes, edges, options) => {
	console.log("GET_LAYOUTED_ELEMENT_OPTIONS", options);
	if (nodes.length === 0) return { nodes, edges };

	const { width, height } = document
		.querySelector(`[data-id="${nodes[0].id}"]`)
		.getBoundingClientRect();
	const hierarchy = stratify()
		.id((node) => node.id)
		.parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
	const root = hierarchy(nodes);
	const layout = g.nodeSize([width * 2, height * 5])(root);

	return {
		nodes: layout
			.descendants()
			.map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
		edges,
	};
};

export default getLayoutedElements;
