from app.services.ocr_service import extract_text_from_image
from app.services.language_service import detect_language, translate_to_english
from app.services.text_extraction import clean_text, extract_amounts, extract_date
from app.services.supabase_service import upload_receipt_file
from app.services.transaction_service import save_transaction

def process_uploaded_file(file_bytes: bytes, content_type: str, user):
    # Upload file first
    file_url = upload_receipt_file(
        user_id=user.id,
        file_bytes=file_bytes,
        filename="receipt",
        content_type=content_type
    )

    # OCR
    extracted_text = extract_text_from_image(file_bytes)

    # Language detection
    lang = detect_language(extracted_text)

    # Translation
    translated_text = (
        translate_to_english(extracted_text) if lang != "en" else extracted_text
    )

    # Cleaning + extraction
    cleaned = clean_text(translated_text)
    amounts = extract_amounts(cleaned)
    date = extract_date(cleaned)

    # Prepare DB record
    record = {
        "user_id": user.id,
        "store_name": "Unknown",
        "language": lang,
        "translated_text": translated_text,
        "date": date,
        "total": amounts["total"],
        "paid": amounts["paid"],
        "balance": amounts["balance"],
        "raw_text": extracted_text,
        "cleaned_text": cleaned,
        "file_url": file_url
    }

    # Save to DB
    save_transaction(record)

    return record