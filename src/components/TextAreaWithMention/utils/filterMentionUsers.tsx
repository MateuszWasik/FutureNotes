import { User } from '@/hooks/useGetUsers';

export const filterMentionUsers = (
	surfeNotesUsers: User[],
	userTypedText: string,
	caretPositionWhenStartMentioning: number,
	actualCaretPositionAfterTyping: number
) => {
	return surfeNotesUsers.filter(({ first_name, last_name }) => {
		const combinedName = `${first_name} ${last_name}`;
        
		return combinedName
			.toLowerCase()
			.includes(
				userTypedText
					.slice(
						caretPositionWhenStartMentioning,
						actualCaretPositionAfterTyping
					)
					.toLowerCase()
			);
	});
};
