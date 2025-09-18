export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Menu Colors Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Menu Colors</h2>
            
            <div className="p-4 bg-menu-yellow text-menu-dark rounded-lg">
              <p className="font-bold">Menu Yellow</p>
              <p className="text-sm">Bright yellow from menu background</p>
            </div>
            
            <div className="p-4 bg-menu-red text-menu-light rounded-lg">
              <p className="font-bold">Menu Red</p>
              <p className="text-sm">Red from TRY NOW labels</p>
            </div>
            
            <div className="p-4 bg-menu-dark text-menu-light rounded-lg">
              <p className="font-bold">Menu Dark</p>
              <p className="text-sm">Dark black for text</p>
            </div>
            
            <div className="p-4 bg-menu-light text-menu-dark rounded-lg border">
              <p className="font-bold">Menu Light</p>
              <p className="text-sm">Light cream/white for cards</p>
            </div>
            
            <div className="p-4 bg-menu-accent text-menu-dark rounded-lg">
              <p className="font-bold">Menu Accent</p>
              <p className="text-sm">Orange accent for highlights</p>
            </div>
            
            <div className="p-4 bg-menu-border text-menu-light rounded-lg">
              <p className="font-bold">Menu Border</p>
              <p className="text-sm">Border color</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Component Examples</h2>
            
            <div className="p-4 bg-menu-dark rounded-lg">
              <h3 className="text-menu-light font-bold mb-2">Navigation Style</h3>
              <p className="text-menu-light/80">Navigation background with light text</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-menu-yellow via-menu-red/80 to-menu-accent/20 rounded-lg">
              <h3 className="text-menu-dark font-bold mb-2">Hero Gradient</h3>
              <p className="text-menu-dark/90">Hero section gradient background</p>
            </div>
            
            <div className="p-4 bg-menu-light rounded-lg border-2 border-menu-yellow/20">
              <h3 className="text-menu-dark font-bold mb-2">Card Style</h3>
              <p className="text-menu-dark/70">Card with light background and yellow border</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-menu-red">
              <h3 className="text-menu-red font-bold mb-2">Accent Border</h3>
              <p className="text-menu-dark/70">White card with red accent border</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}