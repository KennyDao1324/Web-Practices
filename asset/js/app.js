function $(sel, root = document) {
    return root.querySelector(sel);
}

function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
}

// Nav link
(function setActiveNav() {
    const path = location.pathname.split("/").pop() || "index.html";
    $all("[data-nav]").forEach(a => {
        const href = a.getAttribute("href");
        if (href === path) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
    });
})();

// Toast
const Toast = {
    el: null,
    timer: null,
    init() {
        this.el = $("#toast");
        const closeBtn = $("#toastClose");
        if (closeBtn) closeBtn.addEventListener("click", () => this.hide());
    },
    show(title, msg, ms = 3500) {
        if (!this.el) return;
        const t = $("#toastTitle");
        const m = $("#toastMsg");
        if (t) t.textContent = title;
        if (m) m.textContent = msg;

        this.el.classList.add("show");
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.hide(), ms);
    },
    hide() {
        if (!this.el) return;
        this.el.classList.remove("show");
    }
};
Toast.init();

// Gior hàng
const CART_KEY = "garlic_cart_v1";

function getCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, qty = 1) {
    const cart = getCart();
    cart[productId] = (cart[productId] || 0) + qty;
    saveCart(cart);
}

function setCartQty(productId, qty) {
    const cart = getCart();
    if (qty <= 0) delete cart[productId];
    else cart[productId] = qty;
    saveCart(cart);
}

function removeFromCart(productId) {
    const cart = getCart();
    delete cart[productId];
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}

function cartItemCount() {
    const cart = getCart();
    return Object.values(cart).reduce((sum, n) => sum + Number(n || 0), 0);
}

function updateCartCount() {
    const el = $("#cartCount");
    if (el) el.textContent = String(cartItemCount());
}

updateCartCount();

// Modal
const Modal = {
    backdrop: null,
    modal: null,
    lastFocus: null,
    init() {
        this.backdrop = $("#modalBackdrop");
        this.modal = $("#modal");

        const openers = $all("[data-open-modal]");
        const closers = $all("[data-close-modal]");

        openers.forEach(btn => btn.addEventListener("click", () => this.open()));
        closers.forEach(btn => btn.addEventListener("click", () => this.close()));

        if (this.backdrop) this.backdrop.addEventListener("click", () => this.close());

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.modal?.classList.contains("show")) this.close();
            if (e.key === "Tab" && this.modal?.classList.contains("show")) this.trapFocus(e);
        });
    },
    open() {
        if (!this.modal || !this.backdrop) return;
        this.lastFocus = document.activeElement;
        this.backdrop.classList.add("show");
        this.modal.classList.add("show");

        const focusable = this.getFocusable();
        if (focusable[0]) focusable[0].focus();
    },
    close() {
        if (!this.modal || !this.backdrop) return;
        this.backdrop.classList.remove("show");
        this.modal.classList.remove("show");
        if (this.lastFocus) this.lastFocus.focus();
    },
    getFocusable() {
        if (!this.modal) return [];
        return $all('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])', this.modal)
            .filter(el => !el.disabled && el.offsetParent !== null);
    },
    trapFocus(e) {
        const focusable = this.getFocusable();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
};
Modal.init();

