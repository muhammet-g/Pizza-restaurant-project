# Rukn Pizza visual identity

The restaurant keeps its Arabic name, existing logo, menu prices, routes and cart behavior. The visual refresh makes the menu the primary action and replaces the full-screen moving carousel with a static, readable hero.

## Design rules

- Warm cream surfaces, tomato red actions, olive accents and dark readable text.
- Tajawal typography with clear Arabic heading and body hierarchy.
- Consistent navigation, restrained borders and eight to twelve pixel control radii.
- Mobile stacks the hero content above the image; menu cards stack without horizontal overflow.
- Visible keyboard focus and reduced-motion support.

## Verification

- Production webpack build passes.
- Home page checked at 320, 768, 1024 and 1440 pixels without horizontal overflow.
- Menu, product detail, about, contact and cart pages checked at 320 pixels.
- Mobile navigation opens and navigates to the menu.
- Adding one Margherita updates the badge and cart: 12 SAR subtotal plus 15 SAR delivery equals 27 SAR.
- Existing Sass deprecation and asset-size build warnings remain; there are no new runtime console errors in the tested flow.

No new dependencies or changes to payment handling are included.
