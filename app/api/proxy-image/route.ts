/**
 * GET /api/proxy-image
 *
 * 외부 이미지를 프록시하여 CORS 문제 해결
 *
 * @query url - 이미지 URL (URL encoded)
 *
 * @response
 * - 200: 이미지 바이너리 (적절한 Content-Type 헤더)
 * - 400: URL 누락
 * - 500: 이미지 가져오기 실패
 */

import { NextRequest, NextResponse } from 'next/server';

// 허용된 이미지 확장자/MIME 타입
const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
];

// 캐시 시간 (1시간)
const CACHE_MAX_AGE = 3600;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // URL 디코딩
    const decodedUrl = decodeURIComponent(imageUrl);

    // URL 유효성 검사
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(decodedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL' },
        { status: 400 }
      );
    }

    // HTTP/HTTPS만 허용
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: 'Only HTTP/HTTPS URLs are allowed' },
        { status: 400 }
      );
    }

    console.log(`[Image Proxy] Fetching: ${decodedUrl.slice(0, 100)}...`);

    // 외부 이미지 가져오기
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageProxy/1.0)',
        'Accept': 'image/*',
      },
      // 리다이렉트 따라가기
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error(`[Image Proxy] Failed to fetch: ${response.status}`);
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      );
    }

    // Content-Type 확인
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const isAllowedType = ALLOWED_CONTENT_TYPES.some(type =>
      contentType.toLowerCase().includes(type.split('/')[1])
    );

    if (!isAllowedType) {
      console.error(`[Image Proxy] Invalid content type: ${contentType}`);
      return NextResponse.json(
        { error: 'Not an image' },
        { status: 400 }
      );
    }

    // 이미지 바이너리 가져오기
    const imageBuffer = await response.arrayBuffer();

    console.log(`[Image Proxy] Success: ${contentType}, ${imageBuffer.byteLength} bytes`);

    // 이미지 반환
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('[Image Proxy] Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
