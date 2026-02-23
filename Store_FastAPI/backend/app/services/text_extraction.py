import re

def clean_text(text: str) -> str:
    text = re.sub(r"[^a-zA-Z0-9\s\.,:/\-]", " ", text)
    text = re.sub(r"\s+", " ", text)
    text = text.replace("\n ", "\n").strip()
    return text


def extract_amounts(text: str):
    amounts = re.findall(r"\d+\.\d+|\d+", text)
    amounts = [float(a.replace(",", ".")) for a in amounts]

    total = paid = balance = None

    if len(amounts) >= 3:
        total = amounts[-3]
        paid = amounts[-2]
        balance = amounts[-1]

    return {
        "total": total,
        "paid": paid,
        "balance": balance
    }


def extract_date(text: str):
    match = re.search(r"(\d{2}[\/\-]\d{2}[\/\-]\d{2,4})", text)
    if not match:
        return None

    raw = match.group(1)
    parts = re.split(r"[\/\-]", raw)

    day, month, year = parts

    if len(year) == 2:
        year = "20" + year

    return f"{year}-{month}-{day}"