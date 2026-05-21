---
name: design-elevate
description: Pera Palas için global-seviye atmosphere variant'ı üret — referans topla, motifleri çıkar, DESIGN.md'ye `/ds-brand` ile variant yaz, WCAG doğrula, özet sun.
---

# /design-elevate

Pera Palas'ın bir sahnesini/atmosferini global tasarım standartlarına çıkartmak için tam otomatik akış. Kullanıcının estetik gözü gerekir sadece **kabul/red** anında — toplama, çıkarım, uygulama tamamen agent işi.

## Kullanım

```
/design-elevate <atmosphere-name>
/design-elevate mansion-night
/design-elevate dialogue-interrogation
/design-elevate final-verdict
/design-elevate                # liste modu — sahneleri sorar
```

## Akış (sırayla, atlamak yok)

### 1. Atmosphere'i netleştir

Kullanıcı argüman vermediyse, mevcut DESIGN.md'yi oku ve **şu üç ana sahneyi öner**:
- `mansion-night` — konak gece keşif, ambient motion ağır
- `dialogue-interrogation` — şüpheli sorgu, yüksek kontrast, mikro-etkileşim
- `final-verdict` — cinematic karar anı, slow-reveal, geniş whitespace

Kullanıcıdan birini seç. Sonra ona sor: **"Mood referansı?"** — tek cümle (örn. "Knives Out final salon", "A24 hereditary cold open", "Disco Elysium thought cabinet"). Bu *kuzey yıldızı*.

### 2. Referans topla (5+5+5)

Üç kaynak, her birinden 5 ekran/sayfa, paralel WebSearch + WebFetch:

- **Awwwards** — `site:awwwards.com <mood-keywords>` ile SOTM/SOTY winners
- **Behance** — `site:behance.net <mood-keywords> dark cinematic UI`
- **Dribbble** — `site:dribbble.com <mood-keywords> game UI dark`

Bir ek kaynak: **A24 / Letterboxd / IMDb** film stills (eğer mood film referansıysa) → renk paleti için.

Her referansı kaydet: URL + 1-cümle neden alındığı.

### 3. Motif çıkar (token-level)

15 referansı analiz et. Şu altıyı çıkar:

| Motif | Çıkar |
|:------|:------|
| **Dominant renkler** | Top 3 hex (eyedropper mantığıyla, dominant > accent > neutral) |
| **Tipografi register** | Serif/sans, italic kullanımı, letter-spacing aralığı |
| **Motion grammar** | Hızlı/yavaş, easing tercihi (decelerate-heavy mi?) |
| **Composition** | Centered/asymmetric, whitespace yoğunluğu |
| **Texture/grain** | Düz/grain/film/paper |
| **Signature element** | "Bu tasarımı tanıyan tek detay" (örn. cold-open vinyet, brass divider, slow shutter motion) |

Her motif için **kanıt referansı** (hangi 3 ekrandan geldi) verilmeli — hayal kurma.

### 4. Mevcut DESIGN.md ile çatış

Yeni motifleri Pera Palas'ın mevcut `DESIGN.md`'siyle karşılaştır:
- **Hangileri zaten var?** → atla
- **Hangileri çelişiyor?** → kullanıcıya sor (örn. "referans daha düşük kontrastta — Pera AA korumalı, override istiyor musun?")
- **Hangileri yeni?** → variant'a ekle

### 5. Variant yaz (`/ds-brand` ile)

```bash
/ds-brand <atmosphere-name> --colors '{...}' --base DESIGN.md
```

Variant `DESIGN.<atmosphere>.md` olarak çıkar. İçinde:
- YAML front matter: override edilen token'lar
- "Inheritance" notu: base DESIGN.md'den türer
- Yeni "Scene-specific" section: composition, motion-overrides, signature

### 6. WCAG doğrula (zorunlu — geçemiyorsa REDO)

```bash
npx -y @google/design.md lint DESIGN.<atmosphere>.md
```

- **0 error** olmalı.
- Kontrast warning'leri tek tek incele → text/bg pair'lerini fix et veya tone-shift uygula.
- AAA'ya kadar git mümkünse (geniş yüzeyli text için).

### 7. Side-by-side önizleme üret

`docs/atmospheres/<atmosphere>.md` altına yaz:
- Sol: mevcut DESIGN.md token'larıyla mock
- Sağ: yeni variant'la mock
- Üstte: 5 ana referans thumbnail'i (URL'lerle)
- Altta: "Neden bu çalışır" — 3-5 cümle

### 8. Özet sun (kullanıcıya)

Tek mesajda:
1. Atmosphere adı + kullanılan mood referansı
2. Eklenen token'lar (max 5 satır)
3. WCAG: pass/fail + kritik kontrastlar
4. Önizleme dosyasının path'i
5. **3 seçenek**: `accept` (merge'e hazır), `tone-down` (daha sade), `redo` (farklı mood)

Kullanıcı 5 dakikadan az harcamalı.

## Kritik kurallar

- **Referans olmadan motif üretme.** Her token'ın kaynağı görsel kanıt olmalı.
- **WCAG AA hard floor.** Aesthetic uğruna pas geçme. AAA tercih.
- **`mum` `#ffd99a` focus ring her yerde korunur** — variant'lar bunu override edemez.
- **`bordo` `#8a1a1a` rolü değişmez** — sadece aksiyon. Background olarak kullanan referans varsa override etme.
- **Reduced-motion blok variant'larda da zorunlu** — variant `extends base reduce-motion` olur.
- **Self-research yapma** — kullanıcının mood referansı *anchor*'dır. Onsuz `Other` cevabı bekle, başlatma.

## Çıktı dosyaları

- `DESIGN.<atmosphere>.md` — variant token dosyası
- `docs/atmospheres/<atmosphere>.md` — önizleme + kanıt
- `docs/atmospheres/<atmosphere>.references.json` — 15 URL + neden

## İlişkili skill'ler

- `/ds-brand` — token fork (yukarıda kullanılır)
- `/ds-wcag` — variant uygulandıktan sonra koş, gerçek render kontrastını ölç
- `/ds-diff` — variant base'e karşı diff
- `/ds-design-md` — yeni variant'ı re-lint
