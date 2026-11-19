# SocialSpark Firestore Security Specification

## 1. Data Invariants
1. A `/users/{userId}` document represents personally identifiable information (fullName, email, phoneNumber) and can only be read, created, or updated by the authenticated user whose `request.auth.uid == userId`.
2. Collection-wide `list` queries on `/users` are strictly denied (`allow list: if false`) to prevent PII scraping across accounts.
3. Document IDs (`userId`) must satisfy `^[a-zA-Z0-9_\-]+$` with length `<= 128`.
4. All creates and updates must satisfy `isValidUserProfile(incoming())`, enforcing exact key allowlists (`hasAll` + `hasOnly`), immutable `uid` and `createdAt`, and server-enforced `request.time` timestamps.

## 2. Adversarial "Dirty Dozen" Payloads (All Rejected with PERMISSION_DENIED)
1. Unauthenticated `get` on `/users/user_123` (`request.auth == null`).
2. Cross-user `get` on `/users/other_uid` while signed in as `user_123`.
3. Collection `list` query on `/users` while signed in.
4. `create` on `/users/user_123` with `uid: "other_uid"` (identity spoofing).
5. `create` on `/users/user_123` containing a shadow field `role: "admin"` or `isVerified: true`.
6. `create` on `/users/user_123` with client-forged `createdAt` instead of `request.time`.
7. `create` on `/users/1234...` with an oversized or invalid character document ID.
8. `create` on `/users/user_123` with a 1MB `fullName` string (resource poisoning).
9. `create` on `/users/user_123` missing required `phoneNumber`.
10. `update` on `/users/user_123` attempting to change immutable `uid` or `createdAt`.
11. `update` on `/users/user_123` attempting to inject an arbitrary `plan: "enterprise"` field.
12. `delete` on `/users/user_123` (profile deletion via client SDK denied by default).
