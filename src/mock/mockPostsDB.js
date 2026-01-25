const LS_KEY = "LV_MOCK_POSTS_DB";

// 처음 1회만 들어갈 기본 글 (좌표 예시: 서울)
const DEFAULT_POSTS = [
  {
    id: "p1",
    title: "첫번째 럭키비키",
    author: "테스트유저",
    createdAt: "2025-09-12T13:45:00+09:00",
    address: "서울 강북구 도봉로 361-1",
    lat: 37.6397,
    lng: 127.0257,
  },
  {
    id: "p2",
    title: "두번째 럭키비키",
    author: "테스트유저, YL",
    createdAt: "2025-09-12T13:45:00+09:00",
    address: "서울 강북구 도봉로 361-1",
    lat: 37.6397,
    lng: 127.0257,
  },
  {
    id: "p3",
    title: "다른 위치 럭키비키",
    author: "테스트유저",
    createdAt: "2025-10-01T09:10:00+09:00",
    address: "서울 강북구 수유동 273-54",
    lat: 37.6452,
    lng: 127.0193,
  },
];

function safeParse(raw) {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

function loadDB() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_POSTS));
    return [...DEFAULT_POSTS];
  }
  const parsed = safeParse(raw);
  if (!parsed) {
    localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_POSTS));
    return [...DEFAULT_POSTS];
  }
  return parsed;
}

function saveDB(posts) {
  localStorage.setItem(LS_KEY, JSON.stringify(posts));
}

export function getPosts() {
  return loadDB();
}

export function addPost(post) {
  const db = loadDB();
  const newPost = {
    ...post,
    id: post.id || `p_${Date.now()}`,
  };
  db.unshift(newPost);
  saveDB(db);
  return { ok: true, post: newPost };
}

export function deletePost(postId) {
  const db = loadDB();
  const next = db.filter((p) => p.id !== postId);
  if (next.length === db.length) return { ok: false, message: "삭제할 글이 없습니다." };
  saveDB(next);
  return { ok: true };
}

/**
 * 같은 위치 글을 “핀 단위”로 묶기
 * - lat/lng가 완전 동일하면 같은 그룹
 * - 실제 서비스면 반경(예: 30m) 기준으로 묶는 게 더 자연스러움
 */
export function groupPostsByExactLatLng(posts) {
  const map = new Map();
  for (const p of posts) {
    const key = `${p.lat},${p.lng}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(p);
  }

  // createdAt 내림차순 정렬
  for (const [k, arr] of map.entries()) {
    arr.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    map.set(k, arr);
  }

  return Array.from(map.entries()).map(([key, items]) => {
    const [latStr, lngStr] = key.split(",");
    return {
      pinId: key,
      lat: Number(latStr),
      lng: Number(lngStr),
      address: items[0]?.address || "",
      items,
    };
  });
}

// 화면 표시용 날짜
export function formatKoreanDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // 간단 포맷: YYYY-MM-DD | 오후/오전 h:mm
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "오후" : "오전";
  h = h % 12;
  if (h === 0) h = 12;
  return `${yyyy}-${mm}-${dd} | ${ampm} ${h}:${m}`;
}
