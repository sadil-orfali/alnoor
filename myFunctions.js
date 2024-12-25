document.addEventListener("DOMContentLoaded", () => {
    const orderSection = document.querySelector(".order-section");
    const selectedBookSpan = document.querySelector("#selected-book");
    const form = document.querySelector("#order-form");

    document.querySelectorAll(".choose-book").forEach(button => {
        button.addEventListener("click", () => {
            // إذا كانت الحقول مرئية، قم بإخفائها
            if (!orderSection.classList.contains("hidden")) {
                orderSection.classList.add("hidden");
                return;
            }

            // تحديث النص الخاص بالكتاب المختار
            const bookTitle = button.dataset.title;
            const bookPrice = button.dataset.price;
            selectedBookSpan.textContent = `${bookTitle} - ${bookPrice}`;

            // إظهار الحقول
            orderSection.classList.remove("hidden");
        });
    });

    form.addEventListener("submit", e => {
        e.preventDefault();

        const nationalId = document.querySelector("#national-id").value.trim();

        // التحقق من إدخال الرقم الوطني فقط
        if (!nationalId) {
            alert("يرجى إدخال الرقم الوطني. هذا الحقل مطلوب.");
            return;
        }

        // عرض رسالة النجاح
        alert("تم تقديم الطلب بنجاح!");

        // إعادة تعيين النموذج بعد الإرسال
        form.reset();
        orderSection.classList.add("hidden");
    });
});
