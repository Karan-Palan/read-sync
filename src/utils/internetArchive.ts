// helper to fetch book data from internet archive
import axios from 'axios';
import fs from 'fs';
import { IAResult } from '../types/bookFetcher';

// Search url - https://archive.org/advancedsearch.php?q=title:%22YOUR%20BOOK%20TITLE%22%20AND%20mediatype:texts&fl[]=identifier,fl[]=title,fl[]=creator,fl[]=date,fl[]=format,fl[]=mediatype&rows=1&page=1&output=json
// Then metadata - GET https://archive.org/metadata/<identifier>
// then download url - https://archive.org/download/<identifier>/<URL-ENCODED-filename>

/**
 * searchByTitle
 *  - Runs an exact-title IA search for any book title you pass in.
 *  - Returns the first matching identifier (or null if none).
 */
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

  try {
    const resp = await axios.get(url);
    const docs = resp.data?.response?.docs as any[]; // Creates an array of docs as seen in the api response

    if (!docs || docs.length === 0) return null;

    const doc = docs[0];
    return {
      identifier: doc.identifier,
      title: doc.title,
      creator: doc.creator || '',
      date: doc.date || '',
      format: doc.format || [],
      mediatype: doc.mediatype || '',
    };
  } catch (error) {
    console.error('Error searching Internet Archive:', error);
    return null;
    // TODO: add fallback to libgen or search parallely
  }
}

/**
 * downloadByIdentifier
 *  - Given an `<identifier>`, fetches metadata and downloads the first EPUB or PDF it finds.
 *  - Saves it under `./storage/books/<identifier>/` with the original filename.
 *  - Returns the local file path once done.
 */
export async function downloadByIdentifier(identifier: string): Promise<string> {
  // fetch metadata
  const metaUrl = `https://archive.org/metadata/${identifier}`;
  const metaResp = await axios.get(metaUrl);
  const files = metaResp.data.files as Array<{ name: string; format: string }>;
  // choose type
  let chosen = files.find(f => f.format.toLowerCase().includes('epub'));
  if (!chosen) {
    chosen = files.find(f => f.format.toLowerCase().includes('pdf'));
  }
  if (!chosen) {
    throw new Error('No EPUB or PDF found for this book');
  }

  const rawFileName = chosen.name;
  const encodedFileName = encodeURIComponent(rawFileName);

  // build download url
  const finalDownloadURL = `https://archive.org/download/${identifier}/${encodedFileName}`;

  // TODO: connect db and complete

  return '';
}
