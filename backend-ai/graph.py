import numpy as np
import plotly.graph_objects as go
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

json_file_path = os.path.join(os.path.dirname(__file__), "quiz-result.json")

try:
    with open(json_file_path, "r") as file:
        quiz_data = json.load(file)
    print("✅ JSON Loaded Successfully")
except FileNotFoundError:
    print(f"❌ Error: File not found at {json_file_path}")

df = pd.DataFrame(quiz_data)

# Ensure columns exist
if not {"user_id", "question_id", "time_since_last_review", "score"}.issubset(df.columns):
    raise ValueError("❌ JSON file is missing required columns!")

def forgetting_curve(t, S):
    return np.exp(-t / S)

def detect_weakness(df):
    weakness_df = df.groupby("question_id")["score"].mean().reset_index()
    weak_questions = weakness_df[weakness_df["score"] < 50]
    return weak_questions

def performance_summary(df):
    summary = df.groupby("question_id")["score"].agg(["mean", "max", "min"]).reset_index()
    best_question = summary.loc[summary["mean"].idxmax()]
    worst_question = summary.loc[summary["mean"].idxmin()]
    
    return {
        "avg_score": df["score"].mean(),
        "best_question": best_question["question_id"],
        "worst_question": worst_question["question_id"]
    }


X = df["time_since_last_review"].values.reshape(-1, 1)
y = df["score"].values
model = LinearRegression().fit(X, y)

# 🔮 Predict Forgetting Curve for Next 30 Days
future_days = np.arange(0, 30).reshape(-1, 1)
predicted_scores = model.predict(future_days)

fig = go.Figure()

fig.add_trace(go.Scatter(
    x=df["time_since_last_review"],
    y=df["score"],
    mode="markers",
    marker=dict(size=10, color="#DE497F", opacity=0.7),
    name="Actual Performance"
))


fig.add_trace(go.Scatter(
    x=future_days.flatten(),
    y=predicted_scores,
    mode="lines",
    line=dict(color="#436CD8", width=4, dash="dash"),
    name="Predicted Forgetting Curve"
))


fig.update_layout(
    title="Personalized Learning Graph",
    xaxis=dict(title="Days Since Last Review", gridcolor="rgba(255,255,255,0.2)"),
    yaxis=dict(title="Memory Retention (%)", gridcolor="rgba(255,255,255,0.2)"),
    template="plotly_dark",  
    paper_bgcolor="rgba(0,0,0,0)",  
    plot_bgcolor="rgba(0,0,0,0)",  
    font=dict(family="Arial, sans-serif", size=14, color="white"),
)

fig.show()


weaknesses = detect_weakness(df)
summary = performance_summary(df)

print("🚨 Weakness Detected in Questions:", list(weaknesses["question_id"]))
print("📊 Performance Summary:", summary)
