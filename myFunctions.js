document.addEventListener("DOMContentLoaded", () => {
    const orderSection = document.querySelector(".order-section");
    const selectedBookSpan = document.querySelector("#selected-book");
    const form = document.querySelector("#order-form");

    // التعامل مع زر اختيار الكتاب
    document.querySelectorAll(".choose-book").forEach(button => {
        button.addEventListener("click", () => {
            const bookTitle = button.dataset.title;
            const bookPrice = button.dataset.price;

            selectedBookSpan.textContent = `${bookTitle} - ${bookPrice}`;
            orderSection.classList.remove("hidden");
        });
    });

    // التحقق من الإدخالات عند إرسال النموذج
    form.addEventListener("submit", e => {
        e.preventDefault();

        // الحقول
        const fullName = document.querySelector("#full-name").value.trim();
        const nationalId = document.querySelector("#national-id").value.trim();
        const birthDate = document.querySelector("#birth-date").value;
        const phone = document.querySelector("#phone").value.trim();
        const email = document.querySelector("#email").value.trim();

        // التحقق من الرقم الوطني السوري (إلزامي)
        if (!/^\d{11}$/.test(nationalId)) {
            alert("يرجى إدخال الرقم الوطني بشكل صحيح (11 رقمًا).");
            return;
        }

        // التحقق من الرقم الظني (مثال: يبدأ بـ 00 أو 1 أو 2 حسب التوزيع)
        const validPrefixes = ["00", "01", "02", "03", "10", "20"]; // يمكنك تعديل هذه القائمة بناءً على التوزيع الصحيح
        const nationalIdPrefix = nationalId.slice(0, 2);
        if (!validPrefixes.includes(nationalIdPrefix)) {
            alert("الرقم الوطني غير صحيح، تأكد من الإدخال.");
            return;
        }

        // التحقق من الاسم الكامل (اختياري، لكن يجب أن يكون باللغة العربية فقط)
        if (fullName && !/^[\u0621-\u064A\s]+$/.test(fullName)) {
            alert("يرجى إدخال الاسم باللغة العربية فقط.");
            return;
        }

        // التحقق من تاريخ الميلاد (اختياري)
        if (birthDate) {
            const currentDate = new Date();
            const enteredDate = new Date(birthDate);

            if (enteredDate >= currentDate) {
                alert("يرجى إدخال تاريخ ميلاد صحيح (لا يمكن أن يكون في المستقبل).");
                return;
            }
        }

        // التحقق من رقم الموبايل (اختياري)
        if (phone && !/^(09[3-9])\d{7}$/.test(phone)) {
            alert("يرجى إدخال رقم موبايل صحيح تابع لشبكة سيرياتيل أو MTN (مثال: 093xxxxxxx).");
            return;
        }

        // التحقق من البريد الإلكتروني (اختياري)
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("يرجى إدخال بريد إلكتروني صحيح.");
            return;
        }

        // عرض رسالة النجاح
        alert("تم تقديم الطلب بنجاح!");

        // إعادة تعيين النموذج
        form.reset();
        orderSection.classList.add("hidden");
    });
});
