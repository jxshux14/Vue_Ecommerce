export const products = [
  // ─── GPUs ───────────────────────────────────────────────
  {
    id: 1,
    title: 'NVIDIA RTX 4090 24GB',
    category: 'GPU',
    price: 1599.99,
    description: 'The RTX 4090 is the world\'s fastest consumer GPU. Powered by the Ada Lovelace architecture, it delivers a massive leap in performance, efficiency, and AI-powered graphics. 24GB GDDR6X memory.',
    image: 'https://asset.msi.com/resize/image/global/product/product_16684922651c6e70fc42901abd49b48e6238228fba.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    rating: { rate: 4.9, count: 320 }
  },
  {
    id: 2,
    title: 'AMD Radeon RX 7900 XTX',
    category: 'GPU',
    price: 899.99,
    description: 'Flagship AMD GPU with 24GB GDDR6 memory and RDNA 3 architecture. Excellent 4K gaming performance and ray tracing capabilities at a competitive price.',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/ffebdb331cdc6e8eecf7f2b4b42b8232/Product/32793/Png',
    rating: { rate: 4.7, count: 187 }
  },
  {
    id: 3,
    title: 'NVIDIA RTX 4070 Ti Super',
    category: 'GPU',
    price: 799.99,
    description: 'The RTX 4070 Ti Super offers incredible 1440p and 4K performance. Features 16GB GDDR6X and DLSS 3.5 for AI-powered frame generation.',
    image: 'https://www.notebookcheck.net/fileadmin/Notebooks/Asus/TUF_Gaming_GeForce_RTX_4070_Ti_Super/asus_4070ti_super.png',
    rating: { rate: 4.8, count: 245 }
  },
  {
    id: 4,
    title: 'NVIDIA RTX 4060 8GB',
    category: 'GPU',
    price: 299.99,
    description: 'The RTX 4060 delivers efficient 1080p and 1440p gaming with DLSS 3 support. Great value card for mainstream gamers upgrading from older GPUs.',
    image: 'https://i0.wp.com/brparadox.com/wp-content/uploads/2023/06/RTX4060.png?fit=800%2C800&ssl=1',
    rating: { rate: 4.6, count: 412 }
  },

  // ─── CPUs ───────────────────────────────────────────────
  {
    id: 5,
    title: 'AMD Ryzen 9 7950X',
    category: 'CPU',
    price: 699.99,
    description: 'The Ryzen 9 7950X features 16 cores and 32 threads built on the Zen 4 architecture. Ideal for gaming, streaming, and content creation simultaneously.',
    image: 'https://blossomzones.com/wp-content/uploads/2022/09/7950X.png',
    rating: { rate: 4.8, count: 215 }
  },
  {
    id: 6,
    title: 'Intel Core i9-14900K',
    category: 'CPU',
    price: 589.99,
    description: 'Intel\'s flagship 14th Gen processor with 24 cores (8P+16E) and up to 6.0GHz boost clock. Dominates in single-threaded gaming and multi-threaded workloads.',
    image: 'https://www.nexxcom.lk/wp-content/uploads/2023/10/I9-14900.png',
    rating: { rate: 4.7, count: 198 }
  },
  {
    id: 7,
    title: 'AMD Ryzen 7 7700X',
    category: 'CPU',
    price: 349.99,
    description: '8-core, 16-thread Zen 4 processor perfect for gaming rigs. High single-core performance with excellent power efficiency on the AM5 platform.',
    image: 'https://themark.com.co/wp-content/uploads/2022/10/AM5-RYZEN-7-7700X.png',
    rating: { rate: 4.8, count: 310 }
  },
  {
    id: 8,
    title: 'Intel Core i5-14600K',
    category: 'CPU',
    price: 319.99,
    description: 'Best value gaming CPU with 14 cores and 20 threads. Incredible price-to-performance ratio for 1080p and 1440p gaming builds.',
    image: 'https://www.notebookcheck.net/uploads/tx_nbc2/N22490-001-RPL-i5K-UNIV_png.png',
    rating: { rate: 4.9, count: 520 }
  },

  // ─── RAM ────────────────────────────────────────────────
  {
    id: 9,
    title: 'Corsair Vengeance DDR5 32GB',
    category: 'RAM',
    price: 129.99,
    description: '32GB DDR5 RAM running at 6000MHz. Optimized for AMD EXPO and Intel XMP 3.0 platforms. Low-profile design fits under most CPU coolers.',
    image: 'https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Memory/vengeance-rgb-ddr5-config/black/2up/Vengeance-RGB-DDR5-2UP-BLACK_01.webp',
    rating: { rate: 4.7, count: 180 }
  },
  {
    id: 10,
    title: 'G.Skill Trident Z5 RGB 64GB',
    category: 'RAM',
    price: 219.99,
    description: '64GB DDR5-6400 with stunning RGB lighting. Dual-rank design for maximum bandwidth. Perfect for content creators and hardcore multitaskers.',
    image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/20-374-431-10.png',
    rating: { rate: 4.8, count: 134 }
  },
  {
    id: 11,
    title: 'Kingston Fury Beast DDR5 16GB',
    category: 'RAM',
    price: 64.99,
    description: 'Budget-friendly DDR5 at 5200MHz. Intel XMP 3.0 and AMD EXPO compatible. A solid entry point into the DDR5 ecosystem.',
    image: 'https://cdn-reichelt.de/bilder/web/xxl_ws/E910/KINGSTON_50KI1660-2040FBR_01.png',
    rating: { rate: 4.6, count: 290 }
  },

  // ─── Storage ────────────────────────────────────────────
  {
    id: 12,
    title: 'Samsung 990 Pro 2TB NVMe SSD',
    category: 'Storage',
    price: 179.99,
    description: 'PCIe 4.0 NVMe SSD with read speeds up to 7,450MB/s. Perfect for gaming and professional workloads with exceptional endurance and reliability.',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/ca_fr/mz-v9p2t0b-am/gallery/ca-fr-990pro-nvme-m2-ssd-mz-v9p2t0b-am-534208574?$650_519_PNG$',
    rating: { rate: 4.8, count: 420 }
  },
  {
    id: 13,
    title: 'WD Black SN850X 1TB NVMe',
    category: 'Storage',
    price: 109.99,
    description: 'PCIe 4.0 NVMe with 7,300MB/s sequential read. Optimized for PS5 and PC gaming with Game Mode 2.0 for predictive loading.',
    image: 'https://shop.sandisk.com/content/dam/sandisk/en-us/assets/products/internal-storage/wd-black-sn850x-nvme-ssd/gallery/wd-black-sn850x-nvme-ssd-front.png',
    rating: { rate: 4.8, count: 365 }
  },
  {
    id: 14,
    title: 'Seagate Barracuda 4TB HDD',
    category: 'Storage',
    price: 79.99,
    description: '4TB 3.5" hard drive at 7200RPM for mass storage. Reliable long-term storage for game libraries, media, and backups.',
    image: 'https://www.clx.co.il/wp-content/uploads/2022/04/Seagate-BarraCuda-2To-copy-1.png',
    rating: { rate: 4.5, count: 670 }
  },

  // ─── Motherboards ───────────────────────────────────────
  {
    id: 15,
    title: 'ASUS ROG Maximus Z790 Hero',
    category: 'Motherboard',
    price: 629.99,
    description: 'Premium Intel Z790 motherboard with PCIe 5.0 support, DDR5 memory slots, and advanced overclocking features. Built for elite gaming and performance.',
    image: 'https://dlcdnwebimgs.asus.com/gain/F3E11E3F-A082-4F7A-A45C-AA29A4E16150/w1000/h732',
    rating: { rate: 4.7, count: 98 }
  },
  {
    id: 16,
    title: 'MSI MAG X670E Tomahawk WiFi',
    category: 'Motherboard',
    price: 299.99,
    description: 'AMD X670E motherboard with PCIe 5.0, DDR5 support, and built-in WiFi 6E. Excellent value for Ryzen 7000 series builds.',
    image: 'https://asset.msi.com/resize/image/global/product/product_16768630562ddd8ba94359cc21b079eb57b31e7645.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    rating: { rate: 4.6, count: 156 }
  },
  {
    id: 17,
    title: 'Gigabyte Z790 AORUS Elite AX',
    category: 'Motherboard',
    price: 289.99,
    description: 'Feature-packed Z790 board with 16+1+2 power phases, PCIe 5.0 M.2 slot, and DDR5 support. A top pick for Intel 13th and 14th Gen builds.',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/0c6899b3e79329e5c8236fda4441fe0e/Product/32578',
    rating: { rate: 4.7, count: 203 }
  },

  // ─── Cooling ────────────────────────────────────────────
  {
    id: 18,
    title: 'NZXT Kraken 360 AIO Cooler',
    category: 'Cooling',
    price: 199.99,
    description: '360mm all-in-one liquid cooler with customizable ARGB pump head and fans. Whisper-quiet operation with exceptional thermal performance.',
    image: 'https://th.bing.com/th/id/R.e9afed86a3f736073d63e001c0ba2d5a?rik=e%2fprrB3FnBRbZw&riu=http%3a%2f%2fthetechyard.com%2fcdn%2fshop%2fproducts%2f1681508261-cooling_kraken-rgb_360_w_rgb-core_hero-1_rgb.png%3fv%3d1703165485&ehk=NvTF2LHmJ4CHDvqMYUytaiz7ePULhQ0Bsvvo1npnhzw%3d&risl=&pid=ImgRaw&r=0',
    rating: { rate: 4.6, count: 145 }
  },
  {
    id: 19,
    title: 'Noctua NH-D15 CPU Cooler',
    category: 'Cooling',
    price: 109.99,
    description: 'The gold standard of air cooling. Dual-tower design with two NF-A15 fans delivers exceptional thermal performance with near-silent operation.',
    image: 'https://cdn-reichelt.de/bilder/web/xxl_ws/E201/NH-D15_01.png',
    rating: { rate: 4.9, count: 890 }
  },
  {
    id: 20,
    title: 'Corsair iCUE H150i Elite LCD',
    category: 'Cooling',
    price: 249.99,
    description: '360mm AIO with 2.1" IPS LCD display on the pump head. Includes three AF120 Elite fans and intelligent fan control via iCUE software.',
    image: 'https://assets.corsair.com/image/upload/f_auto,q_auto/v1/akamai/pdp/cooling/xt-series/elite-lcd/assets/images/Panel5_image.webp',
    rating: { rate: 4.7, count: 213 }
  },

  // ─── Cases ──────────────────────────────────────────────
  {
    id: 21,
    title: 'Lian Li PC-O11 Dynamic EVO',
    category: 'Case',
    price: 169.99,
    description: 'Mid-tower ATX case with dual-chamber layout, panoramic tempered glass, and support for up to 9 fans. A favorite among PC builders worldwide.',
    image: 'https://lian-li.com/wp-content/uploads/2023/12/O11D-EVO-RBG_09.webp',
    rating: { rate: 4.9, count: 530 }
  },
  {
    id: 22,
    title: 'Fractal Design Torrent RGB',
    category: 'Case',
    price: 189.99,
    description: 'Airflow-focused case with two massive 180mm front fans and three 140mm bottom intake fans. Excellent cooling with a clean minimalist aesthetic.',
    image: 'https://th.bing.com/th/id/R.9a1bea722435467f92811437933d2264?rik=RgnDyxR9KC8TdQ&riu=http%3a%2f%2ftechspace.ma%2fcdn%2fshop%2ffiles%2fFRACTAL1.png%3fv%3d1696327354&ehk=XtbSlrC8ob9KQBxYRPaciGYQ9HzX9N7wAkOTLB3UJxU%3d&risl=&pid=ImgRaw&r=0',
    rating: { rate: 4.8, count: 312 }
  },
  {
    id: 23,
    title: 'NZXT H9 Flow Mid-Tower',
    category: 'Case',
    price: 149.99,
    description: 'Dual-chamber design with 4-sided tempered glass panels and excellent airflow. One of the most visually striking cases available.',
    image: 'https://c1.neweggimages.com/ProductImageCompressAll1280/11-146-347-12.png',
    rating: { rate: 4.7, count: 278 }
  },

  // ─── PSUs ───────────────────────────────────────────────
  {
    id: 24,
    title: 'Corsair RM1000x 1000W PSU',
    category: 'PSU',
    price: 189.99,
    description: '80 PLUS Gold certified fully modular power supply. Zero RPM fan mode for silent operation at low loads. 10-year warranty included.',
    image: 'https://assets.corsair.com/image/upload/f_auto,q_auto/content/CP-9020094-NA-RMx-1000-01.png',
    rating: { rate: 4.8, count: 290 }
  },
  {
    id: 25,
    title: 'Seasonic Focus GX-850 850W',
    category: 'PSU',
    price: 149.99,
    description: '850W 80 PLUS Gold fully modular PSU. Hybrid fan mode for silent operation. Highly reliable with a 10-year manufacturer warranty.',
    image: 'https://www.powerhousepc.com.au/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/m/dm_20240813104318_031_1.jpg',
    rating: { rate: 4.9, count: 445 }
  },
  {
    id: 26,
    title: 'EVGA SuperNOVA 750 G6',
    category: 'PSU',
    price: 119.99,
    description: '750W 80 PLUS Gold fully modular power supply. Compact 140mm size fits in smaller cases. Eco mode for whisper-quiet operation.',
    image: 'https://images.evga.com/products/gallery/png/220-G6-0750-X1_XL_4.png',
    rating: { rate: 4.7, count: 334 }
  },

  // ─── Monitors ───────────────────────────────────────────
  {
    id: 27,
    title: 'LG 27GN950-B 4K 144Hz',
    category: 'Monitor',
    price: 799.99,
    description: '27-inch 4K Nano IPS display with 144Hz refresh rate, 1ms response time, and HDMI 2.1 support. Stunning color accuracy for gaming and creative work.',
    image: 'https://www.famitsu.com/sp/LG_27GP83B-B/images/kv.png',
    rating: { rate: 4.7, count: 375 }
  },
  {
    id: 28,
    title: 'Samsung Odyssey G7 27" QHD',
    category: 'Monitor',
    price: 499.99,
    description: '27-inch 1440p curved VA panel at 240Hz. 1ms response time with G-Sync and FreeSync Premium Pro support. Immersive 1000R curvature.',
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/ac3199e8-a545-42d8-8952-73f6cd00b607.jpg',
    rating: { rate: 4.8, count: 489 }
  },
  {
    id: 29,
    title: 'ASUS ROG Swift PG279QM',
    category: 'Monitor',
    price: 649.99,
    description: '27-inch 1440p IPS display with 240Hz refresh rate and 1ms GTG response. NVIDIA G-Sync Ultimate certified for tear-free gaming.',
    image: 'https://dlcdnwebimgs.asus.com/gain/72C16A36-4EE3-4AC4-A58A-35F6B8A2FB6F/w717/h525',
    rating: { rate: 4.8, count: 267 }
  },

  // ─── Peripherals ────────────────────────────────────────
  {
    id: 30,
    title: 'Logitech G Pro X Superlight 2',
    category: 'Peripherals',
    price: 159.99,
    description: 'Ultra-lightweight wireless gaming mouse at just 60g. Features the HERO 2 sensor with up to 32,000 DPI. Built for esports professionals.',
    image: 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery-5-pro-x-superlight-2-gaming-mouse-white.png',
    rating: { rate: 4.9, count: 612 }
  },
  {
    id: 31,
    title: 'Keychron Q1 Pro Mechanical Keyboard',
    category: 'Peripherals',
    price: 199.99,
    description: 'Wireless QMK/VIA mechanical keyboard with gasket mount, aluminum body, and RGB backlight. Compatible with Mac and Windows.',
    image: 'https://www.keychron.com/cdn/shop/files/K2_Max_8bc9da9d-f49c-4e3d-b5be-a297634f730d.png?v=15976046212630138621',
    rating: { rate: 4.8, count: 234 }
  },
  {
    id: 32,
    title: 'Razer DeathAdder V3 Pro',
    category: 'Peripherals',
    price: 149.99,
    description: 'Wireless ergonomic gaming mouse with Focus Pro 30K optical sensor. 90-hour battery life and HyperSpeed wireless technology for lag-free gaming.',
    image: 'https://lmt-web.mstatic.lv/eshop/17886/Razer_DeathAdder_V3_2.png',
    rating: { rate: 4.8, count: 445 }
  },
  {
    id: 33,
    title: 'SteelSeries Arctis Nova Pro',
    category: 'Peripherals',
    price: 249.99,
    description: 'Premium gaming headset with dual DAC system, active noise cancellation, and 360° spatial audio. Hot-swappable battery for unlimited playtime.',
    image: 'https://media.steelseriescdn.com/thumbs/filer_public/17/86/1786f577-dec0-4119-848f-640214afaff2/arctis_nova_pro_wl_white_img_buy_2_2.png__1920x1080_crop-fit_optimize_subsampling-2.png',
    rating: { rate: 4.7, count: 356 }
  },
  {
    id: 34,
    title: 'Logitech G915 TKL Wireless',
    category: 'Peripherals',
    price: 229.99,
    description: 'Tenkeyless low-profile wireless mechanical keyboard with LIGHTSPEED and Bluetooth. Ultra-slim design at just 22mm tall.',
    image: 'https://resource.logitechg.com/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery/deu-g915-tkl-carbon-gallery-topdown.png',
    rating: { rate: 4.7, count: 289 }
  },
]