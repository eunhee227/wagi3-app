const LS_KEY = "LV_MOCK_USER_DB";

// 초기 유저
const DEFAULT_USERS = [
  { id: "test", password: "123456", name: "테스트유저", intro: "테스트유저입니다" },
  { id: "yl", password: "123456", name: "YL", intro: "개발자유저입니다." },
];

function loadDB() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_USERS));
      return [...DEFAULT_USERS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_USERS];
  } catch {
    localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_USERS));
    return [...DEFAULT_USERS];
  }
}

function saveDB(db) {
  localStorage.setItem(LS_KEY, JSON.stringify(db));
}

/** 공용 getter */
export function getUsers() {
  return loadDB();
}

export function isDuplicatedId(id) {
  const db = loadDB();
  return db.some((u) => u.id === id);
}

export function findUser(id, password) {
  const db = loadDB();
  return db.find((u) => u.id === id && u.password === password) || null;
}

export function addUser(newUser) {
  const db = loadDB();
  if (db.some((u) => u.id === newUser.id)) {
    return { ok: false, message: "이미 존재하는 아이디입니다." };
  }
  db.push(newUser);
  saveDB(db);
  return { ok: true, user: newUser };
}

export function updateUserIntro(id, intro) {
  const db = loadDB();
  const idx = db.findIndex((u) => u.id === id);
  if (idx === -1) return { ok: false, message: "유저를 찾을 수 없습니다." };
  db[idx] = { ...db[idx], intro };
  saveDB(db);
  return { ok: true, user: db[idx] };
}

/**
 * 현재 비밀번호 검증
 * @param {string} id
 * @param {string} currentPassword  사용자가 입력한 "현재 비번"
 * @param {string} newPassword      새 비번
 */
export function updateUserPassword(id, currentPassword, newPassword) {
  const db = loadDB();
  const idx = db.findIndex((u) => u.id === id);
  if (idx === -1) return { ok: false, message: "유저를 찾을 수 없습니다." };

  if (db[idx].password !== currentPassword) {
    return { ok: false, message: "현재 비밀번호가 올바르지 않습니다." };
  }

  db[idx] = { ...db[idx], password: newPassword };
  saveDB(db);
  return { ok: true, user: db[idx] };
}

export function deleteUser(userId) {
  const db = loadDB();
  const next = db.filter((u) => u.id !== userId);

  if (next.length === db.length) {
    return { ok: false, message: "삭제할 사용자를 찾을 수 없습니다." };
  }

  saveDB(next);
  return { ok: true };
}
