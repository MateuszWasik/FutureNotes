export const calculateCaretOffset = (
	parent: HTMLElement,
	range: Range
): number => {
	let offset = 0;

	const traverse = (node: Node): boolean => {
		if (node === range.startContainer) {
			offset += range.startOffset;
			// return true when we reach the correct node
			return true;
		}

		if (node.nodeType === Node.TEXT_NODE) {
			// only count visible text length (excluding HTML tags)
			offset += node.textContent?.length || 0;
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			for (const child of Array.from(node.childNodes)) {
				if (traverse(child)) return true;
			}
		}
		return false;
	};

	traverse(parent);
	return offset;
};
