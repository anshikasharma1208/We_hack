from datetime import datetime, timedelta

def schedule_next_review(last_review, difficulty):
    if difficulty == "Easy":
        return last_review + timedelta(days=5)
    elif difficulty == "Medium":
        return last_review + timedelta(days=3)
    else:  # Hard
        return last_review + timedelta(days=1)
