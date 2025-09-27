# ai/inference.py
import sys
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text):
    scores = analyzer.polarity_scores(text)
    compound = scores['compound']

    if compound >= 0.05:
        return "positive"
    elif compound <= -0.05:
        return "negative"
    else:
        return "neutral"

if __name__ == "__main__":
    text = sys.argv[1] if len(sys.argv) > 1 else ""
    print(analyze_sentiment(text))
