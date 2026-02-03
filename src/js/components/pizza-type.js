// 1. الحصول على نوع البيتزا من الرابط (URL)
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type'); // سيقرأ مثلاً word: veggie

// 2. التأكد أن النوع موجود ثم إضافته للـ body
if (type) {
    document.body.classList.add('theme-' + type);

    // اختياري: تغيير النص ليناسب النوع
    const title = document.querySelector('.pizza-name');
    if (type === 'veggie') title.innerText = 'بيتزا الخضار الشهية';
    if (type === 'chicken') title.innerText = 'بيتزا الدجاج المشوي';
    if (type === 'margarita') title.innerText = 'بيتزا مارجريت';
}