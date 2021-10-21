const defaultTheme = {
    mobileBreakPoint: 800,
    font: {
        family: "'NanumSquare', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        weight: {
            extraBold: 800,
            bold: 700,
            regular: 400,
        },
        size: {
            paragraph: "1.2rem",
            paragraph2: "1.4rem",
            paragraph3: "1.8rem",
            paragraph4: "2.4rem",
        }
    },
    color: {
        secondary: "#DCBBFF",
        background: "#111111",
        foreground: "#FFFFFF",
        primary: "#8400FF",
        textPrimary: "#9B33FF",
        secondary: "#DCBBFF",
        gray850: "#1c1c1c",
        gray800: "#333333",
        gray750: "#595757",
        gray600: "#6B6B6B",
        gray100: "#C8C9CA",
        danger: "#FF007A",
    },
    borderImage: {
        bottom: `url("/images/border_btn_bottom.png")`,
        bottomLeft: `url("/images/border_btn_bottom_left.png")`,
        bottomRight: `url("/images/border_btn_bottom_right.png")`,
        left: `url("/images/border_btn_left.png")`,
        right: `url("/images/border_btn_right.png")`,
    }
};

export default defaultTheme;