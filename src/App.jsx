import { useState } from 'react';
import styles from './app.module.css';

const getDate = () => {
	const date = new Date();
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const isValueVaild = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setValue('');
			return;
		}

		setValue(promptValue);
		setError('');
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			setList((currentList) => [
				...currentList,
				{ id: Date.now(), value: value, date: getDate() },
			]);
			setError('');
			setValue('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: &quot;
				<output className={styles['current-value']}>{value}</output>&quot;
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : null}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map((item) => (
							<li key={item.id} className={styles['list-item']}>
								{item.value}
								<p style={{ opacity: 0.5 }}>{item.date}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
