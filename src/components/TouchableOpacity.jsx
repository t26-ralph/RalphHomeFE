import React from "react";

/**
 * TouchableOpacity cho React Web
 * Giống hành vi của React Native: opacity giảm khi hover / click
 *
 * Props:
 * - onClick: function khi click
 * - children: nội dung bên trong
 * - className: thêm class Tailwind/CSS tùy chỉnh
 * - disabled: true/false
 */
export default function TouchableOpacity({
    children,
    onClick,
    className = "",
    disabled = false,
}) {
    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onClick}
            onKeyDown={(e) => {
                if (!disabled && (e.key === "Enter" || e.key === " ")) {
                    onClick?.(e);
                }
            }}
            className={`
        inline-flex items-center justify-center
        cursor-pointer select-none
        transition-opacity duration-150
        hover:opacity-90 active:opacity-75
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

