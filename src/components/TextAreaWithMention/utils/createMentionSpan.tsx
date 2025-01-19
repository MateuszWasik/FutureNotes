export const createMentionSpan = (clickedUser: string) => {
	const mentionSpan = document.createElement('span');
	mentionSpan.contentEditable = 'false';
	mentionSpan.className =
		'capitalize font-bold pointer-events-none select-none inline-block';
	mentionSpan.textContent = `@${clickedUser}`;
	mentionSpan.id = new Date().getTime().toString();

	return mentionSpan;
};
