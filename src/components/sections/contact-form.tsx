"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "c56e695d-bf07-4b28-bd7d-c64b9bdc22f4",
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "Portfolio Contact",
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.errors?.[0]?.msg || "Failed to send message");
      }

      setStatus("success");
      setFeedback("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : "Failed to send message. Please try the email link below."
      );
    }
  };

  const fallbackSubject = formData.subject?.trim() || "Portfolio Contact";
  const fallbackBody = [
    formData.message?.trim(),
    "",
    `From: ${formData.name || "Anonymous"}`,
    `Email: ${formData.email || "Not provided"}`,
  ]
    .join("\n")
    .trim();

  const fallbackMailto = `mailto:torrentprime825@gmail.com?subject=${encodeURIComponent(
    fallbackSubject
  )}&body=${encodeURIComponent(fallbackBody)}`;

  return (
    <div className="border border-border/80 bg-card p-6 sm:p-8 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
              YOUR NAME *
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-accent transition-colors duration-200"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
              YOUR EMAIL *
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-accent transition-colors duration-200"
              placeholder="e.g. john@example.com"
            />
          </div>

        </div>
        
        {/* Subject Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="contact-subject" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
            SUBJECT
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            maxLength={200}
            autoComplete="off"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-accent transition-colors duration-200"
            placeholder="e.g. Software Integration Query"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="contact-message" className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-bold">
            MESSAGE *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-border py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-accent transition-colors duration-200 resize-none min-h-[90px]"
            placeholder="Describe your project goals..."
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11 text-sm uppercase tracking-wider font-bold mt-2 relative overflow-hidden group font-mono"
          disabled={status === "loading" || status === "success"}
        >
          {status === "idle" && (
            <>
              Send Message
              <Send className="ml-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
          {status === "loading" && (
            <span className="flex items-center">
              <span className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Transmitting...
            </span>
          )}
          {status === "success" && (
            <span className="flex items-center text-green-500">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Delivered
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center text-destructive">
              <AlertCircle className="mr-2 h-4 w-4" />
              Failed
            </span>
          )}
        </Button>

        {feedback && (
          <p
            id="contact-feedback"
            className={`text-xs text-center font-mono uppercase ${status === "error" ? "text-destructive font-bold" : "text-green-500"}`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        )}

        {status === "error" && (
          <a
            href={fallbackMailto}
            className="text-[10px] font-mono font-bold text-accent hover:underline text-center uppercase"
          >
            Open Mail Draft Manually &gt;
          </a>
        )}
      </form>
    </div>
  );
}

export default ContactForm;
