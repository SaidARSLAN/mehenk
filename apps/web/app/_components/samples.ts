export type Sample = {
  id: string;
  label: string;
  description: string;
  html: string;
};

export const SAMPLES: Sample[] = [
  {
    id: "signup",
    label: "Signup",
    description: "Email + password + opt-in checkbox",
    html: `<form action="/api/signup" method="POST" id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required placeholder="you@studio.com" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required minlength="8" />

  <label>
    <input type="checkbox" name="newsletter" /> Subscribe to weekly digest
  </label>

  <button id="submit" type="submit">Create account</button>
</form>`,
  },
  {
    id: "login",
    label: "Login",
    description: "Classic auth — email + password",
    html: `<form action="/api/login" method="POST" id="login">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required autocomplete="email" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required autocomplete="current-password" />

  <label>
    <input type="checkbox" name="remember" /> Remember me
  </label>

  <button id="login-submit" type="submit">Sign in</button>
</form>`,
  },
  {
    id: "contact",
    label: "Contact",
    description: "Name + email + topic select + message",
    html: `<form action="/api/contact" method="POST" id="contact">
  <label for="name">Full name</label>
  <input id="name" name="name" type="text" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="topic">Topic</label>
  <select id="topic" name="topic" required>
    <option value="sales">Sales</option>
    <option value="support">Support</option>
    <option value="press">Press</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" required minlength="20"></textarea>

  <button id="send" type="submit">Send message</button>
</form>`,
  },
  {
    id: "checkout",
    label: "Checkout",
    description: "Card + shipping fields + quantity",
    html: `<form action="/api/checkout" method="POST" id="checkout">
  <label for="card">Card number</label>
  <input id="card" name="card_number" type="text" required pattern="[0-9]{16}" />

  <label for="expiry">Expiry (MM/YY)</label>
  <input id="expiry" name="expiry" type="text" required pattern="[0-9]{2}/[0-9]{2}" />

  <label for="cvc">CVC</label>
  <input id="cvc" name="cvc" type="text" required pattern="[0-9]{3,4}" />

  <label for="address">Shipping address</label>
  <input id="address" name="address" type="text" required />

  <label for="qty">Quantity</label>
  <input id="qty" name="qty" type="number" required min="1" max="10" />

  <button id="pay" type="submit">Pay now</button>
</form>`,
  },
  {
    id: "tr-uyelik",
    label: "TR Üyelik",
    description: "TC Kimlik + +90 telefon + İl/İlçe",
    html: `<form action="/api/kayit" method="POST" id="uyelik">
  <label for="ad">Ad Soyad</label>
  <input id="ad" name="ad_soyad" type="text" required />

  <label for="tckimlik">TC Kimlik No</label>
  <input id="tckimlik" name="tc_kimlik" type="text" required pattern="[0-9]{11}" />

  <label for="email">E-posta</label>
  <input id="email" name="email" type="email" required />

  <label for="telefon">Telefon</label>
  <input id="telefon" name="telefon" type="tel" required />

  <label for="il">İl</label>
  <input id="il" name="il" type="text" required />

  <label for="ilce">İlçe</label>
  <input id="ilce" name="ilce" type="text" required />

  <label for="adres">Adres</label>
  <textarea id="adres" name="adres" required></textarea>

  <button id="kaydet" type="submit">Kayıt Ol</button>
</form>`,
  },
];
