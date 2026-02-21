import { useEffect, useState } from "react"
import { toast, Toaster as Sonner } from "sonner"

export function ResumeToast() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Show toast on mount
    toast.info("PDF version available", {
      action: {
        label: "Download",
        onClick: () => {
          window.location.href = "/resume.pdf"
        },
      },
      duration: 8000,
    })

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <Sonner
      position={isMobile ? "bottom-center" : "top-right"}
      className="toaster group"
      icons={{
        info: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="16"
            width="16"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        ),
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
          icon: "group-[.toast]:text-gray-950",
        },
      }}
    />
  )
}
