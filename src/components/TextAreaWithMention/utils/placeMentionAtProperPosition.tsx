export const placeMentionAtProperPosition = (
	parent: HTMLElement,
	position: number,
	mentionSpan: HTMLSpanElement,
	userTypedMention: number
): HTMLSpanElement | null => {
	let offset = 0;

	//becuase DOM structure can be nestes and deep we need a function
	// that will go through all the nodes to find the proper one
	// and then insert the mentionSpan
	// I used a recursive function to go through all the nodes
	// probably there is a better and more efficient way to do this
	const traverseAndInsert = (node: Node): boolean => {
		if (node.nodeType === Node.TEXT_NODE) {
			const textLength = node.textContent?.length || 0;

			// offset when is 0 will be the first text node but 
			// we have to use different values for caret position to
			// get before and after text
			// thats why we have to split it into two if's
			if (offset + textLength >= position) {
				if (offset === 0) {
					const splitAfter = position + userTypedMention + 1;
					console.log('splitAfter', splitAfter);
					const beforeText = node.textContent?.slice(0, position) || '';
					// skip the '@'
					const afterText = node.textContent?.slice(splitAfter) || '';

					console.log('beforeText:', beforeText);
					console.log('afterText:', afterText);

					const textNode = node as Text;
					const beforeNode = document.createTextNode(beforeText);
					const afterNode = document.createTextNode(afterText);

					const parentNode = node.parentNode;
					if (parentNode) {
						parentNode.replaceChild(afterNode, textNode);
						parentNode.insertBefore(mentionSpan, afterNode);
						parentNode.insertBefore(beforeNode, mentionSpan);

						return true;
					}
				} else {
					const splitPos = position - offset;
					const splitPostAfter = splitPos + 1 + userTypedMention;
					const beforeText = node.textContent?.slice(0, splitPos) || '';
					// skip the '@'
					const afterText = node.textContent?.slice(splitPostAfter) || '';

					const textNode = node as Text;
					const beforeNode = document.createTextNode(beforeText);
					const afterNode = document.createTextNode(afterText);

					const parentNode = node.parentNode;
					if (parentNode) {
						parentNode.replaceChild(afterNode, textNode);
						parentNode.insertBefore(mentionSpan, afterNode);
						parentNode.insertBefore(beforeNode, mentionSpan);

						return true;
					}
				}
			}
			offset += textLength;
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			for (const child of Array.from(node.childNodes)) {
				if (traverseAndInsert(child)) return true;
			}
		}
		return false;
	};

	const inserted = traverseAndInsert(parent);
	return inserted ? mentionSpan : null;
};
