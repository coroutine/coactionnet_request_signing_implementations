import { Md5 }    from 'https://deno.land/std/hash/md5.ts';
import { encode } from "https://deno.land/std/encoding/base64.ts"

enum RequestMethod {
  Get     = 'GET',
  Put     = 'PUT',
  Patch   = 'PATCH',
  Post    = 'POST',
  Delete  = 'DELETE'
}

type Path         = string;
type Timestamp    = number;
type Key          = string;
type RequestBody  = string | null;
type Signature    = string | Uint8Array;
type Digest       = string;

function bodyDigest(body: RequestBody): Digest {
  if(body === null) {
    return '';
  }
  const digest = new Md5();
  return digest.update(body).toString("base64");
}

export async function hmac(message: string, privateKey: Key): Promise<Signature> {
  const encoder = new TextEncoder()
  const keyBuf  = encoder.encode(privateKey);

  const key = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    {name: "HMAC", hash: "SHA-256"},
    false,
    ["sign", "verify"]
  );
  
  const data    = encoder.encode(message);
  const result  = await crypto.subtle.sign("HMAC", key , data.buffer);
  return encode(new Uint8Array(result));
}

// --------------------------------------------------------
// Signing Function
// --------------------------------------------------------

export async  function sign(method: RequestMethod, 
                            path: Path,
                            body: RequestBody,
                            timestamp: Timestamp,
                            publicKey: Key,
                            privateKey: Key): Promise<Signature> {

  const data = [method.toUpperCase(), 
                path.toLowerCase(), 
                bodyDigest(body), 
                timestamp, 
                publicKey].join('\n').trim();
  
  return await hmac(data, privateKey);
}