import requests
import json
import os
import time

BASE_URL = "https://api.openalex.org"

def find_author_id(author_name, institution=None):
    """Search for an author by name (and optional institution)."""
    params = {
        "search": author_name,
        "per-page": 5
    }
    if institution:
        params["filter"] = f"last_known_institution.display_name.search:{institution}"

    r = requests.get(f"{BASE_URL}/authors", params=params)
    r.raise_for_status()
    data = r.json()

    if data["results"]:
        author = data["results"][0]
        print(f"Found author: {author['display_name']} ({author['id']})")
        return author["id"]
    else:
        print("No author found.")
        return None


def get_author_works(author_id):
    """Retrieve all works for a given author."""
    works = []
    cursor = "*"

    while True:
        params = {
            "filter": f"author.id:{author_id}",
            "per-page": 50,
            "cursor": cursor
        }
        r = requests.get(f"{BASE_URL}/works", params=params)
        r.raise_for_status()
        data = r.json()

        works.extend(data["results"])
        cursor = data.get("meta", {}).get("next_cursor")

        if not cursor:
            break

        time.sleep(0.2)  # be polite

    print(f"Collected {len(works)} works.")
    return works



def process_work(work):
    """Extract the fields we care about."""
    return {
        "id": work.get("id"),
        "title": work.get("title"),
        "doi": work.get("doi"),
        "year": work.get("publication_year"),
        "cited_by": work.get("cited_by_count"),
        "abstract": work.get("abstract_inverted_index"), 
        "abstract_plaintext": inverted_to_text(work.get("abstract_inverted_index")),
        "primary_location": work.get("primary_location", {}),
        "pdf_url": extract_pdf(work),
        "references": work.get("referenced_works", []),
    }


def inverted_to_text(inverted):
    """Convert OpenAlex's inverted-index abstracts into normal text."""
    if not inverted:
        return None

    words = []
    for word, positions in inverted.items():
        for pos in positions:
            # Extend list if needed
            if len(words) <= pos:
                words.extend([None] * (pos - len(words) + 1))
            words[pos] = word

    return " ".join(w for w in words if w)


def extract_pdf(work):
    """Try to extract a usable PDF link from the primary_location block."""
    loc = work.get("primary_location", {})
    if loc and loc.get("pdf_url"):
        return loc["pdf_url"]

    # fallback: maybe "landing_page_url"
    if loc and loc.get("landing_page_url"):
        return loc["landing_page_url"]

    return None


def save_results(name, works):
    """Save results into a folder."""
    folder = f"outputs/results_{name.replace(' ', '_')}"
    os.makedirs(folder, exist_ok=True)

    for w in works:
        processed = process_work(w)
        fname = os.path.join(folder, f"{processed['id'].split('/')[-1]}.json")

        with open(fname, "w", encoding="utf-8") as f:
            json.dump(processed, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(works)} papers in {folder}/")


if __name__ == "__main__":
    name = input("Author name: ")
    institution = input("Institution filter (press ENTER to skip): ").strip() or None

    author_id = find_author_id(name, institution)
    if not author_id:
        exit()

    works = get_author_works(author_id)
    save_results(name, works)
