curl -X POST https://messages-sandbox.nexmo.com/v1/messages \
-u '5748e62c:bxbRzqFtqO3Iu7ym' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
    "from": "14157386102",
    "to": "923344132940",
    "message_type": "text",
    "text": "Riaz This is a WhatsApp Message sent from the Messages API",
    "channel": "whatsapp"
  }'