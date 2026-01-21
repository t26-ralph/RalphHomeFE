import React from "react";
import Logo from '../assets/Logo1.png'
export default function Footer() {
    const year = new Date().getFullYear();

    const goHome = () => {
        window.location.href = "/";
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer style={styles.wrap}>
            <div style={styles.container}>
                <div style={styles.topRow}>
                    <div style={styles.brand} onClick={goHome} role="button" tabIndex={0}>
                        <img src={Logo} alt="Logo" style={styles.logo} />
                        <div>
                            <div style={styles.brandName}>RALPHOME</div>
                            <div style={styles.brandDesc}>Thoải mái như ở nhà!</div>
                        </div>
                    </div>

                    <nav style={styles.columns}>
                        <div style={styles.col}>
                            <div style={styles.colTitle}>Sản phẩm</div>
                            <a style={styles.link} href="/features">Tính năng</a>
                            <a style={styles.link} href="/pricing">Bảng giá</a>
                            <a style={styles.link} href="/changelog">Changelog</a>
                        </div>
                        <div style={styles.col}>
                            <div style={styles.colTitle}>Công ty</div>
                            <a style={styles.link} href="/about">Về chúng tôi</a>
                            <a style={styles.link} href="/careers">Tuyển dụng</a>
                            <a style={styles.link} href="/contact">Liên hệ</a>
                        </div>
                        <div style={styles.col}>
                            <div style={styles.colTitle}>Tài nguyên</div>
                            <a style={styles.link} href="/docs">Docs</a>
                            <a style={styles.link} href="/blog">Blog</a>
                            <a style={styles.link} href="/status">Trạng thái</a>
                        </div>
                    </nav>
                </div>

                <div style={styles.bottomRow}>
                    <div>© {year} YourBrand. All rights reserved.</div>

                    <div style={styles.socials}>
                        <a aria-label="Facebook" style={styles.iconLink} href="https://facebook.com" target="_blank" rel="noreferrer">
                            {/* FB icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.48 17.52 2 11.94 2S2 6.48 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32v7.03C18.34 21.22 22 17.07 22 12.06z" /></svg>
                        </a>
                        <a aria-label="Twitter/X" style={styles.iconLink} href="https://x.com" target="_blank" rel="noreferrer">
                            {/* X icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.5 7.43L22 22h-6.75l-4.73-6.18L4.9 22H2.14l7-8.01L2 2h6.86l4.36 5.82L18.24 2Zm-2.36 18h1.77L7.2 4H5.37l10.514 16Z" /></svg>
                        </a>
                        <a aria-label="GitHub" style={styles.iconLink} href="https://github.com" target="_blank" rel="noreferrer">
                            {/* GitHub icon */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.84 3.14 8.94 7.49 10.39.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.05.66-3.69-1.3-3.69-1.3-.5-1.26-1.22-1.6-1.22-1.6-.99-.67.07-.65.07-.65 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.91.1-.71.38-1.19.69-1.46-2.43-.27-4.98-1.22-4.98-5.45 0-1.2.43-2.18 1.13-2.95-.11-.27-.49-1.37.11-2.85 0 0 .92-.3 3.02 1.13A10.48 10.48 0 0 1 12 6.8c.93.01 1.87.12 2.74.36 2.1-1.43 3.02-1.13 3.02-1.13.6 1.48.22 2.58.11 2.85.7.77 1.13 1.75 1.13 2.95 0 4.24-2.55 5.17-4.98 5.44.39.34.73 1 .73 2.02 0 1.46-.01 2.64-.01 3 0 .29.2.64.76.53A10.53 10.53 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" /></svg>
                        </a>
                        <button onClick={scrollToTop} style={styles.toTopBtn} title="Lên đầu trang">UP</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const styles = {
    wrap: {
        background: "#0f172a",
        color: "#e2e8f0",
        padding: "25px 0",   // padding ngang 0 để full màn
        marginTop: "64px",
        width: "100vw",      // ngang toàn màn hình
    },

    container: {
        maxWidth: "100%",  // nội dung gọn lại
        margin: "0 auto",
        padding: "0 20px",
    },
    topRow: {
        display: "grid",
        gridTemplateColumns: "1.2fr 2fr",
        alignItems: "start",
    },
    brand: {
        display: "flex",
        alignItems: "center",
        gap: 1,
        cursor: "pointer",
        userSelect: "none",
    },
    logo: { width: 100, height: 100, objectFit: "contain"},
    brandName: { fontSize: 18, fontWeight: 700, lineHeight: 1.2 },
    brandDesc: { fontSize: 13, opacity: 0.7 },
    columns: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0,1fr))",
        // gap: 5,
    },
    col: { display: "flex", flexDirection: "column", gap: 5 },
    colTitle: { fontWeight: 700, fontSize: 20, opacity: 0.9, marginBottom: 4 },
    link: {
        color: "#cbd5e1",
        textDecoration: "none",
        fontSize: 20,
    },
    bottomRow: {
        borderTop: "1px solid rgba(148,163,184,0.2)",
        marginTop: 24,
        paddingTop: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
    },
    socials: { display: "flex", alignItems: "center", gap: 10, padding:20 },
    iconLink: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        borderRadius: 10,
        background: "rgba(255,255,255,0.06)",
        color: "#e2e8f0",
        textDecoration: "none",
    },
    toTopBtn: {
        display:"flex",
        width: 50,
        height: 50,
        borderRadius: 10,
        background: "rgba(255,255,255,0.14)",
        cursor: "pointer",
        color:'#e2e8f0',
        fontWeight:"bold",
        alignItems:"center",
        justifyContent:"center",
        padding:10
    },
};
