from langdetect import detect
from deep_translator import GoogleTranslator

def detect_language(text: str) -> str:
    try:
        return detect(text)
    except:
        return "unknown"

def translate_to_english(text: str) -> str:
    try:
        return GoogleTranslator(source='auto', target='en').translate(text)
    except:
        return text  # fallback