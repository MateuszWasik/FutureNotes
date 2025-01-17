import { useDebounce } from '@/hooks/useDebounce';
import { Note } from '@/hooks/useGet';
import { useSaveNote } from '@/hooks/useSaveNote';
import React, { useState, useRef, useEffect } from 'react';

type MentionTextareaProps = {
	note: Note;
};

type User = {
	first_name: string;
	last_name: string;
	username: string;
};

export const MentionTextarea = ({ note }: MentionTextareaProps) => {
	const [inputValue, setInputValue] = useState(note.body ?? '');
	const [inputValueAsHTML, setInputValueAsHTML] = useState(note.body ?? '');
	const saveNote = useSaveNote(note.id);
	const debouncedValue = useDebounce(inputValueAsHTML, 500);
	const previousValue = useRef<string>(note.body ?? '');
	const [carretsOffsetPosition, setCarretsOffsetPosition] = useState(0);

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [caretCoordinates, setCaretCoordinates] = useState({ top: 0, left: 0 });
	const mockUsers: User[] = [
		{
			first_name: 'Jane',
			last_name: 'Smith',
			username: 'Jane123',
		},
		{
			first_name: 'Alice',
			last_name: 'Johnson',
			username: 'Alice123',
		},
		{
			first_name: 'Mateusz',
			last_name: 'Ja',
			username: 'Mateusz123',
		},
		{
			first_name: 'Radomir',
			last_name: 'Ty',
			username: 'Radomir123',
		},
		{
			first_name: 'Agata',
			last_name: 'Ona',
			username: 'Agata123',
		},
		{
			first_name: 'Mis',
			last_name: 'Uszat',
			username: 'Mis123',
		},
	];
	const [mentionUsers, setMentionUsers] = useState<User[]>(mockUsers);
	const contentEditableDivRef = useRef<HTMLDivElement>(null);
	const isMentionTypingRef = useRef(false);
	const caretPositionWhenStartMentioning = useRef(0);

	useEffect(() => {
		if (contentEditableDivRef.current) {
			contentEditableDivRef.current.innerHTML = inputValueAsHTML;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOnChange = (event: React.ChangeEvent<HTMLDivElement>) => {
		const textValueAsHTML = event.target.innerHTML;
		const textValue = event.target.textContent;
		if (textValue === null) return;
		setInputValue(textValue);
		setInputValueAsHTML(textValueAsHTML);
		localStorage.setItem('note-edit', textValue);
	};

	useEffect(() => {
		if (!localStorage.getItem('note-id')) {
			localStorage.setItem('note-id', note.id);
		}

		localStorage.setItem('note-edit', debouncedValue);
	}, [note.id, debouncedValue]);

	useEffect(() => {
		if (debouncedValue && debouncedValue !== previousValue.current) {
			saveNote(debouncedValue);
			previousValue.current = debouncedValue;
		}
	}, [debouncedValue, saveNote, inputValue]);

	const handleOnInput = (event: React.FormEvent<HTMLDivElement>) => {
		const userText = (event.target as HTMLDivElement).textContent;

		if (userText === null || contentEditableDivRef.current === null) return;

		const caretPosition = getCaretCharacterOffsetWithin(
			contentEditableDivRef.current
		);
		const divPosition = contentEditableDivRef.current?.getBoundingClientRect();

		if (divPosition === undefined) return;

		if (caretPosition) {
			if (userText[caretPosition - 1] === '@') {
				isMentionTypingRef.current = true;
				caretPositionWhenStartMentioning.current = caretPosition;
				const caretCoord = {
					top:
						window.getSelection()?.getRangeAt(0).getBoundingClientRect().top ||
						0,
					left:
						window.getSelection()?.getRangeAt(0).getBoundingClientRect().left ||
						0,
				};
				const textareaDivCoordinates = {
					top: divPosition.top,
					left: divPosition.left,
				};
				setCaretCoordinates({
					top: caretCoord.top - textareaDivCoordinates.top,
					left: caretCoord.left - textareaDivCoordinates.left,
				});

				setShowSuggestions(true);
			}
		}

		if (isMentionTypingRef.current === true) {
			const mentionUser = mockUsers.filter(({ username }) =>
				username
					.toLowerCase()
					.includes(
						userText
							.slice(caretPositionWhenStartMentioning.current, caretPosition)
							.toLowerCase()
					)
			);

			setMentionUsers(mentionUser);
		}

		handleOnChange(event as React.ChangeEvent<HTMLDivElement>);
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Backspace') {
			const caretPosition = window.getSelection()?.anchorOffset || 0;
			const userText = contentEditableDivRef.current?.textContent;

			if (userText?.[caretPosition - 1] === '@') {
				caretPositionWhenStartMentioning.current = 0;
				isMentionTypingRef.current = false;
				setShowSuggestions(false);
			}
		}
	};

	const getCaretCharacterOffsetWithin = (element: HTMLElement) => {
		let caretOffset = 0;
		if (typeof window.getSelection !== 'undefined') {
			const windowSelection = window.getSelection();
			const windowSelectionRange = window.getSelection()?.getRangeAt(0);

			if (windowSelection !== null && windowSelection.rangeCount > 0) {
				if (windowSelectionRange === undefined) return 0;
				const preCaretRange = windowSelectionRange.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(
					windowSelectionRange.endContainer,
					windowSelectionRange.endOffset
				);
				caretOffset = preCaretRange.toString().length;
			}
		}
		return caretOffset;
	};

	const showCaretPos = () => {
		if (contentEditableDivRef.current === null) return;
		setCarretsOffsetPosition(
			getCaretCharacterOffsetWithin(
				contentEditableDivRef.current as HTMLElement
			)
		);
	};

	return (
		<div className='relative h-full w-full'>
			<div
				className=' w-full max-w-[700px] h-full p-3 overflow-y-scroll whitespace-pre-wrap break-words border border-gray-300 rounded-md focus-visible:outline-none'
				contentEditable
				ref={contentEditableDivRef}
				onKeyDown={handleOnKeyDown}
				onInput={handleOnInput}
				onMouseUp={showCaretPos}
				onKeyUp={showCaretPos}
			></div>

			<div className='absolute bottom-0 left-1'>
				Caret position: {carretsOffsetPosition}
			</div>

			{showSuggestions && (
				<ul
					className='absolute cursor-pointer bg-white shadow-md w-[200px]'
					style={{
						top: caretCoordinates.top + 20,
						left: caretCoordinates.left + 10,
					}}
				>
					{mentionUsers.map((user, index) => {
						if (index >= 5) return;
						return (
							<li
								key={user.username}
								className='p-2 hover:bg-gray-200'
								onClick={() => setShowSuggestions(false)}
							>
								{user.username}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
