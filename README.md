# ركن البيتزا - Pizza Restaurant Website

مشروع موقع مطعم بيتزا حديث باستخدام Bootstrap 5 و SCSS

## الميزات

- ✅ واجهة مستخدم استجابة (Responsive)
- ✅ كاروسيل Bootstrap 5 مع صور البيتزا
- ✅ شريط تنقل محسّن مع دعم RTL (اللغة العربية)
- ✅ هيكل SCSS منظم حسب ITCSS
- ✅ نظام ألوان متناسق
- ✅ أيقونات وصور عالية الجودة

## التقنيات المستخدمة

- **Frontend Framework:** Bootstrap 5.3.8
- **CSS Preprocessor:** Sass 1.97.2
- **Bundler:** Webpack 5.104.1
- **Development Server:** Webpack Dev Server
- **Language:** HTML5, SCSS, JavaScript (ES6+)
- **Font:** Google Fonts - Zain (Arabic Typography)

## البنية الهندسية (ITCSS)

```
src/scss/
├── settings/    # المتغيرات والإعدادات
├── tools/       # Mixins والدوال
├── base/        # CSS الأساسي للعناصر
├── components/  # مكونات قابلة لإعادة الاستخدام
├── trumps/      # الأدوات المساعدة والفئات العامة
└── main.scss    # ملف الاستيراد الرئيسي
```

## التثبيت

```bash
# استنساخ المستودع
git clone <repository-url>
cd Pizza-restaurant-project

# تثبيت المتعلقات
npm install
```

## الأوامر المتاحة

```bash
# بدء خادم التطوير (مع فتح المتصفح تلقائياً)
npm run dev

# بدء خادم التطوير فقط
npm start

# بناء النسخة الإنتاجية
npm run build

# مراقبة التغييرات في الملفات
npm run watch
```

## الوصول

- **خادم التطوير:** http://localhost:9000
- **الملفات المصدرية:** `src/`
- **الملفات المبنية:** `dist/` (بعد تشغيل `npm run build`)

## الملفات الرئيسية

- `src/index.html` - الصفحة الرئيسية
- `src/scss/main.scss` - ملف SCSS الرئيسي
- `src/js/index.js` - ملف JavaScript الرئيسي
- `webpack.config.js` - إعدادات Webpack
- `package.json` - المتعلقات والسكريبتات

## المساهمة

هذا المشروع مفتوح للمساهمة. يرجى:

1. Fork المستودع
2. إنشاء فرع جديد (`git checkout -b feature/your-feature`)
3. Commit التغييرات (`git commit -m 'Add some feature'`)
4. Push إلى الفرع (`git push origin feature/your-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت MIT License.

## الدعم

للأسئلة والاستفسارات، يرجى فتح Issue في المستودع.

---

**تم إنشاء المشروع:** يناير 2026
