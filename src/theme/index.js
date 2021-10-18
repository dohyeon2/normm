const defaultTheme = {
    mobileBreakPoint: 800,
    font: {
        family: "'NanumSquare', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        weight: {
            bold: 700,
            regular: 400,
        },
        size: {
            paragraph: "1.2rem",
            paragraph2: "1.4rem",
            paragraph3: "2.4rem",
        }
    },
    color: {
        secondary: "#DCBBFF",
        background: "#111111",
        foreground: "#FFFFFF",
        primary: "#8400FF",
        textPrimary: "#9B33FF",
        gray850: "#1c1c1c",
        gray800: "#333333",
        gray750: "#595757",
        gray600: "#6B6B6B",
    },
    borderImage: {
        bottom: `url("/images/border_btn_bottom.png")`
    }
};

export default defaultTheme;