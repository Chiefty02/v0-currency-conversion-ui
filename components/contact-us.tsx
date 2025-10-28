"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react"
import { useState } from "react"

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Contact Us</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="bg-[#2f2f2f] border-[#5d5b5b] p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-[#fbc108] rounded-full flex items-center justify-center">
              <img
                src="/images/design-mode/image.png"
                alt="Contact illustration"
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Get in Touch</h3>
            <p className="text-gray-400 text-center">Always be the agent to experience the best of our services</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-gray-400">support@tyrion.exchange</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-medium">Phone</p>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-medium">Address</p>
                <p className="text-gray-400">123 Crypto Street, Digital City, DC 12345</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#fbc108] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-medium">Live Chat</p>
                <p className="text-gray-400">Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#5d5b5b]">
            <h4 className="text-white font-medium mb-3">Business Hours</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="bg-[#2f2f2f] border-[#5d5b5b] p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Send us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Subject</label>
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
                className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">Message</label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                rows={5}
                className="bg-[#4a4a4a] border-gray-600 text-white placeholder-gray-400 resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#fbc108] hover:bg-[#e6ad07] text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </form>

          <div className="mt-6 p-4 bg-[#4a4a4a] rounded-lg">
            <p className="text-gray-300 text-sm">
              <strong>Quick Response:</strong> We typically respond to all inquiries within 24 hours. For urgent
              matters, please use our live chat feature.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
