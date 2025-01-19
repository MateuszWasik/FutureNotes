export const placeMentionAtProperPosition = (
	parent: HTMLElement,
	position: number,
	mentionSpan: HTMLSpanElement,
    howManyCharactersUserTypedAfterAtSymbol: number
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
			if (offset + textLength >= position) {
				const splitPos = position - offset;
				const beforeText =
					node.textContent?.slice(
						0,
						splitPos - howManyCharactersUserTypedAfterAtSymbol
					) || '';
				// skip the '@'
				const afterText = node.textContent?.slice(splitPos + 1) || '';

				console.log('current', howManyCharactersUserTypedAfterAtSymbol);
				console.log('beforeText:', beforeText);
				console.log('afterText:', afterText);

				const textNode = node as Text;
				const beforeNode = document.createTextNode(beforeText);
				const afterNode = document.createTextNode(afterText);

				if (beforeText.length == 1 && beforeText === '@') {
				}

				const parentNode = node.parentNode;
				if (parentNode) {
					// replace original text with afterNode
					parentNode.replaceChild(afterNode, textNode);
					parentNode.insertBefore(mentionSpan, afterNode);
					parentNode.insertBefore(beforeNode, mentionSpan);

					return true;
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