// Thông tin sản phẩm
const GARLIC_PRODUCTS = [
    {
        id: "001",
        name: "Tỏi tươi",
        price: 39000,
        tag: "Hằng ngày",
        size: "500g",
        origin: "Đà Lạt",
        desc: "Tỏi tươi nhập từ Đà Lạt, đã xử lý sạch sẽ, phù hợp nấu ăn hằng ngày.",
        image: "Images/toituoi.jpeg"
    },
    {
        id: "002",
        name: "Tỏi đen",
        price: 129000,
        tag: "Cao cấp",
        size: "200g",
        origin: "Bắc Ninh",
        desc: "Tỏi đen lên men: vị ngọt dẻo, không hăng, dễ ăn và giàu dưỡng chất.",
        image: "Images/toiden.jpg"
    },
    {
        id: "003",
        name: "Bột tỏi",
        price: 55000,
        tag: "Tiện lợi",
        size: "100g",
        origin: "Việt Nam",
        desc: "Tỏi sấy khô và xay thành bột — gia vị nhanh gọn cho nhiều món ăn.",
        image: "Images/bottoi.jpg"
    },
    {
        id: "004",
        name: "Tỏi ngâm",
        price: 69000,
        tag: "Chua giòn",
        size: "350g",
        origin: "Việt Nam",
        desc: "Tỏi ngâm giấm đường muối tạo vị chua–ngọt–mặn, giòn ngon.",
        image: "Images/toingam.jpg"
    },
    {
        id: "005",
        name: "Dầu tỏi (cay)",
        price: 89000,
        tag: "Cay",
        size: "250ml",
        origin: "Việt Nam",
        desc: "Tỏi ép dầu cùng ớt tạo mùi thơm và vị cay hấp dẫn.",
        image: "Images/dautoi.jpg"
    },
    {
        id: "006",
        name: "Tỏi xay nhuyễn",
        price: 49000,
        tag: "Dễ dùng",
        size: "180g",
        origin: "Việt Nam",
        desc: "Tỏi tươi xay nhuyễn dạng sệt — tiết kiệm thời gian chế biến.",
        image: "Images/toibam.jpg.webp"
    }
];

function formatVND(n) {
    return new Intl.NumberFormat("vi-VN").format(n) + " ₫";
}

// Trang sản phẩm
(function renderProducts() {
    const list = $("#productList");
    if (!list) return;

    const priceMaxEl = $("#priceMax");
    const priceTextEl = $("#priceText");
    const sortEl = $("#sortBy");
    const qEl = $("#q");

    function apply() {
        const maxPrice = Number(priceMaxEl?.value || 200000);
        const query = (qEl?.value || "").trim().toLowerCase();
        const sortBy = sortEl?.value || "popular";

        if (priceTextEl) priceTextEl.textContent = formatVND(maxPrice);

        let items = GARLIC_PRODUCTS
            .filter(p => p.price <= maxPrice)
            .filter(p => !query || p.name.toLowerCase().includes(query) || p.tag.toLowerCase().includes(query));

        if (sortBy === "price-asc") items.sort((a, b) => a.price - b.price);
        if (sortBy === "price-desc") items.sort((a, b) => b.price - a.price);
        if (sortBy === "name") items.sort((a, b) => a.name.localeCompare(b.name));

        list.innerHTML = items.map(p => `
      <article class="card" aria-label="${p.name}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="small">${p.desc}</div>
          <div class="price-row">
            <div class="price">${formatVND(p.price)}</div>
            <div class="tag" aria-label="Tag">${p.tag}</div>
          </div>
          <div class="small">Khối lượng: ${p.size} • Xuất xứ: ${p.origin}</div>
        </div>
        <div class="card-actions">
          <a class="btn" href="product-detail.html?id=${encodeURIComponent(p.id)}">Xem chi tiết</a>
          <button class="btn primary" type="button" data-add-cart="${p.id}">Thêm vào giỏ hàng</button>
        </div>
      </article>
    `).join("");

        // Nút thê, vào giỏ hàng
        $all("[data-add-cart]").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-add-cart");
                const prod = GARLIC_PRODUCTS.find(x => x.id === id);
                addToCart(id, 1);
                Toast.show("Đã thêm vào giỏ hàng", `${prod?.name || "Sản phẩm"} đã được thêm.`);
            });
        });

        const countEl = $("#productCount");
        if (countEl) countEl.textContent = `${items.length} sản phẩm`;
    }

    ["input", "change"].forEach(evt => {
        priceMaxEl?.addEventListener(evt, apply);
        sortEl?.addEventListener(evt, apply);
        qEl?.addEventListener(evt, apply);
    });

    apply();
})();

