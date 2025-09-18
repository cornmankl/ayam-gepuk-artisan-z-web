'use client'

import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-menu-dark text-menu-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-menu-yellow">
                <img 
                  src="/images/logo.jpg" 
                  alt="Ayam Gepuk Artisan Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-lg text-menu-light">Ayam Gepuk</span>
                <span className="text-menu-yellow font-black text-lg"> Artisan</span>
              </div>
            </div>
            <p className="text-menu-light/70 text-sm font-bold">
              Authentic Malaysian crispy chicken, crafted with traditional recipes and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-menu-light/60 hover:text-menu-yellow cursor-pointer" />
              <Instagram className="h-5 w-5 text-menu-light/60 hover:text-menu-yellow cursor-pointer" />
              <Twitter className="h-5 w-5 text-menu-light/60 hover:text-menu-yellow cursor-pointer" />
              <Youtube className="h-5 w-5 text-menu-light/60 hover:text-menu-yellow cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-menu-light">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/menu" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Menu</a></li>
              <li><a href="/branches" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Branches</a></li>
              <li><a href="/promotions" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Promotions</a></li>
              <li><a href="/about" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">About Us</a></li>
              <li><a href="/contact" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-menu-light">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">FAQ</a></li>
              <li><a href="/delivery" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Delivery Info</a></li>
              <li><a href="/terms" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Privacy Policy</a></li>
              <li><a href="/careers" className="text-menu-light/70 hover:text-menu-yellow transition-colors font-bold">Careers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-black text-lg text-menu-light">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-menu-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-menu-light/70 font-bold">Hotline</p>
                  <p className="text-menu-light font-black">03-4107 1234</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-menu-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-menu-light/70 font-bold">Email</p>
                  <p className="text-menu-light font-black">info@ayamgepukartisan.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-menu-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-menu-light/70 font-bold">Head Office</p>
                  <p className="text-menu-light font-black">Jalan Bandar 11, Taman Melawati, 53100 Kuala Lumpur</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-menu-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-menu-light/70 font-bold">Business Hours</p>
                  <p className="text-menu-light font-black">11:00 AM - 10:00 PM (Daily)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-menu-yellow/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-menu-light/70 text-sm font-bold">
              © 2024 Ayam Gepuk Artisan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-menu-light/70 text-sm hover:text-menu-yellow cursor-pointer font-bold">Terms</span>
              <span className="text-menu-light/70 text-sm hover:text-menu-yellow cursor-pointer font-bold">Privacy</span>
              <span className="text-menu-light/70 text-sm hover:text-menu-yellow cursor-pointer font-bold">Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}