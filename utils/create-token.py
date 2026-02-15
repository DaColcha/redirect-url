import secrets
import requests

def generate_urlsafe_token(length=32):
    return secrets.token_urlsafe(length)

#Send webhook with token
def send_webhook(url, token):
    data = {
        "token": token,
        "action": "create"
    }
    response = requests.post(url, json=data)
    
    if response.status_code == 204:
        print("Webhook sent successfully.")
    else:
        print(f"Failed to send webhook. Status code: {response.status_code}")
        print(f"Response content: {response.content}")
        
url = "https://theistical-maryellen-polishedly.ngrok-free.dev/webhook/9e885b4e-1c64-42f7-928f-0a3ec3eb8d2c"
token = generate_urlsafe_token()
send_webhook(url, token)
print(f"Generated token: {token}")