// Chi tiết sanr phẩm
(function renderProductDetail() {
    const detail = $("#productDetail");
    if (!detail) return;

    const params = new URLSearchParams(location.search);
    const id = params.get("id") || "classic";
    const p = GARLIC_PRODUCTS.find(x => x.id === id) || GARLIC_PRODUCTS[0];

    detail.innerHTML = `
    <div class="kv">
      <section class="panel" aria-label="Ảnh sản phẩm">
        <div class="hero-media" style="height:260px; border-radius:14px;">
          <img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; border-radius:14px;">
        </div>

        <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn primary" id="buyNowBtn" type="button">Mua ngay</button>
          <button class="btn" id="addBtn" type="button">Thêm vào giỏ hàng</button>
          <button class="btn" data-open-modal type="button">Thông tin dinh dưỡng</button>
        </div>
      </section>

      <section class="panel" aria-label="Thông tin sản phẩm">
        <h1 style="margin:0 0 6px;">${p.name}</h1>
        <div class="small">
          Nhãn: <strong>${p.tag}</strong> • Xuất xứ: <strong>${p.origin}</strong> • Khối lượng: <strong>${p.size}</strong>
        </div>
        <p style="margin:10px 0 12px;">${p.desc}</p>
        <div class="price" style="font-size:22px;">${formatVND(p.price)}</div>

        <div class="hr"></div>

        <div class="tooltip" data-tip="Bạn có thể đánh giá chúng tôi qua Google Reviews. Cảm ơn bạn!">
          <strong>Đánh giá</strong>
          <button class="tip" type="button" aria-label="Gợi ý đánh giá">?</button>
        </div>

        <div style="margin-top:8px;">
          <label class="small" for="qty">Số lượng</label>
          <input id="qty" type="number" inputmode="numeric" min="1" value="1" aria-describedby="qtyHint">
          <div id="qtyHint" class="hint">Vui lòng nhập số lượng. Ít nhất 1.</div>
        </div>

        <div class="hr"></div>

        <div class="table-wrap" aria-label="Bảng thông tin">
          <table>
            <thead>
              <tr>
                <th>Thông tin</th>
                <th>Thuộc tính</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Mã sản phẩm</td><td>${p.id}</td></tr>
              <tr><td>Khối lượng</td><td>${p.size}</td></tr>
              <tr><td>Xuất xứ</td><td>${p.origin}</td></tr>
              <tr><td>Phù hợp</td><td>Nấu ăn, sốt, gia vị, ăn kèm</td></tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:12px;">
          <a class="btn" href="products.html">← Quay lại sản phẩm</a>
          <a class="btn" href="contact.html?intent=order&product=${encodeURIComponent(p.name)}">Đặt hàng qua form</a>
          <a class="btn" href="cart.html">Đi tới giỏ hàng</a>
        </div>
      </section>
    </div>
  `;

    $("#addBtn")?.addEventListener("click", () => {
        const qty = Math.max(1, Number($("#qty")?.value || 1));
        addToCart(p.id, qty);
        Toast.show("Đã thêm vào giỏ hàng", `${p.name} x${qty}`);
    });

    $("#buyNowBtn")?.addEventListener("click", () => {
        Toast.show("Mua ngay", "Demo: Bạn có thể chuyển sang trang Liên hệ/Đặt hàng hoặc Giỏ hàng.");
    });
})();

