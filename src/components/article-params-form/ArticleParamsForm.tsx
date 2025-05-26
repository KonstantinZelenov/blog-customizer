import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator/Separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onStateChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) {
			setFormState(currentState);
		}
	}, [currentState, isOpen]);

	const handleToggleForm = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateChange(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onStateChange(formState);
		setIsOpen(false);
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
		onClose: () => setFormState(currentState),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleForm} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
