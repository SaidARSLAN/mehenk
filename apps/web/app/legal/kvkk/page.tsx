import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni — mehenk",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında mehenk kullanıcılarına yönelik aydınlatma metni.",
  robots: { index: true, follow: true },
};

export default function KVKKPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm text-muted-foreground">Yürürlük tarihi: 2026-05-21</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          İşbu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (&ldquo;KVKK&rdquo;) m.10 uyarınca mehenk hizmetinin kullanıcılarını
          bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">1. Veri sorumlusu</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Said ARSLAN (gerçek kişi tacir — yer tutucu; tüzel kişilik kurulduğunda
          bu bölüm güncellenecektir). İletişim:{" "}
          <a
            href="mailto:contact@mehenk.dev"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            contact@mehenk.dev
          </a>
          .
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">
          2. İşlenen kişisel veriler
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Beta sürümünde kayıt/üyelik bulunmadığından doğrudan kişisel veri
          işlenmemektedir. İsteğe bağlı olarak bekleme listesine (waitlist)
          yazılmanız hâlinde yalnızca{" "}
          <span className="text-foreground">e-posta adresiniz</span> işlenir.
          Demoya yapıştırdığınız HTML, üretim sonrası kalıcı olarak saklanmaz.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">3. İşleme amacı</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          E-posta adresi yalnızca ürünün resmi lansman bildirimi ve önemli
          güncellemelerin iletilmesi amacıyla işlenir. Pazarlama amaçlı üçüncü
          taraflara aktarım yapılmaz.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">4. Hukuki sebep</h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          İşleme, KVKK m.5/1 kapsamında ilgili kişinin{" "}
          <span className="text-foreground">açık rızası</span>na dayanır.
          Waitlist formunu göndererek bu rızayı verdiğinizi beyan edersiniz;
          rızanızı dilediğiniz zaman geri çekebilirsiniz.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">
          5. Üçüncü kişilere ve yurtdışına aktarım
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Hizmetin sunulabilmesi için verileriniz şu yurtdışı işleyicilere
          aktarılabilir:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
          <li>
            <span className="text-foreground">Vercel Inc.</span> (ABD) — barındırma
            ve içerik dağıtımı.
          </li>
          <li>
            <span className="text-foreground">Formspree</span> (ABD) — waitlist
            e-posta iletimi.
          </li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          KVKK m.9 uyarınca bu yurtdışı aktarım, formu göndererek vereceğiniz{" "}
          <span className="text-foreground">açık rızanıza</span> dayanır. TR
          bölgesi devreye alındığında veri yerleşimi yeniden değerlendirilecektir.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">
          6. Saklama süresi
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Waitlist e-posta adresleri, resmi lansmanın ardından{" "}
          <span className="text-foreground">12 ay</span> süreyle saklanır ve bu
          sürenin sonunda silinir veya anonimleştirilir. Talep etmeniz hâlinde bu
          süre beklenmeksizin silinir.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">
          7. Çerez politikası
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          mehenk; reklam, takip veya profil oluşturma amaçlı çerez kullanmaz.
          Ürün analitiği için, etkinleştirildiğinde,{" "}
          <span className="text-foreground">PostHog</span> cookieless modda
          çalışır. Vercel Analytics da çerezsizdir.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">
          8. Haklarınız (KVKK m.11)
        </h2>
        <p className="text-muted-foreground leading-relaxed mt-3">
          KVKK m.11 kapsamında; kişisel verinizin işlenip işlenmediğini öğrenme,
          işlenmişse buna ilişkin bilgi talep etme, işleme amacını ve amacına
          uygun kullanılıp kullanılmadığını öğrenme, yurt içinde / yurt dışında
          aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini
          isteme, silinmesini veya yok edilmesini isteme ve KVKK m.11/(f), (g)
          hükümlerinde sayılan diğer hakları kullanma hakkına sahipsiniz.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Taleplerinizi{" "}
          <a
            href="mailto:contact@mehenk.dev"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            contact@mehenk.dev
          </a>{" "}
          adresine iletebilirsiniz. Talepler en geç 30 gün içinde yanıtlanır.
        </p>

        <hr className="mt-16 border-border" />
        <div className="mt-8 flex items-center justify-between text-sm">
          <Link
            href="/"
            className="text-violet-400 underline decoration-violet-400/60 underline-offset-4 transition hover:text-violet-300"
          >
            ← Back to home
          </Link>
          <span className="text-xs text-muted-foreground">
            Last updated: 2026-05-21
          </span>
        </div>
      </article>
    </main>
  );
}