// Liên hệ
(function contactForm() {
    const form = $("#contactForm");
    if (!form) return;

    const params = new URLSearchParams(location.search);
    const intent = params.get("intent");
    const product = params.get("product");

    if (intent === "order" && product) {
        const topic = $("#topic");
        const msg = $("#message");
        if (topic) topic.value = "Đặt hàng";
        if (msg) {
            msg.value =
                `Tôi muốn đặt hàng: ${product}
Số lượng:
Địa chỉ giao hàng:
Ghi chú:`;
        }
    }

    const status = $("#formStatus");

    function setError(id, msg) {
        const el = $("#" + id);
        if (el) el.textContent = msg;
    }

    function clearErrors() {
        ["nameErr", "emailErr", "topicErr", "messageErr", "agreeErr"].forEach(id => setError(id, ""));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        const name = $("#name")?.value.trim() || "";
        const email = $("#email")?.value.trim() || "";
        const topic = $("#topic")?.value || "";
        const message = $("#message")?.value.trim() || "";
        const agree = $("#agree")?.checked || false;

        let ok = true;

        if (name.length < 2) {
            setError("nameErr", "Tên phải có ít nhất 2 ký tự.");
            ok = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("emailErr", "Vui lòng nhập email hợp lệ.");
            ok = false;
        }
        if (!topic) {
            setError("topicErr", "Vui lòng chọn một chủ đề.");
            ok = false;
        }
        if (message.length < 10) {
            setError("messageErr", "Tin nhắn phải có ít nhất 10 ký tự.");
            ok = false;
        }
        if (!agree) {
            setError("agreeErr", "Bạn cần đồng ý với điều khoản.");
            ok = false;
        }

        if (!ok) {
            if (status) {
                status.textContent = "Có lỗi. Vui lòng kiểm tra lại các ô bên trên.";
                status.className = "error";
            }
            Toast.show("Form lỗi", "Vui lòng sửa các thông tin chưa đúng.");
            return;
        }

        if (status) {
            status.textContent = "Đã gửi! (Demo — không gửi lên server)";
            status.className = "success";
        }
        Toast.show("Đã gửi", "Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.");
        form.reset();
    });
})();

// Giỏ hàng
(function renderCartPage() {
    const wrap = $("#cartWrap");
    if (!wrap) return;

    const emptyBox = $("#cartEmpty");
    const totalEl = $("#cartTotal");
    const clearBtn = $("#clearCartBtn");

    function render() {
        const cart = getCart();
        const ids = Object.keys(cart);

        if (ids.length === 0) {
            wrap.innerHTML = "";
            if (emptyBox) emptyBox.style.display = "block";
            if (totalEl) totalEl.textContent = formatVND(0);
            return;
        }

        if (emptyBox) emptyBox.style.display = "none";

        let total = 0;

        const rows = ids.map(id => {
            const p = GARLIC_PRODUCTS.find(x => x.id === id);
            const qty = Number(cart[id] || 0);
            if (!p || qty <= 0) return "";

            const line = p.price * qty;
            total += line;

            return `
        <tr>
          <td>
            <strong>${p.name}</strong>
            <div class="small">Khối lượng: ${p.size} • Xuất xứ: ${p.origin}</div>
          </td>
          <td>${formatVND(p.price)}</td>
          <td>
            <input class="qty-input" type="number" min="1" value="${qty}"
              aria-label="Số lượng cho ${p.name}"
              data-qty="${p.id}">
          </td>
          <td><strong>${formatVND(line)}</strong></td>
          <td class="table-actions">
            <a class="btn" href="product-detail.html?id=${encodeURIComponent(p.id)}">Xem</a>
            <button class="btn" type="button" data-remove="${p.id}">Xoá</button>
          </td>
        </tr>
      `;
        }).join("");

        wrap.innerHTML = `
      <table aria-label="Bảng giỏ hàng">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Bạn có thể</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

        if (totalEl) totalEl.textContent = formatVND(total);

        // Thay đổi số lượng
        $all("[data-qty]").forEach(input => {
            input.addEventListener("input", () => {
                const pid = input.getAttribute("data-qty");
                const val = Math.max(1, Number(input.value || 1));
                input.value = String(val);
                setCartQty(pid, val);
                render();
            });
        });

        // Xoá sản phẩm khỏi giỏ
        $all("[data-remove]").forEach(btn => {
            btn.addEventListener("click", () => {
                const pid = btn.getAttribute("data-remove");
                removeFromCart(pid);
                Toast.show("Đã xoá", "Sản phẩm đã được xoá khỏi giỏ hàng.");
                render();
            });
        });
    }

    clearBtn?.addEventListener("click", () => {
        clearCart();
        Toast.show("Đã xoá giỏ hàng", "Tất cả sản phẩm đã bị xoá.");
        render();
    });

    render();
})();