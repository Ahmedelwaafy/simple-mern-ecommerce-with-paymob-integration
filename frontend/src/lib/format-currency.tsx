const SAR_SYMBOL = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 300 335"
    fill="currentColor"
  >
    <g
      transform="translate(0.000000,335.000000) scale(0.100000,-0.100000)"
      fill="currentColor"
      stroke="none"
    >
      <path d="M1345 3308 c-89 -60 -191 -145 -241 -202 l-44 -51 0 -701 0 -702 -22 -5 c-13 -3 -189 -40 -393 -83 -203 -43 -373 -83 -377 -88 -28 -39 -81 -222 -93 -317 l-7 -56 439 94 c241 51 441 93 446 93 4 0 6 -102 5 -227 l-3 -226 -465 -99 c-256 -53 -472 -101 -480 -106 -20 -12 -66 -145 -90 -263 -12 -56 -20 -104 -18 -108 4 -9 998 202 1056 225 70 26 117 77 237 255 l110 163 3 233 c2 128 6 233 10 233 4 0 81 16 171 35 90 19 167 35 172 35 5 0 10 -161 11 -358 l3 -358 560 119 c308 65 563 124 567 130 34 54 111 367 90 367 -4 0 -199 -41 -431 -90 -233 -50 -428 -90 -432 -90 -5 0 -9 81 -9 179 0 177 0 179 23 184 12 3 187 40 389 83 l367 77 30 84 c31 83 76 281 67 290 -3 3 -198 -36 -433 -86 -236 -50 -432 -91 -436 -91 -4 0 -7 290 -7 645 0 355 -2 645 -5 645 -27 0 -196 -130 -277 -214 l-68 -68 0 -539 c0 -343 -4 -540 -10 -544 -10 -6 -324 -75 -341 -75 -5 0 -10 347 -11 809 l-3 810 -60 -41z" />
      <path d="M2417 500 c-302 -65 -549 -119 -551 -121 -28 -39 -99 -301 -94 -347 l3 -29 560 119 c307 65 563 124 567 131 14 22 76 221 83 267 3 25 8 57 11 73 5 22 2 27 -13 26 -10 -1 -265 -54 -566 -119z" />
    </g>
  </svg>
);

const FormatCurrency = (amount: number, locale = "en-US", currency = "EGP") => {
  // Format numeric part
  const formattedNumber = new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);

  // If SAR, return JSX with SVG (new SAR symbol)
  if (currency === "SAR") {
    return (
      <span className="flex items-center gap-1">
        {SAR_SYMBOL} {formattedNumber}
      </span>
    );
  }

  // Otherwise, return normal currency formatting
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default FormatCurrency;
