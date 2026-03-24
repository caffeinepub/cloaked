const GALLERY_ITEMS = [
  { caption: "Mango grove after morning rain", cls: "gallery-1" },
  { caption: "Mulberry harvest, April", cls: "gallery-2" },
  { caption: "Cool season beds, November", cls: "gallery-3" },
  { caption: "Lemongrass border", cls: "gallery-4" },
  { caption: "Star fruit ripening", cls: "gallery-5" },
  { caption: "The garden at golden hour", cls: "gallery-6" },
];

export default function GalleryTab() {
  return (
    <div className="space-y-5">
      <div className="card-texture rounded-xl p-4 text-center">
        <p className="text-sm font-sans text-muted-foreground italic">
          Photos coming soon as the season progresses.
        </p>
      </div>

      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        data-ocid="gallery.list"
      >
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.caption}
            className="rounded-lg overflow-hidden relative group cursor-pointer"
            style={{ aspectRatio: "1" }}
            data-ocid="gallery.item.1"
          >
            <div
              className={`w-full h-full ${item.cls} transition-transform duration-300 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-0 left-0 right-0 p-2.5 text-xs font-sans text-white leading-tight">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground font-sans italic">
        Placeholder gradients inspired by the Seurat palette — real photos
        coming with the growing season.
      </p>
    </div>
  );
}
