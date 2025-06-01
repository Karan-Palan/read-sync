// helper to fetch book data from internet archive
import axios from 'axios';
import fs from 'fs';
import { IAResult } from '../types/bookFetcher';

// Search url - https://archive.org/advancedsearch.php?q=title:%22YOUR%20BOOK%20TITLE%22%20AND%20mediatype:texts&fl[]=identifier,fl[]=title,fl[]=creator,fl[]=date,fl[]=format,fl[]=mediatype&rows=1&page=1&output=json
// Then metadata - GET https://archive.org/metadata/<identifier>
// then download url - https://archive.org/download/<identifier>/<URL-ENCODED-filename>

export async function searchByTitle(title: string): Promise<IAResult | null> {
  const encoded = encodeURIComponent(`title:"${title}" AND mediatype:texts`);
  const fields = encodeURIComponent(
    ['identifier', 'title', 'creator', 'date', 'format', 'mediatype'].join(',')
  );
  const url =
    `https://archive.org/advancedsearch.php` +
    `?q=${encoded}` +
    `&fl[]=${fields}` +
    `&rows=1&page=1&output=json`;
}
