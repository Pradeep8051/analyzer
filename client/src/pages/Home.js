import React, { useState } from 'react';

function SentimentAnalysis() {
	const [text, setText] = useState('');
	const [sentiment, setSentiment] = useState(null);

	const analyzeSentiment = async () => {
		try {
			const response = await fetch('http://localhost:4000/analyze-sentiment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ text }),

			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setSentiment({
				score: data.score,
				positive: data.positive,
				negative: data.negative,
			});
			setText('');		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: "50px" }}>
				<textarea
					style={{ width: "450px" }}
					placeholder="Enter text for sentiment analysis..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={analyzeSentiment}>Analyze Sentiment</button>
			</div>

			{sentiment && (
				<div>
					<h2>Sentiment Analysis Result:</h2>

					<p>Score: {sentiment.score}</p>
					<h3>Sentense:{text}</h3>
					<h4>Positive Words:- {sentiment.positive.join(', ')}</h4>
					<h4>Negative Words:- {sentiment.negative.join(', ')}</h4>
				</div>
			)}
		</div>
	);
}

export default SentimentAnalysis;
