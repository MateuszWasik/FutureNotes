export const calculateCaretOffset = (
	parent: HTMLElement,
	range: Range
): number => {
	let offset = 0;

	const traverse = (node: Node) => {
		if (node === range.startContainer) {
			offset += range.startOffset;
			// found the correct node
			return true;
		}

		if (node.nodeType === Node.TEXT_NODE) {
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
