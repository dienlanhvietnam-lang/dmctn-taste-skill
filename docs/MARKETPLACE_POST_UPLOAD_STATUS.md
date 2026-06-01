# Trạng thái sau upload Marketplace
# Marketplace post-upload status

Cập nhật sau khi upload VSIX lên Visual Studio Marketplace (không lưu PAT/token trong repo).  
Updated after VSIX upload to Visual Studio Marketplace (no PAT/tokens stored in repo).

---

## Thông tin extension
## Extension info

| Trường / Field | Giá trị / Value |
|----------------|-----------------|
| Extension | **DMCTN Taste Skill** |
| Publisher | `buivantinh` |
| Version | **0.2.9** |
| GitHub repo | https://github.com/dienlanhvietnam-lang/dmctn-taste-skill |
| GitHub Release | [v0.2.9](https://github.com/dienlanhvietnam-lang/dmctn-taste-skill/releases/tag/v0.2.9) |
| VSIX | `dmctn-taste-skill-0.2.9.vsix` |
| Marketplace status | **Verifying 0.2.9** |
| Availability | **Public** |
| Screenshots | **Ready** — `store-assets/*.png` |

---

## Bước tiếp theo
## Next step

Đợi Marketplace verification hoàn tất, sau đó chạy QA cài từ store public (xem [`PUBLISH_CHECKLIST.md`](PUBLISH_CHECKLIST.md#post-publish-qa)).  
Wait for Marketplace verification to complete, then run public install QA (see [`PUBLISH_CHECKLIST.md`](PUBLISH_CHECKLIST.md#post-publish-qa)).

**Không** publish lại hoặc bump version chỉ vì cập nhật trạng thái docs.  
**Do not** re-publish or bump version for documentation-only status updates.

---

## Checklist

- [x] GitHub repo public
- [x] GitHub Release v0.2.9
- [x] VSIX uploaded to Marketplace
- [x] Screenshots ready
- [ ] Marketplace verification complete
- [ ] Public listing opens reliably
- [ ] Install from Marketplace
- [ ] Dashboard opens after install
- [ ] Full install 13/13 works
- [ ] Prompt generator works

---

## Ghi chú
## Notes

- Portal publisher có thể hiển thị **Verifying 0.2.9** trong vài giờ đến vài ngày.  
  The publisher portal may show **Verifying 0.2.9** for hours to days.

- Open VSX: **NOT_STARTED** (tùy chọn).  
  Open VSX: **NOT_STARTED** (optional).

- Cài thử trước khi verify xong: dùng VSIX từ GitHub Release hoặc chờ listing public.  
  Pre-verify install: use GitHub Release VSIX or wait for public listing.
