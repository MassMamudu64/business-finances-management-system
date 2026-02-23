import easyocr
import numpy as np
import cv2

# Initialize once
reader = easyocr.Reader(['en'])

def extract_text_from_image(file_bytes: bytes) -> str:
    # Convert bytes → numpy array → image
    nparr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Run OCR
    text_results = reader.readtext(img, detail=0)

    return "\n".join(text_results)