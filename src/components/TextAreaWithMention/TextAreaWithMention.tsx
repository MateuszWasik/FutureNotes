import { useDebounce } from '@/hooks/useDebounce';
import { Note } from '@/hooks/useGet';
import { useGetUsers, User } from '@/hooks/useGetUsers';
import { useSaveNote } from '@/hooks/useSaveNote';
import React, { useState, useRef, useEffect } from 'react';
import { filterMentionUsers } from './utils/filterMentionUsers';
import { createMentionSpan } from './utils/createMentionSpan';
import { calculateCaretOffset } from './utils/calculateCaretOffset';
import { placeMentionAtProperPosition } from './utils/placeMentionAtProperPosition';

type MentionTextareaProps = {
	note: Note;
};

export const MentionTextarea = ({ note }: MentionTextareaProps) => {
	const [inputValue, setInputValue] = useState(note.body ?? '');
	const [inputValueAsHTML, setInputValueAsHTML] = useState(note.body ?? '');
	const { saveNote } = useSaveNote(note.id);
	const debouncedValue = useDebounce(inputValueAsHTML, 500);
	const previousValue = useRef<string>(note.body ?? '');

	const [showSuggestions, setShowSuggestions] = useState(false);
	const [caretAbsoluteCoordinates, setCaretAbsoluteCoordinates] = useState({
		top: 0,
		left: 0,
	});
	const surfeNotesUsers = useGetUsers();
	const [mentionUsers, setMentionUsers] = useState<User[]>(
		surfeNotesUsers ?? []
	);
	const contentEditableDivRef = useRef<HTMLDivElement>(null);
	const isMentionTypingRef = useRef(false);
	const caretPositionWhenStartMentioning = useRef(0);
	const typedMentionByUserRef = useRef(0);

	useEffect(() => {
		if (contentEditableDivRef.current) {
			contentEditableDivRef.current.innerHTML = inputValueAsHTML;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!localStorage.getItem('note-id')) {
			localStorage.setItem('note-id', note.id);
		}

		localStorage.setItem('note-edit', debouncedValue);
	}, [note.id, debouncedValue]);

	// usEffect for deboucing and saving a note
	useEffect(() => {
		if (debouncedValue && debouncedValue !== previousValue.current) {
			saveNote(debouncedValue);
			previousValue.current = debouncedValue;
		}
	}, [debouncedValue, saveNote, inputValue]);

	// that's the main function for handling note saving
	// it will invoke another useEffect
	// that will save the note
	const handleOnChange = (event: React.ChangeEvent<HTMLDivElement>) => {
		const textValueAsHTML = event.target.innerHTML;
		const textValue = event.target.textContent;
		if (textValue === null) return;
		setInputValue(textValue);
		setInputValueAsHTML(textValueAsHTML);
		localStorage.setItem('note-edit', textValue);
	};

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

				// we need absolute coordinates of the caret position for
				// suggestion box to appear at the correct position
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
				setCaretAbsoluteCoordinates({
					top: caretCoord.top - textareaDivCoordinates.top,
					left: caretCoord.left - textareaDivCoordinates.left,
				});

				setShowSuggestions(true);
			}
		}

		if (isMentionTypingRef.current === true) {
			const mentionUser = filterMentionUsers(
				surfeNotesUsers,
				userText,
				caretPositionWhenStartMentioning.current,
				caretPosition
			);

			// we want to watch how many characters user typed after @
			// so we can adjust the caret position when user selects a user from the list
			// we are subtracting 1 from caretPositionWhenStartMentioning.current
			// if user typed something after @
			// otherwise we will keep the caret position as it is
			const caretPositionBeforeAtSign =
				typedMentionByUserRef.current === 0
					? caretPositionWhenStartMentioning.current - 1
					: caretPositionWhenStartMentioning.current;
			typedMentionByUserRef.current = caretPosition - caretPositionBeforeAtSign;

			setMentionUsers(mentionUser);
		}

		handleOnChange(event as React.ChangeEvent<HTMLDivElement>);
	};

	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			const selection = window.getSelection();
			if (!selection || selection.rangeCount === 0) {
				console.error('No valid selection');
				return;
			}

			const range = selection.getRangeAt(0);
			const currentNode = range.startContainer;

			// we want to create a new div/span element after the current node but inside the parent div
			const newDiv = document.createElement('div');
			const newSpan = document.createElement('span');
			newSpan.textContent = ' ';
			newDiv.appendChild(newSpan);

			// checking if the currentNode is a TEXT_NODE or ELEMENT_NODE and handle it
			// setStart/endStart behaviour diffently for TEXT_NODE and ELEMENT_NODE
			if (currentNode.nodeType === Node.TEXT_NODE) {
				const parentElement = currentNode.parentElement;

				// if inside a parent element (like a span or div), insert the new div 
				// after the current node
				if (parentElement) {
					const parentDiv = parentElement.closest('div');
					if (parentDiv) {
						parentDiv.parentNode?.insertBefore(newDiv, parentDiv.nextSibling);

						// Move the caret to the new span inside the new div
						const newRange = document.createRange();
						newRange.setStart(newSpan, 0);
						newRange.setEnd(newSpan, 0);
						selection.removeAllRanges();
						selection.addRange(newRange);
					}
				}
			} else if (currentNode.nodeType === Node.ELEMENT_NODE) {
				// if we're directly inside an element (e.g., div)
				// we will insert the new div after it
				currentNode.parentNode?.insertBefore(newDiv, currentNode.nextSibling);

				// move the caret to the new span inside the new div
				const newRange = document.createRange();
				newRange.setStart(newSpan, 0);
				newRange.setEnd(newSpan, 0);
				selection.removeAllRanges();
				selection.addRange(newRange);
			}
		}

		if (event.key === 'Backspace') {
			const caretPosition = getCaretCharacterOffsetWithin(
				contentEditableDivRef.current as HTMLElement
			);
			const userText = contentEditableDivRef.current?.textContent;

			// we need to check if user deletes the @ symbol to close the 
			// suggestion box and reset all the supported states
			if (userText?.[caretPosition - 1] === '@') {
				caretPositionWhenStartMentioning.current = 0;

				// reset all the mention typing "states"
				isMentionTypingRef.current = false;
				typedMentionByUserRef.current = 0;
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

	const handleInsertMention = (event: React.MouseEvent<HTMLLIElement>) => {
		const clickedUser = (event.target as HTMLLIElement).textContent;
		if (clickedUser === null) return;

		const contentEditableDiv = contentEditableDivRef.current;
		if (!contentEditableDiv) return;

		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);

		// calculate true caret position inside the correct node including html tags
		const caretPosition = calculateCaretOffset(contentEditableDiv, range);

		const mentionSpan = createMentionSpan(clickedUser);

		const insertedMention = placeMentionAtProperPosition(
			contentEditableDiv,
			caretPosition - 1, // -1 because we want to move caret at the position of @ that was typed
			mentionSpan,
			typedMentionByUserRef.current
		);

		if (insertedMention) {
			// this will create a new Range and set caret position after new mention span
			const newRange = document.createRange();
			newRange.setStartAfter(insertedMention);
			newRange.setEndAfter(insertedMention);

			selection.removeAllRanges();
			selection.addRange(newRange);

			setShowSuggestions(false);
			setInputValueAsHTML(contentEditableDivRef.current?.innerHTML ?? '');
		} else {
			console.error('Failed to insert mention span');
		}
	};

	return (
		<div className='relative h-full w-full'>
			<div
				className=' w-full max-w-[700px] h-full p-3 overflow-y-scroll whitespace-pre-wrap break-words border border-gray-300 rounded-md focus-visible:outline-none'
				contentEditable
				ref={contentEditableDivRef}
				onKeyDown={handleOnKeyDown}
				onInput={handleOnInput}
			></div>

			{showSuggestions && (
				<ul
					className='absolute  cursor-default bg-white shadow-md w-[200px]'
					style={{
						top: caretAbsoluteCoordinates.top + 20,
						left: caretAbsoluteCoordinates.left + 10,
					}}
				>
					{mentionUsers.map((user, index) => {
						if (index >= 5) return;
						return (
							<li
								key={user.username}
								className='p-2 hover:bg-gray-200'
								onClick={handleInsertMention}
							>
								<span className='capitalize'>
									{user.first_name} {user.last_name}
								</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};
