import requests
import json

# Your Infobip API credentials
API_KEY = 'eea2bc427153e7ddcff15339c0475d5a-bb9dab2b-adfc-4fa2-a63f-97661cca651a'
BASE_URL = 'https://api.infobip.com/2fa/2/pin'  # Example: "https://api.infobip.com"

# Set up headers for the request
headers = {
    'Authorization': f'App {API_KEY}',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

# Create the message object
message = {
    "messages": [
        {
            "to": "+254768441549",  # The recipient phone number
            "from": "CoolGopher",  # Sender ID
            "text": "Hello from Infobip Python SDK!"  # The SMS content
        }
    ]
}

# Send the SMS message
response = requests.post(
    f"{BASE_URL}/sms/1/text/single",  # The endpoint for sending a single SMS message
    headers=headers,
    data=json.dumps(message)
)

# Check the response
if response.status_code == 200:
    print("Message sent successfully!")
    print("Response:", response.json())
else:
    print("Error sending message:", response.status_code)
    print(response.text)

# Optionally, print HTTP response status
print(f"HTTP Response Status Code: {response.status_code}")
