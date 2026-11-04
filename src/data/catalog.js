    const IMG_IPHONE_PRO = "assets/img/iphone-pro.png";
    const IMG_IPHONE_16 = "assets/img/iphone-16.png";
    const IMG_MACBOOK = "assets/img/macbook.png";
    const IMG_IPAD = "assets/img/ipad.png";
    const IMG_WATCH = "assets/img/watch.png";
    const IMG_AIRPODS = "assets/img/airpods.png";
    const IMG_MAGSAFE = "assets/img/magsafe.png";
    const IMG_CASE = "assets/img/case.png";

    let allCatalogDevices = [
      {
        id: 'iphone-duo-fold',
        category: 'iphone',
        badge: "Gama 2026 • Primer Plegable Apple",
        title: "iPhone Duo (Primer Smartphone Plegable de Apple)",
        price: 8999000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Revolución histórica 2026: El primer smartphone plegable de Apple con bisagra de Metal Líquido sin pliegue visible, pantalla desplegable Tandem OLED de 7.9\" y Chip A20 Pro.",
        specs: [
          "Doble pantalla: Externa 6.3\" Super Retina XDR + Interna Plegable 7.9\" Tandem OLED 120Hz",
          "Bisagra aeroespacial de Titanio y Metal Líquido con pliegue cero autorreparable",
          "Chip A20 Pro de 2nm con multitarea dividida estilo iPadOS y Apple Intelligence 3.0",
          "Sistema de triple cámara Pro de 48 MP + Face ID dual en ambas pantallas"
        ],
        variants: [
          "512 GB - Titanio Negro Espacial - $8.999.000",
          "1 TB - Titanio Plata - $10.199.000",
          "2 TB - Edición Especial Duo - $11.499.000"
        ],
        colors: [
          {
            "name": "Titanio Negro Espacial",
            "hex": "#1F2022"
          },
          {
            "name": "Titanio Plata Líquido",
            "hex": "#DCDFE3"
          },
          {
            "name": "Titanio Carmesí Edición Especial",
            "hex": "#8A1C27"
          }
        ]
      },
      {
        id: 'iphone-18-pro-max',
        category: 'iphone',
        badge: "Gama iPhone 18 (2026)",
        title: "iPhone 18 Pro Max (256GB - 2TB)",
        price: 6999000,
        img: IMG_IPHONE_PRO,
        shortDesc: "La máxima expresión tecnológica 2026: Chasis de Titanio Grado 5, Chip A20 Pro de 2nm, cámara con apertura mecánica variable y zoom periscópico 10x.",
        specs: [
          "Pantalla Super Retina XDR 6.9\" ProMotion 120Hz con Face ID bajo pantalla",
          "Chip A20 Pro a 2nm con Neural Engine de 64 núcleos y 12 GB de RAM",
          "Triple cámara trasera de 48 MP con apertura variable y Teleobjetivo 10x",
          "Batería de alta densidad con hasta 38 horas de reproducción de video"
        ],
        variants: [
          "256 GB - $6.999.000",
          "512 GB - $7.999.000",
          "1 TB - $9.199.000",
          "2 TB - $10.499.000"
        ],
        colors: [
          {
            "name": "Titanio Café Bronce",
            "hex": "#6E5446"
          },
          {
            "name": "Titanio Borgoña",
            "hex": "#5B2430"
          },
          {
            "name": "Titanio Morado Oscuro",
            "hex": "#3F334D"
          },
          {
            "name": "Titanio Negro Ónix",
            "hex": "#222224"
          }
        ]
      },
      {
        id: 'iphone-18-pro',
        category: 'iphone',
        badge: "Gama iPhone 18 (2026)",
        title: "iPhone 18 Pro (256GB - 1TB)",
        price: 5999000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Potencia Pro insignia de 2026 en 6.3\": Chasis de titanio aeroespacial, Face ID bajo pantalla, Chip A20 Pro y grabación Spatial Video 8K.",
        specs: [
          "Pantalla Super Retina XDR 6.3\" ProMotion con Dynamic Island ultrarreducida",
          "Chip A20 Pro de 2nm con trazado de rayos por hardware de 3.ª generación",
          "Sistema de cámaras Pro 48 MP en los 3 sensores + Control de Cámara háptico",
          "Carga ultrarrápida MagSafe de 45W y conectividad Wi-Fi 7 + Satélite"
        ],
        variants: [
          "256 GB - $5.999.000",
          "512 GB - $6.999.000",
          "1 TB - $8.199.000"
        ],
        colors: [
          {
            "name": "Titanio Café Bronce",
            "hex": "#6E5446"
          },
          {
            "name": "Titanio Borgoña",
            "hex": "#5B2430"
          },
          {
            "name": "Titanio Morado Oscuro",
            "hex": "#3F334D"
          },
          {
            "name": "Titanio Negro Ónix",
            "hex": "#222224"
          }
        ]
      },
      {
        id: 'iphone-17-pro-max',
        category: 'iphone',
        badge: "Gama iPhone 17 (2025/2026)",
        title: "iPhone 17 Pro Max (256GB - 1TB)",
        price: 6299000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Chip A19 Pro, 12 GB de RAM para Apple Intelligence avanzada y triple cámara trasera íntegramente de 48 MP con zoom óptico 5x.",
        specs: [
          "Pantalla Super Retina XDR 6.9\" antirreflejo con Ceramic Shield de nueva generación",
          "Chip A19 Pro con cámara de vapor térmica y 12 GB de RAM",
          "Tres cámaras traseras de 48 MP (Principal, Ultra Gran Angular y Teleobjetivo 5x) + Frontal 24 MP",
          "Hasta 35 horas de reproducción continua de video"
        ],
        variants: [
          "256 GB - $6.299.000",
          "512 GB - $7.299.000",
          "1 TB - $8.499.000"
        ],
        colors: [
          {
            "name": "Titanio Azul Oscuro",
            "hex": "#253447"
          },
          {
            "name": "Titanio Verde Teal",
            "hex": "#3E5C58"
          },
          {
            "name": "Titanio Natural",
            "hex": "#9B968F"
          },
          {
            "name": "Titanio Negro",
            "hex": "#2E2E30"
          }
        ]
      },
      {
        id: 'iphone-17-pro',
        category: 'iphone',
        badge: "Gama iPhone 17 (2025/2026)",
        title: "iPhone 17 Pro (256GB - 1TB)",
        price: 5399000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Diseño Pro de 6.3\" con triple sensor de 48 MP, cámara selfie TrueDepth de 24 MP y toda la potencia del Chip A19 Pro.",
        specs: [
          "Pantalla Super Retina XDR 6.3\" ProMotion Always-On 120Hz",
          "Chip A19 Pro con 12 GB de memoria unificada",
          "Grabación ProRes 4K a 120 fps y Audio Espacial de estudio",
          "Acabados: Titanio Azul Oscuro, Titanio Natural, Titanio Plata y Negro"
        ],
        variants: [
          "256 GB - $5.399.000",
          "512 GB - $6.399.000",
          "1 TB - $7.599.000"
        ],
        colors: [
          {
            "name": "Titanio Azul Oscuro",
            "hex": "#253447"
          },
          {
            "name": "Titanio Verde Teal",
            "hex": "#3E5C58"
          },
          {
            "name": "Titanio Natural",
            "hex": "#9B968F"
          },
          {
            "name": "Titanio Negro",
            "hex": "#2E2E30"
          }
        ]
      },
      {
        id: 'iphone-air',
        category: 'iphone',
        badge: "Gama iPhone 17 • Ultra Delgado",
        title: "iPhone Air (256GB - 512GB)",
        price: 4899000,
        img: IMG_IPHONE_16,
        shortDesc: "El iPhone más delgado de la historia (5.5 mm): diseño ultraligero revolucionario con pantalla ProMotion de 6.6\" y Chip A19.",
        specs: [
          "Chasis ultradelgado de 5.5 mm en aleación de titanio y aluminio aeroespacial",
          "Pantalla OLED Super Retina XDR de 6.6\" con ProMotion 120Hz",
          "Chip A19 + módem 5G diseñado por Apple de ultra bajo consumo",
          "Cámara Fusion de 48 MP con teleobjetivo óptico 2x integrado y frontal de 24 MP"
        ],
        variants: [
          "256 GB - Plata Estelar - $4.899.000",
          "512 GB - Negro Espacial - $5.599.000"
        ],
        colors: [
          {
            "name": "Titanio Plata Estelar",
            "hex": "#E5E6E8"
          },
          {
            "name": "Titanio Negro Espacial",
            "hex": "#2B2C2E"
          },
          {
            "name": "Titanio Azul Cielo",
            "hex": "#A6BCCF"
          },
          {
            "name": "Titanio Oro Claro",
            "hex": "#EBDCC7"
          }
        ]
      },
      {
        id: 'iphone-17',
        category: 'iphone',
        badge: "Gama iPhone 17 (2025/2026)",
        title: "iPhone 17 (128GB - 512GB)",
        price: 4399000,
        img: IMG_IPHONE_16,
        shortDesc: "Por primera vez con pantalla ProMotion de 120Hz en el modelo base, nuevo tamaño de 6.3\", Chip A19 y cámara frontal de 24 MP.",
        specs: [
          "Pantalla Super Retina XDR de 6.3\" con tecnología ProMotion 120Hz Always-On",
          "Chip Apple A19 de 3nm de tercera generación",
          "Sistema de cámara Dual Fusion de 48 MP + cámara selfie de 24 MP",
          "Colores: Verde Salvia, Lavanda, Azul Bruma, Blanco y Negro"
        ],
        variants: [
          "128 GB - $4.399.000",
          "256 GB - $4.899.000",
          "512 GB - $5.599.000"
        ],
        colors: [
          {
            "name": "Verde Salvia",
            "hex": "#8FA691"
          },
          {
            "name": "Lavanda",
            "hex": "#C8BFE7"
          },
          {
            "name": "Azul Bruma",
            "hex": "#8CA8BE"
          },
          {
            "name": "Blanco",
            "hex": "#F5F5F7"
          },
          {
            "name": "Negro",
            "hex": "#262729"
          }
        ]
      },
      {
        id: 'iphone-17e',
        category: 'iphone',
        badge: "Gama iPhone 17 (2026)",
        title: "iPhone 17e (128GB - 256GB)",
        price: 3499000,
        img: IMG_IPHONE_16,
        shortDesc: "El miembro más accesible de la familia 17 con Chip A19, Apple Intelligence completa, Face ID y extraordinaria autonomía.",
        specs: [
          "Pantalla Super Retina XDR OLED de 6.1\" con Dynamic Island",
          "Chip A19 compatible al 100% con Apple Intelligence",
          "Cámara Fusion 2 en 1 de 48 MP con teleobjetivo 2x y USB-C",
          "Batería para todo el día y resistencia al agua IP68"
        ],
        variants: [
          "128 GB - Blanco / Negro - $3.499.000",
          "256 GB - Blanco / Negro - $3.999.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#252628"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F4F4F6"
          },
          {
            "name": "Azul Niebla",
            "hex": "#9EB2C2"
          }
        ]
      },
      {
        id: 'iphone-16-pro-max',
        category: 'iphone',
        badge: "Lanzamiento 2024/2025",
        title: "iPhone 16 Pro Max (256GB - 1TB)",
        price: 5699000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Pantalla gigante de 6.9\", chasis de Titanio Grado 5, Chip A18 Pro, Control de Cámara y teleobjetivo tetraprisma 5x.",
        specs: [
          "Pantalla Super Retina XDR 6.9\" con los bordes más finos",
          "Chip A18 Pro de 3nm optimizado para Apple Intelligence",
          "Cámara Fusion 48 MP + Ultra Gran Angular 48 MP + Teleobjetivo 5x",
          "Acabados: Titanio Desierto, Titanio Natural, Blanco y Negro"
        ],
        variants: [
          "256 GB - $5.699.000",
          "512 GB - $6.799.000",
          "1 TB - $7.899.000"
        ],
        colors: [
          {
            "name": "Titanio Desierto",
            "hex": "#C5B29F",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXQCduY9KlZvDYMM12SNOKJ-UC7ud1w54GbunUI6a2Q6SQabwiz8Q2kaJBmntthx-YaCV8Wy8kQSKZmqDGQNYE9KcWrlbHdYwS8a_Ik-HauhOP6ewcTQJvWq3bt3UskJGN3TrdEt9BCFmGItcuKAUfBFXsjs8lfmRrz8yRzae409mM-WE221baiPBrvHCkacPhhb7xNklcGToW038Ak9jS7ImnRihPrS4ETqWMiTot3fPVgnVc_FZM"
          },
          {
            "name": "Titanio Natural",
            "hex": "#9B968F",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vbp8i7NcqJPqqwjnib7N5kojQ12qGEvJgIy1wgV3-32WO0IHIp3LcK4Ii52b8UHFqKq4nvW7NQozR1cqvE9Qi9YJvFMfEglIWYtutmYXcOCAHk7kKQ1fAZlk8G6cnyTsgxyq8-axeHjd0Kz_VsZNFP_I2DfY1IYtOchlgLNey5Za6e4zt0u21jvBsIQptmckP2q5sEk66EL0qAqhSdjjneDIX9ws4Uhh05RrKjuOfyasw9Bl-f51"
          },
          {
            "name": "Titanio Blanco",
            "hex": "#E8E8E6",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpi-7626i_BJoAesODslUPkoHF04It4WQfIRb2gDCzY-XPTt0M4AWO3WivVPvllUKPqKO1qhdw_EkyK6IsQgqWFmrYCyz666iavAdl6p3SM5Rd7J82vr0lZhy3YDHo9sPYN5PQUCyWDPW9pdYh6VzFQp3QVDOIaAfKgJXAz2givYj5_BDYXPsmJsCXvxGgS-JuiYI6ziK3EGAf1dO_3gPjpA3eRj_FrcGJ__DTBAC1ChH96IN4DBt"
          },
          {
            "name": "Titanio Negro",
            "hex": "#343332",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCMv6ybGEqgj4q7JB0905STGqvKkmeSjkOwJKHIsW3lZQs4t7J9z3Amool_EzZPhTuq47-VhCiR1KPVV_-avHCio8xc3fr8wI60m9tDqXziuhwgWSjPM1LTVzemNhlB7eDtEfWXuEjN91U0oRvU3KQv-a9Q-5xFxWdZlqEEJzeVWzKrhgXeEuRV3YEQMRl6YOAUBssA02c0rygPJNmzDND3-L9BBigYBXR_GsW5GtkuUN7mn8VyrNqi"
          }
        ]
      },
      {
        id: 'iphone-16-pro',
        category: 'iphone',
        badge: "Lanzamiento 2024/2025",
        title: "iPhone 16 Pro (128GB - 1TB)",
        price: 4899000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Chasis de Titanio Grado 5, Chip A18 Pro, botón Control de Cámara táctil y grabación 4K a 120 fps en Dolby Vision.",
        specs: [
          "Pantalla Super Retina XDR 6.3\" ProMotion 120Hz",
          "Chip A18 Pro (GPU de 6 núcleos y Neural Engine de 16 núcleos)",
          "Sistema de cámaras Pro 48 MP + Zoom Óptico 5x tetraprisma",
          "4 micrófonos con calidad de estudio y Mezcla de Audio"
        ],
        variants: [
          "128 GB - $4.899.000",
          "256 GB - $5.399.000",
          "512 GB - $6.399.000",
          "1 TB - $7.499.000"
        ],
        colors: [
          {
            "name": "Titanio Desierto",
            "hex": "#C5B29F",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXQCduY9KlZvDYMM12SNOKJ-UC7ud1w54GbunUI6a2Q6SQabwiz8Q2kaJBmntthx-YaCV8Wy8kQSKZmqDGQNYE9KcWrlbHdYwS8a_Ik-HauhOP6ewcTQJvWq3bt3UskJGN3TrdEt9BCFmGItcuKAUfBFXsjs8lfmRrz8yRzae409mM-WE221baiPBrvHCkacPhhb7xNklcGToW038Ak9jS7ImnRihPrS4ETqWMiTot3fPVgnVc_FZM"
          },
          {
            "name": "Titanio Natural",
            "hex": "#9B968F",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuC9Vbp8i7NcqJPqqwjnib7N5kojQ12qGEvJgIy1wgV3-32WO0IHIp3LcK4Ii52b8UHFqKq4nvW7NQozR1cqvE9Qi9YJvFMfEglIWYtutmYXcOCAHk7kKQ1fAZlk8G6cnyTsgxyq8-axeHjd0Kz_VsZNFP_I2DfY1IYtOchlgLNey5Za6e4zt0u21jvBsIQptmckP2q5sEk66EL0qAqhSdjjneDIX9ws4Uhh05RrKjuOfyasw9Bl-f51"
          },
          {
            "name": "Titanio Blanco",
            "hex": "#E8E8E6",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDKpi-7626i_BJoAesODslUPkoHF04It4WQfIRb2gDCzY-XPTt0M4AWO3WivVPvllUKPqKO1qhdw_EkyK6IsQgqWFmrYCyz666iavAdl6p3SM5Rd7J82vr0lZhy3YDHo9sPYN5PQUCyWDPW9pdYh6VzFQp3QVDOIaAfKgJXAz2givYj5_BDYXPsmJsCXvxGgS-JuiYI6ziK3EGAf1dO_3gPjpA3eRj_FrcGJ__DTBAC1ChH96IN4DBt"
          },
          {
            "name": "Titanio Negro",
            "hex": "#343332",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCMv6ybGEqgj4q7JB0905STGqvKkmeSjkOwJKHIsW3lZQs4t7J9z3Amool_EzZPhTuq47-VhCiR1KPVV_-avHCio8xc3fr8wI60m9tDqXziuhwgWSjPM1LTVzemNhlB7eDtEfWXuEjN91U0oRvU3KQv-a9Q-5xFxWdZlqEEJzeVWzKrhgXeEuRV3YEQMRl6YOAUBssA02c0rygPJNmzDND3-L9BBigYBXR_GsW5GtkuUN7mn8VyrNqi"
          }
        ]
      },
      {
        id: 'iphone-16-plus',
        category: 'iphone',
        badge: "Lanzamiento 2024/2025",
        title: "iPhone 16 Plus (128GB - 512GB)",
        price: 4399000,
        img: IMG_IPHONE_16,
        shortDesc: "Gran pantalla de 6.7 pulgadas con batería colosal, Chip A18, Botón de Acción y nuevo Control de Cámara lateral.",
        specs: [
          "Pantalla Super Retina XDR de 6.7\" hasta 2000 nits en exteriores",
          "Chip A18 con salto de dos generaciones para Apple Intelligence",
          "Cámara Fusion de 48 MP + Fotografía Macro y Espacial",
          "Hasta 27 horas de reproducción de video"
        ],
        variants: [
          "128 GB - $4.399.000",
          "256 GB - $4.899.000",
          "512 GB - $5.599.000"
        ],
        colors: [
          {
            "name": "Ultramarino",
            "hex": "#6374B6"
          },
          {
            "name": "Verde Azulado",
            "hex": "#82ADAA"
          },
          {
            "name": "Rosa",
            "hex": "#E6A8C5"
          },
          {
            "name": "Blanco",
            "hex": "#F4F4F4"
          },
          {
            "name": "Negro",
            "hex": "#2C2D30"
          }
        ]
      },
      {
        id: 'iphone-16',
        category: 'iphone',
        badge: "Lanzamiento 2024/2025",
        title: "iPhone 16 (128GB - 512GB)",
        price: 3999000,
        img: IMG_IPHONE_16,
        shortDesc: "Diseñado para Apple Intelligence con Chip A18, Botón de Acción personalizable, Control de Cámara y colores vibrantes.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" con Ceramic Shield",
          "Chip A18 de alto rendimiento y eficiencia energética",
          "Cámara Fusion de 48 MP con teleobjetivo 2x de calidad óptica",
          "Colores: Ultramarino, Verde Azulado, Rosa, Blanco y Negro"
        ],
        variants: [
          "128 GB - $3.999.000",
          "256 GB - $4.499.000",
          "512 GB - $5.199.000"
        ],
        colors: [
          {
            "name": "Ultramarino",
            "hex": "#6374B6"
          },
          {
            "name": "Verde Azulado",
            "hex": "#82ADAA"
          },
          {
            "name": "Rosa",
            "hex": "#E6A8C5"
          },
          {
            "name": "Blanco",
            "hex": "#F4F4F4"
          },
          {
            "name": "Negro",
            "hex": "#2C2D30"
          }
        ]
      },
      {
        id: 'iphone-16e',
        category: 'iphone',
        badge: "Lanzamiento 2025 • Chip A18",
        title: "iPhone 16e (128GB - 512GB)",
        price: 2999000,
        img: IMG_IPHONE_16,
        shortDesc: "Potencia del Chip A18 y Apple Intelligence a un precio extraordinario, con pantalla OLED de 6.1\", Face ID, Botón de Acción y módem Apple C1.",
        specs: [
          "Pantalla Super Retina XDR OLED de 6.1\" de borde a borde con Face ID",
          "Chip A18 + Primer módem celular Apple C1 con la mejor batería en 6.1\"",
          "Sistema de cámara 2 en 1 Fusion de 48 MP con teleobjetivo 2x integrado",
          "Botón de Acción, puerto USB-C y emergencia SOS vía satélite"
        ],
        variants: [
          "128 GB - Negro Mate / Blanco - $2.999.000",
          "256 GB - $3.499.000",
          "512 GB - $4.199.000"
        ],
        colors: [
          {
            "name": "Negro Mate",
            "hex": "#28282B"
          },
          {
            "name": "Blanco Mate",
            "hex": "#F5F5F7"
          }
        ]
      },
      {
        id: 'iphone-15-pro-max',
        category: 'iphone',
        badge: "Serie iPhone 15 (2023)",
        title: "iPhone 15 Pro Max (256GB - 1TB)",
        price: 4999000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Forjado en titanio aeroespacial con el Chip A17 Pro, conector USB-C con velocidad USB 3 y zoom óptico 5x.",
        specs: [
          "Pantalla Super Retina XDR 6.7\" ProMotion 120Hz Always-On",
          "Chip A17 Pro de 3nm compatible con Apple Intelligence",
          "Cámara principal 48 MP con teleobjetivo tetraprisma 5x (120 mm)",
          "Botón de Acción personalizable y chasis de Titanio Grado 5"
        ],
        variants: [
          "256 GB - $4.999.000",
          "512 GB - $5.799.000",
          "1 TB - $6.599.000"
        ],
        colors: [
          {
            "name": "Titanio Natural",
            "hex": "#9A958D"
          },
          {
            "name": "Titanio Azul",
            "hex": "#3D4552"
          },
          {
            "name": "Titanio Blanco",
            "hex": "#F2F1ED"
          },
          {
            "name": "Titanio Negro",
            "hex": "#3E3F41"
          }
        ]
      },
      {
        id: 'iphone-15-pro',
        category: 'iphone',
        badge: "Serie iPhone 15 (2023)",
        title: "iPhone 15 Pro (128GB - 512GB)",
        price: 4299000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El Pro más ligero en titanio aeroespacial de 6.1\", con Botón de Acción, Chip A17 Pro y puerto USB-C 3.0.",
        specs: [
          "Pantalla Super Retina XDR 6.1\" ProMotion 120Hz con Dynamic Island",
          "Chip A17 Pro compatible con Apple Intelligence y juegos de consola",
          "Cámara Pro de 48 MP con 7 distancias focales y zoom óptico 3x",
          "Conector USB-C con transferencia de hasta 10 Gb/s"
        ],
        variants: [
          "128 GB - $4.299.000",
          "256 GB - $4.799.000",
          "512 GB - $5.399.000"
        ],
        colors: [
          {
            "name": "Titanio Natural",
            "hex": "#9A958D"
          },
          {
            "name": "Titanio Azul",
            "hex": "#3D4552"
          },
          {
            "name": "Titanio Blanco",
            "hex": "#F2F1ED"
          },
          {
            "name": "Titanio Negro",
            "hex": "#3E3F41"
          }
        ]
      },
      {
        id: 'iphone-15-plus',
        category: 'iphone',
        badge: "Serie iPhone 15 (2023)",
        title: "iPhone 15 Plus (128GB - 256GB)",
        price: 3699000,
        img: IMG_IPHONE_16,
        shortDesc: "Gran pantalla de 6.7 pulgadas con Dynamic Island, cámara de 48 MP, vidrio con infusión de color y enorme batería.",
        specs: [
          "Pantalla Super Retina XDR de 6.7\" hasta 2000 nits",
          "Chip A16 Bionic de 6 núcleos de alta eficiencia",
          "Cámara gran angular de 48 MP con teleobjetivo 2x de calidad óptica",
          "Puerto USB-C y hasta 26 horas de reproducción de video"
        ],
        variants: [
          "128 GB - $3.699.000",
          "256 GB - $4.199.000"
        ],
        colors: [
          {
            "name": "Rosa",
            "hex": "#EBD3D4"
          },
          {
            "name": "Amarillo",
            "hex": "#F5EFC9"
          },
          {
            "name": "Verde",
            "hex": "#D5DFD0"
          },
          {
            "name": "Azul",
            "hex": "#D6E1E8"
          },
          {
            "name": "Negro",
            "hex": "#3C3D3A"
          }
        ]
      },
      {
        id: 'iphone-15',
        category: 'iphone',
        badge: "Serie iPhone 15 (2023)",
        title: "iPhone 15 (128GB - 256GB)",
        price: 3299000,
        img: IMG_IPHONE_16,
        shortDesc: "Dynamic Island, cámara principal de 48 MP con retratos de última generación, Chip A16 Bionic y conector USB-C.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" con Dynamic Island",
          "Chip A16 Bionic ultrarrápido",
          "Vidrio trasero mate con infusión de color y bordes contorneados",
          "Colores: Negro, Azul, Verde, Amarillo y Rosa"
        ],
        variants: [
          "128 GB - $3.299.000",
          "256 GB - $3.799.000"
        ],
        colors: [
          {
            "name": "Rosa",
            "hex": "#EBD3D4"
          },
          {
            "name": "Amarillo",
            "hex": "#F5EFC9"
          },
          {
            "name": "Verde",
            "hex": "#D5DFD0"
          },
          {
            "name": "Azul",
            "hex": "#D6E1E8"
          },
          {
            "name": "Negro",
            "hex": "#3C3D3A"
          }
        ]
      },
      {
        id: 'iphone-14-pro-max',
        category: 'iphone',
        badge: "Lanzamiento 2022",
        title: "iPhone 14 Pro Max (128GB - 512GB)",
        price: 3999000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El debut de Dynamic Island y la pantalla siempre activa en 6.7\", con cámara Pro de 48 MP y acero inoxidable.",
        specs: [
          "Pantalla Super Retina XDR de 6.7\" ProMotion Always-On",
          "Chip A16 Bionic de 4 nanómetros",
          "Cámara Pro de 48 MP con sensor quad-pixel y Photonic Engine",
          "Detección de Choques y Emergencia SOS vía satélite"
        ],
        variants: [
          "128 GB - $3.999.000",
          "256 GB - $4.499.000",
          "512 GB - $4.999.000"
        ],
        colors: [
          {
            "name": "Morado Oscuro",
            "hex": "#594F63"
          },
          {
            "name": "Oro",
            "hex": "#F4E8CE"
          },
          {
            "name": "Plata",
            "hex": "#F0F2F2"
          },
          {
            "name": "Negro Espacial",
            "hex": "#403E3D"
          }
        ]
      },
      {
        id: 'iphone-14-pro',
        category: 'iphone',
        badge: "Lanzamiento 2022",
        title: "iPhone 14 Pro (128GB - 256GB)",
        price: 3499000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Dynamic Island interactiva en 6.1\", cámara principal de 48 MP ProRAW y grabación Modo Cine en 4K HDR.",
        specs: [
          "Pantalla Super Retina XDR 6.1\" ProMotion 120Hz Always-On",
          "Chip A16 Bionic con GPU de 5 núcleos",
          "Triple cámara Pro de 48 MP + Teleobjetivo 3x + Escáner LiDAR",
          "Acabados: Morado Oscuro, Oro, Plata y Negro Espacial"
        ],
        variants: [
          "128 GB - $3.499.000",
          "256 GB - $3.899.000"
        ],
        colors: [
          {
            "name": "Morado Oscuro",
            "hex": "#594F63"
          },
          {
            "name": "Oro",
            "hex": "#F4E8CE"
          },
          {
            "name": "Plata",
            "hex": "#F0F2F2"
          },
          {
            "name": "Negro Espacial",
            "hex": "#403E3D"
          }
        ]
      },
      {
        id: 'iphone-14-plus',
        category: 'iphone',
        badge: "Lanzamiento 2022",
        title: "iPhone 14 Plus (128GB - 256GB)",
        price: 2899000,
        img: IMG_IPHONE_16,
        shortDesc: "Pantalla grande de 6.7 pulgadas en un cuerpo de aluminio ligero con modo Acción y batería para todo el día.",
        specs: [
          "Pantalla Super Retina XDR OLED de 6.7\"",
          "Chip A15 Bionic con GPU de 5 núcleos",
          "Cámara dual avanzada con Photonic Engine y Modo Acción",
          "Hasta 26 horas de reproducción de video"
        ],
        variants: [
          "128 GB - $2.899.000",
          "256 GB - $3.299.000"
        ],
        colors: [
          {
            "name": "Azul",
            "hex": "#A0B4C7"
          },
          {
            "name": "Morado",
            "hex": "#E5DDEA"
          },
          {
            "name": "Amarillo",
            "hex": "#F9E479"
          },
          {
            "name": "Medianoche",
            "hex": "#222930"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#FAF6F2"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#FC0324"
          }
        ]
      },
      {
        id: 'iphone-14',
        category: 'iphone',
        badge: "Lanzamiento 2022",
        title: "iPhone 14 (128GB - 256GB)",
        price: 2599000,
        img: IMG_IPHONE_16,
        shortDesc: "Equilibrio ideal de tamaño de 6.1\", cámaras mejoradas en baja luz con Photonic Engine y Detección de Choques.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" OLED con Ceramic Shield",
          "Chip A15 Bionic con GPU de 5 núcleos",
          "Cámara dual de 12 MP con Modo Cine en 4K Dolby Vision",
          "Conectividad 5G y accesorios magnéticos MagSafe"
        ],
        variants: [
          "128 GB - $2.599.000",
          "256 GB - $2.999.000"
        ],
        colors: [
          {
            "name": "Azul",
            "hex": "#A0B4C7"
          },
          {
            "name": "Morado",
            "hex": "#E5DDEA"
          },
          {
            "name": "Amarillo",
            "hex": "#F9E479"
          },
          {
            "name": "Medianoche",
            "hex": "#222930"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#FAF6F2"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#FC0324"
          }
        ]
      },
      {
        id: 'iphone-se-3',
        category: 'iphone',
        badge: "Lanzamiento 2022 • Touch ID",
        title: "iPhone SE (3.ª generación - 2022)",
        price: 1599000,
        img: IMG_IPHONE_16,
        shortDesc: "El clásico botón de inicio con Touch ID potenciado con el Chip A15 Bionic del iPhone 13 y conectividad 5G.",
        specs: [
          "Pantalla Retina HD de 4.7\" compacta y cómoda en mano",
          "Chip A15 Bionic de 6 núcleos con conectividad 5G",
          "Botón de inicio con sensor de huella Touch ID seguro",
          "Cámara de 12 MP con Deep Fusion, HDR Inteligente 4 y Estilos Fotográficos"
        ],
        variants: [
          "64 GB - Medianoche / Blanco Estelar / (PRODUCT)RED - $1.599.000",
          "128 GB - $1.799.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#232A31"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F9F3EE"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#BF0013"
          }
        ]
      },
      {
        id: 'iphone-13-pro-max',
        category: 'iphone',
        badge: "Serie iPhone 13 (2021)",
        title: "iPhone 13 Pro Max (128GB - 256GB)",
        price: 3299000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Legendario por su batería y fluidez: pantalla ProMotion de 120Hz de 6.7\", fotografía macro y teleobjetivo 3x.",
        specs: [
          "Pantalla Super Retina XDR de 6.7\" con ProMotion de 120Hz",
          "Chip A15 Bionic con GPU de 5 núcleos",
          "Sistema de cámaras Pro con Macro, Teleobjetivo 3x y LiDAR",
          "Chasis de acero inoxidable quirúrgico y Ceramic Shield"
        ],
        variants: [
          "128 GB - $3.299.000",
          "256 GB - $3.699.000"
        ],
        colors: [
          {
            "name": "Azul Sierra",
            "hex": "#A7C1D9"
          },
          {
            "name": "Verde Alpino",
            "hex": "#576856"
          },
          {
            "name": "Grafito",
            "hex": "#54524F"
          },
          {
            "name": "Oro",
            "hex": "#FAE7CF"
          },
          {
            "name": "Plata",
            "hex": "#F1F2ED"
          }
        ]
      },
      {
        id: 'iphone-13-pro',
        category: 'iphone',
        badge: "Serie iPhone 13 (2021)",
        title: "iPhone 13 Pro (128GB - 256GB)",
        price: 2899000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Pantalla ProMotion de 120Hz en 6.1\", triple cámara profesional con grabación ProRes y fotografía macro.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" ProMotion 120Hz",
          "Chip A15 Bionic con GPU de 5 núcleos",
          "Grabación de video ProRes y Modo Cine con enfoque dinámico",
          "Acabados: Azul Sierra, Verde Alpino, Grafito, Oro y Plata"
        ],
        variants: [
          "128 GB - $2.899.000",
          "256 GB - $3.299.000"
        ],
        colors: [
          {
            "name": "Azul Sierra",
            "hex": "#A7C1D9"
          },
          {
            "name": "Verde Alpino",
            "hex": "#576856"
          },
          {
            "name": "Grafito",
            "hex": "#54524F"
          },
          {
            "name": "Oro",
            "hex": "#FAE7CF"
          },
          {
            "name": "Plata",
            "hex": "#F1F2ED"
          }
        ]
      },
      {
        id: 'iphone-13',
        category: 'iphone',
        badge: "Serie iPhone 13 (2021)",
        title: "iPhone 13 (128GB - 256GB)",
        price: 2199000,
        img: IMG_IPHONE_16,
        shortDesc: "Uno de los iPhones más populares de la historia: cámara dual en diagonal con Sensor-Shift OIS y gran autonomía.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" OLED brillante",
          "Chip A15 Bionic rápido y eficiente con 5G",
          "Cámara dual de 12 MP con estabilización por desplazamiento de sensor",
          "Modo Cine 1080p y compatibilidad total con MagSafe"
        ],
        variants: [
          "128 GB - $2.199.000",
          "256 GB - $2.599.000"
        ],
        colors: [
          {
            "name": "Rosa",
            "hex": "#FADDD7"
          },
          {
            "name": "Azul",
            "hex": "#276787"
          },
          {
            "name": "Medianoche",
            "hex": "#232A31"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F9F3EE"
          },
          {
            "name": "Verde",
            "hex": "#394C38"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#BF0013"
          }
        ]
      },
      {
        id: 'iphone-13-mini',
        category: 'iphone',
        badge: "Serie iPhone 13 (2021)",
        title: "iPhone 13 mini (128GB - 256GB)",
        price: 1999000,
        img: IMG_IPHONE_16,
        shortDesc: "El último mini de Apple: toda la potencia del Chip A15 Bionic y pantalla OLED en un tamaño compacto de 5.4\".",
        specs: [
          "Pantalla Super Retina XDR de 5.4\" OLED de borde a borde",
          "Chip A15 Bionic idéntico al iPhone 13",
          "Cámara dual con Modo Cine y Modo Noche",
          "Ultrahoja de 140 gramos con resistencia IP68 y MagSafe"
        ],
        variants: [
          "128 GB - $1.999.000",
          "256 GB - $2.399.000"
        ],
        colors: [
          {
            "name": "Rosa",
            "hex": "#FADDD7"
          },
          {
            "name": "Azul",
            "hex": "#276787"
          },
          {
            "name": "Medianoche",
            "hex": "#232A31"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F9F3EE"
          },
          {
            "name": "Verde",
            "hex": "#394C38"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#BF0013"
          }
        ]
      },
      {
        id: 'iphone-12-pro-max',
        category: 'iphone',
        badge: "Lanzamiento 2020",
        title: "iPhone 12 Pro Max (128GB - 256GB)",
        price: 2499000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El primer Pro Max con 5G, bordes planos en acero inoxidable, pantalla de 6.7\" y escáner LiDAR.",
        specs: [
          "Pantalla Super Retina XDR de 6.7\" OLED",
          "Chip A14 Bionic (primer chip de 5 nanómetros)",
          "Triple cámara Pro con zoom óptico 2.5x y Apple ProRAW",
          "Tecnología MagSafe y frente de Ceramic Shield"
        ],
        variants: [
          "128 GB - $2.499.000",
          "256 GB - $2.799.000"
        ],
        colors: [
          {
            "name": "Azul Pacífico",
            "hex": "#2D4E5C"
          },
          {
            "name": "Grafito",
            "hex": "#52514F"
          },
          {
            "name": "Oro",
            "hex": "#F9E5C9"
          },
          {
            "name": "Plata",
            "hex": "#F1F2ED"
          }
        ]
      },
      {
        id: 'iphone-12-pro',
        category: 'iphone',
        badge: "Lanzamiento 2020",
        title: "iPhone 12 Pro (128GB - 256GB)",
        price: 2199000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Diseño en acero inoxidable quirúrgico de 6.1\", triple cámara con sensor LiDAR y grabación HDR en Dolby Vision.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" OLED",
          "Chip A14 Bionic con conectividad 5G",
          "Triple cámara de 12 MP con retratos en Modo Noche asistidos por LiDAR",
          "Acabados: Azul Pacífico, Grafito, Oro y Plata"
        ],
        variants: [
          "128 GB - $2.199.000",
          "256 GB - $2.499.000"
        ],
        colors: [
          {
            "name": "Azul Pacífico",
            "hex": "#2D4E5C"
          },
          {
            "name": "Grafito",
            "hex": "#52514F"
          },
          {
            "name": "Oro",
            "hex": "#F9E5C9"
          },
          {
            "name": "Plata",
            "hex": "#F1F2ED"
          }
        ]
      },
      {
        id: 'iphone-12',
        category: 'iphone',
        badge: "Lanzamiento 2020",
        title: "iPhone 12 (64GB - 128GB)",
        price: 1699000,
        img: IMG_IPHONE_16,
        shortDesc: "Pionero del diseño de bordes planos con pantalla OLED Super Retina XDR de 6.1\", 5G y accesorios MagSafe.",
        specs: [
          "Pantalla Super Retina XDR de 6.1\" OLED con Ceramic Shield",
          "Chip A14 Bionic de alto desempeño",
          "Cámara dual de 12 MP con Modo Noche en ultra gran angular y frontal",
          "Carga inalámbrica magnética MagSafe"
        ],
        variants: [
          "64 GB - $1.699.000",
          "128 GB - $1.899.000"
        ],
        colors: [
          {
            "name": "Negro",
            "hex": "#201D24"
          },
          {
            "name": "Blanco",
            "hex": "#F6F2EF"
          },
          {
            "name": "Azul",
            "hex": "#043458"
          },
          {
            "name": "Verde",
            "hex": "#D8EFD5"
          },
          {
            "name": "Morado",
            "hex": "#B7AFE6"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#E23636"
          }
        ]
      },
      {
        id: 'iphone-12-mini',
        category: 'iphone',
        badge: "Lanzamiento 2020",
        title: "iPhone 12 mini (64GB - 128GB)",
        price: 1499000,
        img: IMG_IPHONE_16,
        shortDesc: "Compacto de 5.4 pulgadas con pantalla OLED de borde a borde, conectividad 5G, MagSafe y Chip A14 Bionic.",
        specs: [
          "Pantalla Super Retina XDR de 5.4\" OLED",
          "Chip A14 Bionic con Neural Engine de 16 núcleos",
          "Cámara dual de 12 MP con grabación 4K Dolby Vision",
          "Resistencia al agua IP68 y Ceramic Shield"
        ],
        variants: [
          "64 GB - $1.499.000",
          "128 GB - $1.699.000"
        ],
        colors: [
          {
            "name": "Negro",
            "hex": "#201D24"
          },
          {
            "name": "Blanco",
            "hex": "#F6F2EF"
          },
          {
            "name": "Azul",
            "hex": "#043458"
          },
          {
            "name": "Verde",
            "hex": "#D8EFD5"
          },
          {
            "name": "Morado",
            "hex": "#B7AFE6"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#E23636"
          }
        ]
      },
      {
        id: 'iphone-se-2',
        category: 'iphone',
        badge: "Lanzamiento 2020 • Touch ID",
        title: "iPhone SE (2.ª generación - 2020)",
        price: 1099000,
        img: IMG_IPHONE_16,
        shortDesc: "El diseño clásico de 4.7 pulgadas con botón Touch ID y el corazón del iPhone 11 Pro (Chip A13 Bionic) al precio más económico.",
        specs: [
          "Pantalla Retina HD de 4.7\" con True Tone y Haptic Touch",
          "Chip A13 Bionic de 64 bits con Neural Engine de 3.ª generación",
          "Botón de inicio de cristal de zafiro con Touch ID",
          "Modo Retrato con control de profundidad, carga inalámbrica Qi y resistencia IP67"
        ],
        variants: [
          "64 GB - Negro / Blanco / (PRODUCT)RED - $1.099.000",
          "128 GB - $1.249.000"
        ],
        colors: [
          {
            "name": "Negro",
            "hex": "#1F2020"
          },
          {
            "name": "Blanco",
            "hex": "#F9F6EF"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#BA0C2E"
          }
        ]
      },
      {
        id: 'iphone-11-pro-max',
        category: 'iphone',
        badge: "Serie iPhone 11 (2019)",
        title: "iPhone 11 Pro Max (64GB - 256GB)",
        price: 1899000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El primer Pro Max de Apple con triple cámara de 12 MP, pantalla OLED de 6.5\" y vidrio mate texturizado.",
        specs: [
          "Pantalla Super Retina XDR de 6.5\" OLED",
          "Chip A13 Bionic con motor neuronal de 8 núcleos",
          "Triple cámara: Ultra Gran Angular, Gran Angular y Teleobjetivo 2x",
          "Acero inoxidable quirúrgico y resistencia al agua IP68 (4 metros)"
        ],
        variants: [
          "64 GB - Verde Medianoche / Gris Espacial / Oro / Plata - $1.899.000",
          "256 GB - $2.199.000"
        ],
        colors: [
          {
            "name": "Verde Medianoche",
            "hex": "#4E5851"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          },
          {
            "name": "Plata",
            "hex": "#EBEEF0"
          },
          {
            "name": "Oro",
            "hex": "#F5E0C8"
          }
        ]
      },
      {
        id: 'iphone-11-pro',
        category: 'iphone',
        badge: "Serie iPhone 11 (2019)",
        title: "iPhone 11 Pro (64GB - 256GB)",
        price: 1699000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Formato Pro compacto de 5.8 pulgadas con pantalla Super Retina XDR OLED, acero inoxidable y triple cámara.",
        specs: [
          "Pantalla Super Retina XDR de 5.8\" OLED con HDR10 y Dolby Vision",
          "Chip A13 Bionic de alto rendimiento",
          "Sistema de triple cámara de 12 MP con Modo Noche y Deep Fusion",
          "Face ID rápido y grabación 4K a 60 fps en todas las cámaras"
        ],
        variants: [
          "64 GB - $1.699.000",
          "256 GB - $1.999.000"
        ],
        colors: [
          {
            "name": "Verde Medianoche",
            "hex": "#4E5851"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          },
          {
            "name": "Plata",
            "hex": "#EBEEF0"
          },
          {
            "name": "Oro",
            "hex": "#F5E0C8"
          }
        ]
      },
      {
        id: 'iphone-11',
        category: 'iphone',
        badge: "Serie iPhone 11 (2019)",
        title: "iPhone 11 (64GB - 128GB)",
        price: 1349000,
        img: IMG_IPHONE_16,
        shortDesc: "Clásico imbatible: pantalla Liquid Retina de 6.1\", cámara dual con Ultra Gran Angular y Modo Noche, Face ID y Chip A13 Bionic.",
        specs: [
          "Pantalla Liquid Retina HD de 6.1\" con True Tone",
          "Chip A13 Bionic fluido y confiable en iOS",
          "Cámara dual de 12 MP (Gran Angular y Ultra Gran Angular 120°)",
          "Colores: Negro, Blanco, Morado, Verde, Amarillo y (PRODUCT)RED"
        ],
        variants: [
          "64 GB - $1.349.000",
          "128 GB - $1.549.000"
        ],
        colors: [
          {
            "name": "Negro",
            "hex": "#1F2020"
          },
          {
            "name": "Blanco",
            "hex": "#F9F6EF"
          },
          {
            "name": "Verde",
            "hex": "#ADE0CD"
          },
          {
            "name": "Amarillo",
            "hex": "#FFE681"
          },
          {
            "name": "Morado",
            "hex": "#D1CDDA"
          },
          {
            "name": "(PRODUCT)RED",
            "hex": "#BA0C2E"
          }
        ]
      },
      {
        id: 'macbook-pro-m5',
        category: 'mac',
        badge: "Nuevo 2026 • Chip M5",
        title: "MacBook Pro 14\" y 16\" (M5 / M5 Pro / M5 Max)",
        price: 8999000,
        img: IMG_MACBOOK,
        shortDesc: "La estación de trabajo portátil definitiva 2026: arquitectura de 2nm, Thunderbolt 5 de 120 Gb/s y hasta 24 horas de batería.",
        specs: [
          "Chips Apple M5, M5 Pro y M5 Max con Neural Engine cuántico de 32 núcleos",
          "Pantalla Liquid Retina XDR con opción Nano-Texturizada antirreflejo",
          "Puertos Thunderbolt 5, HDMI 2.1 (8K), lector SDXC y MagSafe 3",
          "Hasta 128 GB de memoria unificada y Wi-Fi 7 ultrarrápido"
        ],
        variants: [
          "14\" M5 (16GB/512GB) - $8.999.000",
          "14\" M5 Pro (24GB/1TB) - $10.499.000",
          "16\" M5 Max (48GB/1TB) - $15.999.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#2E3033"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'macbook-air-m5',
        category: 'mac',
        badge: "Nuevo 2026 • Ultraligera",
        title: "MacBook Air 13\" y 15\" (Chip M5)",
        price: 5899000,
        img: IMG_MACBOOK,
        shortDesc: "La laptop más amada del mundo ahora con Chip M5, cámara Center Stage de 12 MP, 16GB de RAM base y hasta 20 horas de autonomía.",
        specs: [
          "Chip Apple M5 de 10 núcleos con aceleración de IA para Apple Intelligence 3.0",
          "16 GB de memoria unificada de serie en todos los modelos",
          "Soporte nativo para dos monitores externos 6K con la tapa abierta",
          "Colores: Medianoche, Blanco Estelar, Azul Cielo y Plata"
        ],
        variants: [
          "13\" M5 (16GB/256GB) - $5.899.000",
          "13\" M5 (16GB/512GB) - $6.899.000",
          "15\" M5 (16GB/512GB) - $7.799.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1C2331"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Azul Cielo",
            "hex": "#A8BDD4"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'macbook-pro-m4',
        category: 'mac',
        badge: "Potencia Pro M4",
        title: "MacBook Pro 14\" y 16\" (M4 / M4 Pro / M4 Max)",
        price: 7999000,
        img: IMG_MACBOOK,
        shortDesc: "Rendimiento profesional extraordinario con conectividad Thunderbolt 5, cámara 12MP Center Stage y batería de 24 horas.",
        specs: [
          "Chip Apple M4, M4 Pro o M4 Max de hasta 16 núcleos de CPU y 40 de GPU",
          "Brillo SDR de hasta 1000 nits en exteriores y 1600 nits HDR",
          "3 puertos Thunderbolt 5, HDMI, ranura SDXC y carga rápida MagSafe 3",
          "Acabados: Negro Espacial (Space Black) y Plata"
        ],
        variants: [
          "14\" M4 (16GB/512GB) - $7.999.000",
          "14\" M4 Pro (24GB/512GB) - $9.699.000",
          "16\" M4 Max (36GB/1TB) - $14.499.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#2E3033"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'macbook-air-m4',
        category: 'mac',
        badge: "Best Seller Portátil",
        title: "MacBook Air 13\" y 15\" (Chip M4)",
        price: 5199000,
        img: IMG_MACBOOK,
        shortDesc: "Diseño silencioso sin ventilador con chip M4, 16 GB de memoria RAM base y potencia sobrada para universidad y trabajo.",
        specs: [
          "Chip Apple M4 de 10 núcleos CPU y 10 núcleos GPU",
          "Pantalla Liquid Retina de 13.6\" o 15.3\" con 500 nits de brillo",
          "Cámara 12MP Center Stage con Vista Cenital de escritorio",
          "Batería de hasta 18 horas y carga MagSafe 3"
        ],
        variants: [
          "13\" M4 (16GB/256GB) - $5.199.000",
          "13\" M4 (16GB/512GB) - $6.199.000",
          "15\" M4 (16GB/512GB) - $6.999.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1C2331"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'imac-24-m4',
        category: 'mac',
        badge: "Todo en Uno 4.5K",
        title: "iMac 24\" Pantalla Retina 4.5K (Chip M4)",
        price: 6699000,
        img: IMG_MACBOOK,
        shortDesc: "El todo en uno definitivo con chip M4, 16 GB de RAM base, opción de vidrio nano-texturizado y accesorios USB-C a juego.",
        specs: [
          "Pantalla Retina 4.5K de 24\" con opción Nano-Texturizada antirreflejo",
          "Chip Apple M4 y cámara 12MP Center Stage con Encuadre Centrado",
          "Incluye Magic Keyboard con Touch ID y Magic Mouse con puerto USB-C",
          "Hasta 4 puertos Thunderbolt 4 y Gigabit Ethernet"
        ],
        variants: [
          "M4 8-GPU (16GB/256GB) - $6.699.000",
          "M4 10-GPU (16GB/512GB) - $7.899.000",
          "M4 (24GB/1TB) - $9.199.000"
        ],
        colors: [
          {
            "name": "Azul Océano",
            "hex": "#456987"
          },
          {
            "name": "Verde Menta",
            "hex": "#638977"
          },
          {
            "name": "Rosa Suave",
            "hex": "#B86877"
          },
          {
            "name": "Plata Clásica",
            "hex": "#DCDFE3"
          },
          {
            "name": "Amarillo",
            "hex": "#DEB340"
          },
          {
            "name": "Naranja",
            "hex": "#D97543"
          },
          {
            "name": "Morado",
            "hex": "#776E94"
          }
        ]
      },
      {
        id: 'mac-mini-m4',
        category: 'mac',
        badge: "Rediseño Ultracompacto",
        title: "Mac mini (Chip M4 y M4 Pro)",
        price: 2999000,
        img: IMG_MACBOOK,
        shortDesc: "Increíblemente pequeño (12.7 x 12.7 cm) y descomunalmente potente con puertos frontales USB-C y Thunderbolt 5 en M4 Pro.",
        specs: [
          "Nuevo diseño cuadrado de apenas 12.7 cm por lado con huella de carbono neutra",
          "16 GB de memoria unificada base (expandible hasta 64 GB en M4 Pro)",
          "2 puertos USB-C frontales + 3 puertos Thunderbolt 4/5 traseros + HDMI + Ethernet",
          "Ideal para desarrolladores, estudios creativos y servidores de IA local"
        ],
        variants: [
          "Mac mini M4 (16GB/256GB) - $2.999.000",
          "Mac mini M4 (16GB/512GB) - $3.899.000",
          "Mac mini M4 Pro (24GB/512GB) - $6.699.000"
        ],
        colors: [
          {
            "name": "Plata Clásica",
            "hex": "#DCDFE3"
          }
        ]
      },
      {
        id: 'mac-studio-m4',
        category: 'mac',
        badge: "Supercomputadora IA",
        title: "Mac Studio (M4 Max / M4 Ultra)",
        price: 9999000,
        img: IMG_MACBOOK,
        shortDesc: "La bestia de escritorio para producción cinematográfica 8K, compilación masiva y entrenamiento de modelos LLM locales.",
        specs: [
          "Chips M4 Max (16 núcleos CPU) o M4 Ultra (hasta 32 núcleos CPU y 80 GPU)",
          "Hasta 256 GB de memoria unificada de ultra alto ancho de banda",
          "6 puertos Thunderbolt 5, Ethernet de 10 Gb, lector SDXC frontal y HDMI 2.1",
          "Sistema térmico silencioso de doble turbina en aluminio extruido"
        ],
        variants: [
          "M4 Max (36GB/512GB) - $9.999.000",
          "M4 Max (64GB/1TB) - $12.999.000",
          "M4 Ultra (128GB/2TB) - $21.999.000"
        ],
        colors: [
          {
            "name": "Plata Clásica",
            "hex": "#DCDFE3"
          }
        ]
      },
      {
        id: 'macbook-pro-m3',
        category: 'mac',
        badge: "Oportunidad Pro",
        title: "MacBook Pro 14\" y 16\" (M3 Pro / Max)",
        price: 7299000,
        img: IMG_MACBOOK,
        shortDesc: "Pantalla Liquid Retina XDR, hasta 22 horas de batería y todos los puertos profesionales a precio especial de liquidación.",
        specs: [
          "Chip Apple M3 Pro o M3 Max con trazado de rayos por hardware",
          "18 GB o 36 GB de memoria unificada ultrarrápida",
          "Puertos HDMI, lector SDXC, MagSafe 3 y 3x Thunderbolt 4",
          "Acabado Negro Espacial (Space Black) o Plata"
        ],
        variants: [
          "14\" M3 Pro (18GB/512GB) - $7.299.000",
          "16\" M3 Pro (18GB/512GB) - $8.999.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#2E3033"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'macbook-air-m3',
        category: 'mac',
        badge: "Favorita Estudiantes",
        title: "MacBook Air 13\" y 15\" (Chip M3 / M2)",
        price: 4299000,
        img: IMG_MACBOOK,
        shortDesc: "El ingreso ideal al mundo MacBook: ultraligera, silenciosa, con Wi-Fi 6E y hasta 18 horas de batería.",
        specs: [
          "Chip Apple M3 o M2 de 8 núcleos con diseño delgado de aluminio reciclado",
          "Pantalla Liquid Retina de 13.6\" o 15.3\" con True Tone",
          "Cámara FaceTime HD 1080p y Touch ID integrado",
          "Colores: Medianoche, Blanco Estelar, Gris Espacial y Plata"
        ],
        variants: [
          "13\" M2 (8GB/256GB) - $4.299.000",
          "13\" M3 (16GB/256GB) - $4.699.000",
          "15\" M3 (16GB/512GB) - $5.899.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1C2331"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'ipad-pro-m5',
        category: 'ipad',
        badge: "Nuevo 2026 • Tandem OLED",
        title: "iPad Pro 11\" y 13\" (Chip M5)",
        price: 6499000,
        img: IMG_IPAD,
        shortDesc: "La cúspide de las tablets en 2026: Chip M5 de 2nm, pantalla Ultra Retina XDR Tandem OLED 2.0 y Wi-Fi 7 en solo 5.0 mm.",
        specs: [
          "Pantalla Ultra Retina XDR OLED en tándem con ProMotion 120Hz y opción Nano-Texturizada",
          "Chip Apple M5 con 16 GB de RAM base y motor neuronal para Apple Intelligence 3.0",
          "Conectividad Thunderbolt 5 / USB 4 y soporte para Apple Pencil Pro",
          "Escáner LiDAR de nueva generación y 4 micrófonos con calidad de estudio"
        ],
        variants: [
          "11\" M5 Wi-Fi 256GB - $6.499.000",
          "11\" M5 Wi-Fi 512GB - $7.499.000",
          "13\" M5 Wi-Fi 256GB - $7.999.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#2E3033"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'ipad-pro-m4',
        category: 'ipad',
        badge: "Ultra Fino 5.1mm",
        title: "iPad Pro 11\" y 13\" (Chip M4)",
        price: 5499000,
        img: IMG_IPAD,
        shortDesc: "Pantalla Ultra Retina XDR OLED en tándem y el potente Chip M4 para diseño 3D, arquitectura y edición de video ProRes.",
        specs: [
          "Pantalla Ultra Retina XDR con brillo pico de 1600 nits HDR",
          "Chip M4 con motor neuronal de 38 billones de operaciones por segundo",
          "Compatible con Apple Pencil Pro y Magic Keyboard de aluminio con trackpad háptico",
          "Colores: Negro Espacial y Plata"
        ],
        variants: [
          "11\" M4 Wi-Fi 256GB - $5.499.000",
          "11\" M4 Wi-Fi 512GB - $6.399.000",
          "13\" M4 Wi-Fi 256GB - $6.999.000"
        ],
        colors: [
          {
            "name": "Negro Espacial",
            "hex": "#2E3033"
          },
          {
            "name": "Plata",
            "hex": "#E3E4E6"
          }
        ]
      },
      {
        id: 'ipad-air-m4',
        category: 'ipad',
        badge: "Nuevo 2026 • 11\" y 13\"",
        title: "iPad Air 11\" y 13\" (Chip M4)",
        price: 3599000,
        img: IMG_IPAD,
        shortDesc: "El iPad Air más veloz de la historia ahora con Chip M4, pantalla de alto brillo de 600 nits y soporte completo para Apple Pencil Pro.",
        specs: [
          "Chip Apple M4 de 8 núcleos CPU y 10 núcleos GPU con Ray Tracing",
          "Disponible en 11 pulgadas portátil y 13 pulgadas de gran formato",
          "Cámara frontal ultra gran angular de 12 MP en orientación horizontal",
          "Compatible con el nuevo Magic Keyboard y Apple Pencil Pro"
        ],
        variants: [
          "11\" M4 128GB Wi-Fi - $3.599.000",
          "11\" M4 256GB Wi-Fi - $4.199.000",
          "13\" M4 128GB Wi-Fi - $4.699.000"
        ],
        colors: [
          {
            "name": "Azul Cielo",
            "hex": "#9BB8D3"
          },
          {
            "name": "Morado Pastel",
            "hex": "#C6BEE2"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          }
        ]
      },
      {
        id: 'ipad-air-m2',
        category: 'ipad',
        badge: "Potencia M2",
        title: "iPad Air 11\" y 13\" (Chip M2)",
        price: 2999000,
        img: IMG_IPAD,
        shortDesc: "Rendimiento M2 extraordinario en dos tamaños con pantalla Liquid Retina laminada y diseño en aluminio reciclado.",
        specs: [
          "Chip Apple M2 con 8 GB de memoria unificada para Apple Intelligence",
          "Pantalla Liquid Retina con gama cromática P3 y revestimiento antirreflejo",
          "Touch ID integrado en el botón superior y Wi-Fi 6E",
          "Colores: Azul, Morado, Blanco Estelar y Gris Espacial"
        ],
        variants: [
          "11\" M2 128GB Wi-Fi - $2.999.000",
          "11\" M2 256GB Wi-Fi - $3.499.000",
          "13\" M2 128GB Wi-Fi - $3.999.000"
        ],
        colors: [
          {
            "name": "Azul",
            "hex": "#9BB8D3"
          },
          {
            "name": "Morado",
            "hex": "#C6BEE2"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          }
        ]
      },
      {
        id: 'ipad-mini-a17-pro',
        category: 'ipad',
        badge: "IA Ultraportátil 8.3\"",
        title: "iPad mini (7.ª Gen - Chip A17 Pro)",
        price: 2699000,
        img: IMG_IPAD,
        shortDesc: "Toda la potencia del Chip A17 Pro y Apple Intelligence en un diseño compacto de 8.3 pulgadas compatible con Apple Pencil Pro.",
        specs: [
          "Chip A17 Pro con GPU de 5 núcleos y trazado de rayos por hardware",
          "Pantalla Liquid Retina de 8.3 pulgadas con True Tone y gama P3",
          "Compatible con Apple Pencil Pro (gesto de apretar y rotación)",
          "Puerto USB-C el doble de rápido (10 Gbps) y 128 GB de almacenamiento base"
        ],
        variants: [
          "128 GB Wi-Fi - $2.699.000",
          "256 GB Wi-Fi - $3.199.000",
          "128 GB Wi-Fi + Cellular - $3.499.000"
        ],
        colors: [
          {
            "name": "Azul Suave",
            "hex": "#A3B9D1"
          },
          {
            "name": "Morado",
            "hex": "#C9C2DF"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Gris Espacial",
            "hex": "#535150"
          }
        ]
      },
      {
        id: 'ipad-11-gen',
        category: 'ipad',
        badge: "Nuevo 2026 • Apple Intelligence",
        title: "iPad (11.ª Generación - Chip A16 / A17)",
        price: 2199000,
        img: IMG_IPAD,
        shortDesc: "El iPad más popular se renueva en 2026 con el doble de almacenamiento base (128 GB), chip preparado para IA y pantalla de 10.9\".",
        specs: [
          "Pantalla Liquid Retina de 10.9 pulgadas de borde a borde",
          "Chip de nueva generación con 8 GB de RAM para multitarea fluida",
          "Cámara frontal horizontal de 12 MP con Encuadre Centrado",
          "Compatible con Magic Keyboard Folio y Apple Pencil (USB-C)"
        ],
        variants: [
          "128 GB Wi-Fi - $2.199.000",
          "256 GB Wi-Fi - $2.699.000"
        ],
        colors: [
          {
            "name": "Azul Vivo",
            "hex": "#5487B2"
          },
          {
            "name": "Rosa Pastel",
            "hex": "#E4A2B6"
          },
          {
            "name": "Amarillo Solar",
            "hex": "#F3D458"
          },
          {
            "name": "Plata Clásica",
            "hex": "#DCDFE3"
          }
        ]
      },
      {
        id: 'ipad-10-gen',
        category: 'ipad',
        badge: "Precio Especial",
        title: "iPad (10.ª Generación)",
        price: 1799000,
        img: IMG_IPAD,
        shortDesc: "Diseño moderno todo pantalla colorido ideal para colegio, universidad, lectura, streaming y notas digitales.",
        specs: [
          "Pantalla Liquid Retina de 10.9\" con True Tone",
          "Chip A14 Bionic, conector USB-C y Touch ID en botón superior",
          "Cámaras de 12 MP y altavoces estéreo en horizontal",
          "Colores vibrantes: Azul, Rosa, Amarillo y Plata"
        ],
        variants: [
          "64 GB Wi-Fi - $1.799.000",
          "256 GB Wi-Fi - $2.399.000"
        ],
        colors: [
          {
            "name": "Azul Vivo",
            "hex": "#5487B2"
          },
          {
            "name": "Rosa",
            "hex": "#DE6483"
          },
          {
            "name": "Amarillo",
            "hex": "#F2D357"
          },
          {
            "name": "Plata",
            "hex": "#DCDFE3"
          }
        ]
      },
      {
        id: 'watch-ultra-3',
        category: 'watch',
        badge: "Nuevo 2026 • Satelital",
        title: "Apple Watch Ultra 3 (49mm Titanio)",
        price: 4499000,
        img: IMG_WATCH,
        shortDesc: "El reloj deportivo y de expedición definitivo 2026: conexión satelital fuera de red, alertas de hipertensión y pantalla OLED de 3500 nits.",
        specs: [
          "Caja de titanio aeroespacial de 49 mm (Titanio Natural o Titanio Negro Satinado)",
          "Chip S11 SiP con mensajes vía satélite sin necesidad de llevar el iPhone",
          "Detección de tendencias de presión arterial (hipertensión) y apnea del sueño",
          "Batería extrema de hasta 48 horas de uso normal y 96 horas en modo ahorro"
        ],
        variants: [
          "Titanio Natural 49mm - $4.499.000",
          "Titanio Negro 49mm - $4.599.000",
          "Con Correa Milanese de Titanio - $4.999.000"
        ],
        colors: [
          {
            "name": "Titanio Natural",
            "hex": "#9E978E"
          },
          {
            "name": "Titanio Negro Satinado",
            "hex": "#222224"
          }
        ]
      },
      {
        id: 'watch-series-12',
        category: 'watch',
        badge: "Nuevo 2026 • Salud IA",
        title: "Apple Watch Series 12 (42mm / 46mm)",
        price: 2499000,
        img: IMG_WATCH,
        shortDesc: "Nuevo lanzamiento 2026: pantalla Micro-LED/LTPO3 ultrabrillante, sensor de presión arterial y entrenador de salud con Apple Intelligence.",
        specs: [
          "Diseño ultradelgado de 9.5 mm con cristal frontal de zafiro o Ion-X reforzado",
          "Chip S12 SiP con procesamiento neuronal en la muñeca y gesto de doble toque 2.0",
          "Monitoreo continuo de presión arterial, apnea del sueño, ECG y oxígeno en sangre",
          "Carga ultrarrápida: de 0 a 80% en apenas 20 minutos"
        ],
        variants: [
          "Aluminio 42mm GPS - $2.499.000",
          "Aluminio 46mm GPS - $2.699.000",
          "Titanio Pulido 46mm GPS+Cell - $3.899.000"
        ],
        colors: [
          {
            "name": "Negro Azabache (Jet Black)",
            "hex": "#111213"
          },
          {
            "name": "Oro Rosa",
            "hex": "#E4C3B7"
          },
          {
            "name": "Plata",
            "hex": "#E4E5E7"
          },
          {
            "name": "Titanio Gris Pizarra",
            "hex": "#44464B"
          }
        ]
      },
      {
        id: 'watch-series-11',
        category: 'watch',
        badge: "5G RedCap & Salud",
        title: "Apple Watch Series 11 (42mm / 46mm)",
        price: 2199000,
        img: IMG_WATCH,
        shortDesc: "Gran pantalla de ángulo amplio, conectividad celular 5G RedCap de bajo consumo y métricas avanzadas de entrenamiento.",
        specs: [
          "Pantalla OLED de gran ángulo un 40% más brillante al mirarla de lado",
          "Chip S11 SiP con detección de caídas, choques y signos vitales nocturnos",
          "Sensores de profundidad y temperatura del agua para snorkel y natación",
          "Acabados: Negro Azabache brillante, Oro Rosa, Plata y Titanio"
        ],
        variants: [
          "Aluminio 42mm GPS - $2.199.000",
          "Aluminio 46mm GPS - $2.399.000",
          "Titanio 46mm GPS+Cell - $3.599.000"
        ],
        colors: [
          {
            "name": "Negro Azabache",
            "hex": "#111213"
          },
          {
            "name": "Oro Rosa",
            "hex": "#E4C3B7"
          },
          {
            "name": "Plata",
            "hex": "#E4E5E7"
          }
        ]
      },
      {
        id: 'watch-ultra-2',
        category: 'watch',
        badge: "Titanio Negro & Natural",
        title: "Apple Watch Ultra 2 (49mm GPS + Cellular)",
        price: 3899000,
        img: IMG_WATCH,
        shortDesc: "Resistencia militar MIL-STD 810H, sirena de 86 decibeles, GPS de doble frecuencia L1+L5 y buceo recreativo hasta 40 metros.",
        specs: [
          "Caja de titanio de 49 mm resistente a la corrosión con cristal de zafiro plano",
          "Botón de Acción personalizable en Naranja Internacional",
          "Hasta 36 horas de autonomía normal y 72 horas en modo bajo consumo",
          "Correas: Alpine Loop, Trail Loop, Ocean Band y Milanese de Titanio"
        ],
        variants: [
          "Titanio Natural 49mm - $3.899.000",
          "Titanio Negro Satinado 49mm - $3.999.000"
        ],
        colors: [
          {
            "name": "Titanio Natural",
            "hex": "#9E978E"
          },
          {
            "name": "Titanio Negro",
            "hex": "#222224"
          }
        ]
      },
      {
        id: 'watch-series-10',
        category: 'watch',
        badge: "Diseño Delgado",
        title: "Apple Watch Series 10 (42mm / 46mm)",
        price: 1899000,
        img: IMG_WATCH,
        shortDesc: "El rediseño clásico con pantalla amplia, reproducción de música por el altavoz integrado y carga rápida en 30 minutos.",
        specs: [
          "Chip S10 SiP de 4 núcleos neuronales",
          "Sensores de temperatura del agua, profundidad, ECG y ciclo menstrual",
          "Notificaciones de apnea del sueño y frecuencia cardíaca alta/baja",
          "Acabados: Negro Azabache brillante, Oro Rosa y Plata"
        ],
        variants: [
          "Aluminio 42mm GPS - $1.899.000",
          "Aluminio 46mm GPS - $2.099.000"
        ],
        colors: [
          {
            "name": "Negro Azabache",
            "hex": "#111213"
          },
          {
            "name": "Oro Rosa",
            "hex": "#E4C3B7"
          },
          {
            "name": "Plata",
            "hex": "#E4E5E7"
          }
        ]
      },
      {
        id: 'watch-se-3',
        category: 'watch',
        badge: "Nuevo 2026 • Calidad/Precio",
        title: "Apple Watch SE (3.ª Generación - 2026)",
        price: 1399000,
        img: IMG_WATCH,
        shortDesc: "El reloj inteligente esencial renovado con pantalla más grande de bordes delgados, chip S10 rápido y Detección de Choques.",
        specs: [
          "Pantallas actualizadas de 41 mm y 45 mm con mayor área activa",
          "Chip S10 SiP ultrarrápido compatible con gestos y Siri en el dispositivo",
          "Resistencia al agua 50m, control del sueño y Configuración Familiar para niños",
          "Colores: Medianoche, Blanco Estelar, Azul y Plata"
        ],
        variants: [
          "41mm GPS - $1.399.000",
          "45mm GPS - $1.549.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1C2331"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Plata",
            "hex": "#E4E5E7"
          }
        ]
      },
      {
        id: 'watch-se-2',
        category: 'watch',
        badge: "Acceso Apple Watch",
        title: "Apple Watch SE (2.ª Generación)",
        price: 1099000,
        img: IMG_WATCH,
        shortDesc: "La forma más económica de estrenar Apple Watch original con todas las funciones de actividad, salud cardíaca y seguridad.",
        specs: [
          "Chip S8 SiP de doble núcleo",
          "Resistencia al agua hasta 50 metros para natación",
          "Monitoreo de frecuencia cardíaca, fases del sueño y llamadas de emergencia",
          "Cajas de 40 mm y 44 mm en Medianoche, Estelar y Plata"
        ],
        variants: [
          "40mm GPS - $1.099.000",
          "44mm GPS - $1.249.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1C2331"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#F3EFE0"
          },
          {
            "name": "Plata",
            "hex": "#E4E5E7"
          }
        ]
      },
      {
        id: 'airpods-pro-3',
        category: 'airpods',
        badge: "Nuevo 2026 • Chip H3 + Salud",
        title: "AirPods Pro 3 (Estuche MagSafe USB-C con Pantalla Táctil)",
        price: 1399000,
        img: IMG_AIRPODS,
        shortDesc: "La nueva generación 2026 con Chip H3, Cancelación Activa de Ruido 4x superior, sensor de frecuencia cardíaca y temperatura en oído, y traducción en vivo con Apple Intelligence.",
        specs: [
          "Nuevo Chip H3 de ultra baja latencia y Audio Lossless inalámbrico",
          "Sensores biométricos de ritmo cardíaco y temperatura corporal integrados",
          "Cancelación Activa de Ruido (ANC) 4x y Modo Audífono Clínico 2.0",
          "Estuche MagSafe USB-C con altavoz, chip U2 de rastreo milimétrico y 36h de batería"
        ],
        variants: [
          "AirPods Pro 3 (USB-C MagSafe 2026) - $1.399.000"
        ],
        colors: [
          {
            "name": "Blanco Brillante Original",
            "hex": "#FFFFFF"
          },
          {
            "name": "Negro Titanio Hi-Fi",
            "hex": "#27282A"
          }
        ]
      },
      {
        id: 'airpods-max-2',
        category: 'airpods',
        badge: "Nuevo 2026 • Studio Hi-Fi",
        title: "AirPods Max 2 (Chip H3 + Audio Lossless USB-C)",
        price: 2899000,
        img: IMG_AIRPODS,
        shortDesc: "Diadema de alta fidelidad rediseñada en 2026: 30% más ligeros, Chip H3 dual en cada casco, Audio Adaptativo, Audio sin pérdida por USB-C y nuevos acabados en Titanio.",
        specs: [
          "Doble Chip H3 (uno en cada auricular) con ecualización computacional de 10 bandas",
          "Audio Lossless de 24 bits / 48 kHz sin latencia y Audio Espacial con seguimiento dinámico",
          "Cancelación Activa de Ruido profesional de nueva generación",
          "Colores 2026: Negro Titanio, Plata Estelar, Carmesí, Azul Medianoche y Morado"
        ],
        variants: [
          "Negro Titanio - $2.899.000",
          "Plata Estelar - $2.899.000",
          "Azul Medianoche - $2.899.000",
          "Carmesí Especial - $2.999.000"
        ],
        colors: [
          {
            "name": "Negro Titanio",
            "hex": "#28292B"
          },
          {
            "name": "Plata Estelar",
            "hex": "#E4E5E7"
          },
          {
            "name": "Azul Medianoche",
            "hex": "#2B3547"
          },
          {
            "name": "Carmesí RedCover",
            "hex": "#A81C28"
          },
          {
            "name": "Morado Profundo",
            "hex": "#584C66"
          }
        ]
      },
      {
        id: 'airpods-4-anc',
        category: 'airpods',
        badge: "Best Seller • Diseño Abierto ANC",
        title: "AirPods 4 con Cancelación Activa de Ruido (ANC)",
        price: 899000,
        img: IMG_AIRPODS,
        shortDesc: "Por primera vez, Cancelación Activa de Ruido, Audio Adaptativo y Modo Ambiente en un diseño abierto sin almohadillas de silicona.",
        specs: [
          "Chip H2 con Cancelación Activa de Ruido y Aislamiento de Voz en llamadas",
          "Estuche de carga inalámbrica compatible con MagSafe, Apple Watch y USB-C con altavoz",
          "Audio Espacial personalizado con seguimiento dinámico de la cabeza",
          "Resistencia al polvo, al sudor y al agua (IP54) con hasta 30 horas de batería"
        ],
        variants: [
          "AirPods 4 con ANC (Estuche Inalámbrico USB-C) - $899.000"
        ],
        colors: [
          {
            "name": "Blanco Brillante Original",
            "hex": "#FFFFFF"
          }
        ]
      },
      {
        id: 'airpods-4',
        category: 'airpods',
        badge: "Gama Actual • Chip H2",
        title: "AirPods 4 (Con Estuche de Carga USB-C)",
        price: 679000,
        img: IMG_AIRPODS,
        shortDesc: "Contorno ergonómico totalmente rediseñado para ofrecer comodidad todo el día, acústica superior con Chip H2 y llamadas nítidas.",
        specs: [
          "Chip H2 diseñado por Apple con graves profundos y agudos cristalinos",
          "Audio Espacial personalizado y gestos con la cabeza para responder a Siri",
          "Estuche de carga compacto USB-C con hasta 30 horas de autonomía total",
          "Certificación IP54 contra agua, sudor y polvo"
        ],
        variants: [
          "AirPods 4 Estándar (USB-C) - $679.000"
        ],
        colors: [
          {
            "name": "Blanco Brillante Original",
            "hex": "#FFFFFF"
          }
        ]
      },
      {
        id: 'airpods-pro-2',
        category: 'airpods',
        badge: "Audio Pro • USB-C",
        title: "AirPods Pro (2.ª Generación) con MagSafe USB-C",
        price: 1129000,
        img: IMG_AIRPODS,
        shortDesc: "Cancelación Activa de Ruido de referencia, Audio Adaptativo, Detección de Conversación y funciones certificadas de Salud Auditiva.",
        specs: [
          "Chip H2 con arquitectura acústica a medida y control táctil de volumen en el vástago",
          "Cuatro tamaños de almohadillas de silicona (XS, S, M, L) para sellado acústico",
          "Estuche de carga MagSafe (USB-C) con Rastreo Preciso y enganche para correa",
          "Protección IP54 y hasta 6 horas de escucha con una sola carga"
        ],
        variants: [
          "AirPods Pro 2 (Estuche MagSafe USB-C) - $1.129.000"
        ],
        colors: [
          {
            "name": "Blanco Brillante Original",
            "hex": "#FFFFFF"
          }
        ]
      },
      {
        id: 'airpods-max-usbc',
        category: 'airpods',
        badge: "Alta Fidelidad • USB-C",
        title: "AirPods Max (Edición USB-C)",
        price: 2499000,
        img: IMG_AIRPODS,
        shortDesc: "La experiencia definitiva de auriculares de diadema con transductores dinámicos diseñados por Apple, malla transpirable y aluminio anodizado.",
        specs: [
          "Transductor dinámico de 40 mm con doble imán de neodimio sin distorsión",
          "9 micrófonos para Cancelación Activa de Ruido líder y Modo Ambiente",
          "Digital Crown para control preciso de volumen, pistas y llamadas",
          "Colores: Medianoche, Blanco Estelar, Azul, Morado y Naranja"
        ],
        variants: [
          "Medianoche USB-C - $2.499.000",
          "Blanco Estelar USB-C - $2.499.000",
          "Azul USB-C - $2.499.000"
        ],
        colors: [
          {
            "name": "Medianoche",
            "hex": "#1F242E"
          },
          {
            "name": "Blanco Estelar",
            "hex": "#EDE8DD"
          },
          {
            "name": "Azul Cielo",
            "hex": "#7799B5"
          },
          {
            "name": "Morado",
            "hex": "#887E98"
          },
          {
            "name": "Naranja",
            "hex": "#DC6C4C"
          }
        ]
      },
      {
        id: 'airpods-3',
        category: 'airpods',
        badge: "Clásico MagSafe",
        title: "AirPods (3.ª Generación) con Estuche MagSafe",
        price: 589000,
        img: IMG_AIRPODS,
        shortDesc: "Audio Espacial con seguimiento dinámico de la cabeza, ecualización adaptativa y sensor de presión en un formato ligero.",
        specs: [
          "Ecualización Adaptativa que ajusta la música en tiempo real a tu oído",
          "Audio Espacial tridimensional para música, películas y llamadas FaceTime",
          "Resistencia al agua y al sudor (IPX4) en auriculares y estuche",
          "Hasta 6 horas de reproducción continua y 30 horas con el estuche MagSafe"
        ],
        variants: [
          "AirPods 3.ª Gen (Estuche MagSafe) - $589.000"
        ],
        colors: [
          {
            "name": "Blanco Brillante Original",
            "hex": "#FFFFFF"
          }
        ]
      },
      {
        id: 'samsung-s26-ultra',
        category: 'samsung',
        badge: "Gama 2026 • Buque Insignia Galaxy",
        title: "Samsung Galaxy S26 Ultra 5G (256GB - 1TB • S-Pen)",
        price: 6499000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El nuevo rey Android de 2026: Chasis de Titanio Grado 5 con esquinas ergonómicas, procesador Snapdragon 8 Elite Gen 2 for Galaxy, cámara cuádruple de 200 MP + Periscopio 50 MP y Galaxy AI 3.0.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.9\" QHD+ 120Hz con Gorilla Glass Armor 2 antirreflejo",
          "Procesador Snapdragon 8 Elite Gen 2 for Galaxy (2nm) con 16 GB de RAM",
          "Sistema Cuádruple: Principal 200 MP + Ultra Gran Angular 50 MP + Tele 50 MP (5x) + Tele 50 MP (3x)",
          "S-Pen integrado con Bluetooth, batería de 5.500 mAh con carga de 65W y 7 años de actualizaciones"
        ],
        variants: [
          "256 GB / 16GB RAM - Titanio Negro - $6.499.000",
          "512 GB / 16GB RAM - Titanio Plata - $7.199.000",
          "1 TB / 16GB RAM - Titanio Azul - $8.199.000"
        ],
        colors: [
          {
            "name": "Titanio Negro",
            "hex": "#242528"
          },
          {
            "name": "Titanio Plata Sombra",
            "hex": "#CED2D8"
          },
          {
            "name": "Titanio Azul Índigo",
            "hex": "#374B63"
          },
          {
            "name": "Titanio Verde Jade",
            "hex": "#4B6358"
          }
        ]
      },
      {
        id: 'samsung-s26-plus',
        category: 'samsung',
        badge: "Gama 2026 • Gran Pantalla QHD+",
        title: "Samsung Galaxy S26+ 5G (256GB - 512GB)",
        price: 5199000,
        img: IMG_IPHONE_16,
        shortDesc: "Pantalla inmersiva QHD+ de 6.7 pulgadas con biseles ultradelgados, batería de 5.000 mAh de silicio-carbono y toda la suite Galaxy AI 3.0.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ de hasta 2.800 nits y 1-120Hz",
          "Procesador de 2 nanómetros con cámara de vapor un 40% mayor y 12 GB de RAM",
          "Triple cámara ProVisual Engine de 50 MP con Nightography 2026 y grabación 8K",
          "Carga superrápida de 45W, carga inalámbrica Qi2 y certificación IP68"
        ],
        variants: [
          "256 GB - Azul Hielo / Negro / Plata - $5.199.000",
          "512 GB - $5.799.000"
        ],
        colors: [
          {
            "name": "Azul Hielo",
            "hex": "#BDD2E2"
          },
          {
            "name": "Negro Ónix",
            "hex": "#222325"
          },
          {
            "name": "Plata",
            "hex": "#E0E2E5"
          },
          {
            "name": "Verde Salvia",
            "hex": "#9CB2A4"
          }
        ]
      },
      {
        id: 'samsung-s26',
        category: 'samsung',
        badge: "Gama 2026 • Compacto Flagship",
        title: "Samsung Galaxy S26 5G (256GB - 512GB)",
        price: 4299000,
        img: IMG_IPHONE_16,
        shortDesc: "Potencia de buque insignia en un formato compacto y ligero de 6.2\", con 12 GB de RAM base, Armor Aluminum y funciones completas de Galaxy AI.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ LTPO 1-120Hz",
          "Procesador de nueva generación de 2nm con 12 GB de memoria RAM",
          "Triple cámara trasera de 50 MP + Teleobjetivo óptico 3x + Ultra Gran Angular 12 MP",
          "Batería de 4.300 mAh de alta densidad y resistencia al agua IP68"
        ],
        variants: [
          "256 GB - Negro Ónix / Menta / Plata - $4.299.000",
          "512 GB - $4.799.000"
        ],
        colors: [
          {
            "name": "Negro Ónix",
            "hex": "#222325"
          },
          {
            "name": "Menta Fresca",
            "hex": "#B8DFD1"
          },
          {
            "name": "Azul Hielo",
            "hex": "#BDD2E2"
          },
          {
            "name": "Plata",
            "hex": "#E0E2E5"
          }
        ]
      },
      {
        id: 'samsung-s26-slim',
        category: 'samsung',
        badge: "Gama 2026 • Ultra Delgado 5.6mm",
        title: "Samsung Galaxy S26 Slim / Edge 5G (256GB - 512GB)",
        price: 5599000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Ingeniería extrema en solo 5.6 mm de grosor con cámara principal de 200 MP, marco de titanio cepillado y pantalla de 6.7 pulgadas.",
        specs: [
          "Chasis ultradelgado de 5.6 mm y solo 162 gramos con estructura de Titanio",
          "Pantalla Dynamic AMOLED 2X de 6.7\" 120Hz con Gorilla Glass Ceramic",
          "Cámara principal ISOCELL de 200 MP con zoom de calidad óptica 2x y 4x",
          "Procesador Snapdragon 8 Elite Gen 2 y Galaxy AI integrada"
        ],
        variants: [
          "256 GB - Titanio Plata / Titanio Carbón - $5.599.000",
          "512 GB - $6.199.000"
        ],
        colors: [
          {
            "name": "Titanio Plata Ultra",
            "hex": "#D2D5DA"
          },
          {
            "name": "Titanio Carbón",
            "hex": "#202123"
          },
          {
            "name": "Titanio Oro Champagne",
            "hex": "#E8DCC8"
          }
        ]
      },
      {
        id: 'samsung-z-fold-7',
        category: 'samsung',
        badge: "Plegable Insignia 2026",
        title: "Samsung Galaxy Z Fold 7 5G (256GB - 1TB)",
        price: 8299000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El plegable más delgado y potente de Samsung: pantalla interna de 8.0\" sin pliegue perceptible, cámara Ultra de 200 MP y multitarea de escritorio DeX.",
        specs: [
          "Pantalla principal desplegable de 8.0\" Dynamic AMOLED 2X + Externa de 6.5\" formato 21:9",
          "Grosor plegado de apenas 8.9 mm con bisagra FlexHinge de titanio",
          "Cámara principal de 200 MP heredada de la línea Ultra + 12 GB / 16 GB de RAM",
          "Compatibilidad con S-Pen Fold Edition, resistencia IP48 y Galaxy AI para pantallas grandes"
        ],
        variants: [
          "256 GB - Plata Sombra / Negro - $8.299.000",
          "512 GB - $8.999.000",
          "1 TB - $9.999.000"
        ],
        colors: [
          {
            "name": "Plata Sombra",
            "hex": "#9D9FA2"
          },
          {
            "name": "Negro Jet",
            "hex": "#1E1E20"
          },
          {
            "name": "Azul Marino Oscuro",
            "hex": "#253549"
          }
        ]
      },
      {
        id: 'samsung-z-flip-7',
        category: 'samsung',
        badge: "Plegable Compacto 2026",
        title: "Samsung Galaxy Z Flip 7 5G (256GB - 512GB)",
        price: 4999000,
        img: IMG_IPHONE_16,
        shortDesc: "Estilo icónico de bolsillo con nueva pantalla externa FlexWindow de borde a borde de 4.0\", cámara FlexCam de 50 MP con IA y batería de 4.300 mAh.",
        specs: [
          "Pantalla externa Super AMOLED de 4.0\" 120Hz + Interna plegable de 6.8\" FHD+ 120Hz",
          "Cámara principal de 50 MP con Auto Zoom inteligente para manos libres en FlexCam",
          "Batería ampliada de 4.300 mAh y procesador de 3nm de alto rendimiento",
          "Colores: Azul Hielo, Verde Menta, Plata Sombra y Grafito"
        ],
        variants: [
          "256 GB - $4.999.000",
          "512 GB - $5.499.000"
        ],
        colors: [
          {
            "name": "Azul Hielo",
            "hex": "#A9C5D9"
          },
          {
            "name": "Verde Menta",
            "hex": "#B8E0CE"
          },
          {
            "name": "Plata Sombra",
            "hex": "#9D9FA2"
          },
          {
            "name": "Lavanda Suave",
            "hex": "#D2CCE3"
          }
        ]
      },
      {
        id: 'samsung-s25-ultra',
        category: 'samsung',
        badge: "Gama S25 (2025) • Titanio",
        title: "Samsung Galaxy S25 Ultra 5G (256GB - 1TB • S-Pen)",
        price: 5599000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Diseño de titanio con bordes redondeados, procesador Snapdragon 8 Elite for Galaxy, nueva cámara Ultra Gran Angular de 50 MP + Principal de 200 MP y S-Pen.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.9\" QHD+ con Corning Gorilla Armor 2 antirreflejo",
          "Procesador Snapdragon 8 Elite for Galaxy (3nm) con NPU un 40% más rápida",
          "Cámara 200 MP + Nuevo Ultra Gran Angular 50 MP Macro + Teleobjetivos 50 MP (5x) y 10 MP (3x)",
          "Grabación de video Log profesional de 10 bits, Audio Eraser con IA y S-Pen integrado"
        ],
        variants: [
          "256 GB - Azul Titanio / Negro Titanio / Gris Titanio - $5.599.000",
          "512 GB - $6.199.000",
          "1 TB - $7.199.000"
        ],
        colors: [
          {
            "name": "Azul Plata Titanio",
            "hex": "#8EA2B4"
          },
          {
            "name": "Negro Titanio",
            "hex": "#29292B"
          },
          {
            "name": "Gris Titanio",
            "hex": "#9C9891"
          },
          {
            "name": "Blanco Plata Titanio",
            "hex": "#E6E7E9"
          }
        ]
      },
      {
        id: 'samsung-s25-edge',
        category: 'samsung',
        badge: "Gama S25 (2025) • 5.8mm Titanio",
        title: "Samsung Galaxy S25 Edge 5G (256GB - 512GB)",
        price: 4899000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El Galaxy S25 ultradelgado de 5.8 mm y 163 gramos con chasis de titanio, pantalla QHD+ de 6.7\" y sensor principal de 200 MP.",
        specs: [
          "Perfil ultradelgado de 5.8 mm con marco de Titanio y Gorilla Glass Ceramic 2",
          "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ 120Hz",
          "Cámara principal de 200 MP con Nightography y Snapdragon 8 Elite for Galaxy",
          "12 GB de RAM y todas las funciones de agentes multimodales Galaxy AI"
        ],
        variants: [
          "256 GB - Plata Titanio / Negro Jet / Azul Hielo - $4.899.000",
          "512 GB - $5.399.000"
        ],
        colors: [
          {
            "name": "Plata Titanio",
            "hex": "#CED1D6"
          },
          {
            "name": "Negro Jet Titanio",
            "hex": "#1E1F21"
          },
          {
            "name": "Azul Hielo Titanio",
            "hex": "#B8CAD8"
          }
        ]
      },
      {
        id: 'samsung-s25-plus',
        category: 'samsung',
        badge: "Gama S25 (2025)",
        title: "Samsung Galaxy S25+ 5G (256GB - 512GB)",
        price: 4499000,
        img: IMG_IPHONE_16,
        shortDesc: "Gran pantalla QHD+ de 6.7 pulgadas con ProScaler AI, procesador Snapdragon 8 Elite for Galaxy, 12 GB de RAM y batería de 4.900 mAh.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ (3120 x 1440) 120Hz",
          "Snapdragon 8 Elite for Galaxy en todas las versiones con 12 GB de RAM",
          "Triple cámara de 50 MP con motor ProVisual de nueva generación",
          "Carga rápida de 45W, Wi-Fi 7 y cuerpo de Armor Aluminum"
        ],
        variants: [
          "256 GB - Azul Marino / Menta / Bruma / Plata - $4.499.000",
          "512 GB - $4.999.000"
        ],
        colors: [
          {
            "name": "Azul Marino",
            "hex": "#23395B"
          },
          {
            "name": "Azul Hielo",
            "hex": "#BFD1DF"
          },
          {
            "name": "Menta",
            "hex": "#C6E3D5"
          },
          {
            "name": "Plata Sombra",
            "hex": "#8E9196"
          }
        ]
      },
      {
        id: 'samsung-s25',
        category: 'samsung',
        badge: "Gama S25 (2025)",
        title: "Samsung Galaxy S25 5G (128GB - 256GB)",
        price: 3699000,
        img: IMG_IPHONE_16,
        shortDesc: "Compacto, ultraligero (162g) y potentísimo gracias al chip Snapdragon 8 Elite for Galaxy y 12 GB de RAM de serie para Galaxy AI.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ 1-120Hz de 2.600 nits",
          "Chip Snapdragon 8 Elite for Galaxy + 12 GB de memoria RAM",
          "Cámara triple: 50 MP Principal + 12 MP Ultra Gran Angular + 10 MP Teleobjetivo 3x",
          "Funciones Now Brief, Circle to Search y Traducción Simultánea de llamadas"
        ],
        variants: [
          "128 GB - $3.699.000",
          "256 GB - $3.999.000"
        ],
        colors: [
          {
            "name": "Azul Marino",
            "hex": "#23395B"
          },
          {
            "name": "Azul Hielo",
            "hex": "#BFD1DF"
          },
          {
            "name": "Menta",
            "hex": "#C6E3D5"
          },
          {
            "name": "Plata Sombra",
            "hex": "#8E9196"
          }
        ]
      },
      {
        id: 'samsung-s25-fe',
        category: 'samsung',
        badge: "Gama S25 • Fan Edition",
        title: "Samsung Galaxy S25 FE 5G (128GB - 256GB)",
        price: 2999000,
        img: IMG_IPHONE_16,
        shortDesc: "La edición para fans con diseño más delgado, pantalla Dynamic AMOLED 2X de 6.7\", cámara de 50 MP con teleobjetivo óptico 3x y Galaxy AI.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.7\" 120Hz con Vision Booster",
          "Triple cámara de 50 MP con OIS y zoom óptico 3x",
          "Batería de 4.700 mAh para todo el día y certificación IP68",
          "Experiencia completa de Galaxy AI y One UI 7 / 8"
        ],
        variants: [
          "128 GB - $2.999.000",
          "256 GB - $3.299.000"
        ],
        colors: [
          {
            "name": "Negro Grafito",
            "hex": "#2C2E30"
          },
          {
            "name": "Azul Glaciar",
            "hex": "#9CB8CC"
          },
          {
            "name": "Verde Menta",
            "hex": "#B2DAC8"
          },
          {
            "name": "Plata",
            "hex": "#D8DADC"
          }
        ]
      },
      {
        id: 'samsung-z-fold-6',
        category: 'samsung',
        badge: "Plegable 2024/2025",
        title: "Samsung Galaxy Z Fold 6 5G (256GB - 512GB)",
        price: 6499000,
        img: IMG_IPHONE_PRO,
        shortDesc: "Productividad sin límites en una pantalla desplegable de 7.6 pulgadas de 2.600 nits con Note Assist, Intérprete en doble pantalla y Snapdragon 8 Gen 3.",
        specs: [
          "Pantalla interna de 7.6\" QXGA+ 120Hz + Pantalla externa de 6.3\" 120Hz",
          "Procesador Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM",
          "Triple cámara trasera de 50 MP + cámara bajo pantalla (UDC)",
          "Diseño simétrico de bordes rectos con certificación IP48 y Armor Aluminum"
        ],
        variants: [
          "256 GB - Plata Sombra / Azul Marino / Rosa - $6.499.000",
          "512 GB - $6.999.000"
        ],
        colors: [
          {
            "name": "Plata Sombra",
            "hex": "#9D9FA2"
          },
          {
            "name": "Azul Marino",
            "hex": "#273446"
          },
          {
            "name": "Rosa",
            "hex": "#E8C8D0"
          },
          {
            "name": "Negro Artesanal",
            "hex": "#1E1E20"
          }
        ]
      },
      {
        id: 'samsung-z-flip-6',
        category: 'samsung',
        badge: "Plegable 2024/2025",
        title: "Samsung Galaxy Z Flip 6 5G (256GB - 512GB)",
        price: 3999000,
        img: IMG_IPHONE_16,
        shortDesc: "Plegable compacto con cámara mejorada de 50 MP, cámara de vapor por primera vez en un Flip, 12 GB de RAM y batería de 4.000 mAh.",
        specs: [
          "Pantalla plegable de 6.7\" Dynamic AMOLED 2X + Externa FlexWindow de 3.4\"",
          "Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM y cámara de vapor",
          "Cámara principal de 50 MP + Ultra Gran Angular de 12 MP con Nightography",
          "Batería de 4.000 mAh y resistencia IP48"
        ],
        variants: [
          "256 GB - Azul / Amarillo / Menta / Plata - $3.999.000",
          "512 GB - $4.399.000"
        ],
        colors: [
          {
            "name": "Azul",
            "hex": "#A9C5D9"
          },
          {
            "name": "Amarillo",
            "hex": "#F4E397"
          },
          {
            "name": "Menta",
            "hex": "#B8E0CE"
          },
          {
            "name": "Plata Sombra",
            "hex": "#9D9FA2"
          }
        ]
      },
      {
        id: 'samsung-s24-ultra',
        category: 'samsung',
        badge: "Gama S24 (2024) • Best Seller Titanio",
        title: "Samsung Galaxy S24 Ultra 5G (256GB - 1TB • S-Pen)",
        price: 4599000,
        img: IMG_IPHONE_PRO,
        shortDesc: "El favorito en calidad/precio Pro: exterior de Titanio, pantalla plana de 6.8\" QHD+ antirreflejo, S-Pen integrado, cámara de 200 MP y Snapdragon 8 Gen 3.",
        specs: [
          "Pantalla plana Dynamic AMOLED 2X de 6.8\" QHD+ 120Hz con Corning Gorilla Armor",
          "Procesador Snapdragon 8 Gen 3 for Galaxy con 12 GB de RAM",
          "Cuádruple cámara: 200 MP + Teleobjetivo 50 MP (5x) + Tele 10 MP (3x) + Ultra Gran Angular 12 MP",
          "S-Pen incluido, batería de 5.000 mAh (45W) y Galaxy AI completa"
        ],
        variants: [
          "256 GB - Gris Titanio / Negro Titanio / Violeta Titanio - $4.599.000",
          "512 GB - $5.099.000",
          "1 TB - $5.799.000"
        ],
        colors: [
          {
            "name": "Gris Titanio",
            "hex": "#8F8B84"
          },
          {
            "name": "Negro Titanio",
            "hex": "#2D2C2E"
          },
          {
            "name": "Violeta Titanio",
            "hex": "#524A5E"
          },
          {
            "name": "Amarillo Titanio",
            "hex": "#EAE0B8"
          }
        ]
      },
      {
        id: 'samsung-s24-plus',
        category: 'samsung',
        badge: "Gama S24 (2024)",
        title: "Samsung Galaxy S24+ 5G (256GB - 512GB)",
        price: 3699000,
        img: IMG_IPHONE_16,
        shortDesc: "Resolución QHD+ de máxima nitidez en 6.7 pulgadas, 12 GB de memoria RAM, batería de 4.900 mAh y todas las herramientas de Galaxy AI.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.7\" QHD+ LTPO 1-120Hz (2.600 nits)",
          "12 GB de RAM y 256 GB / 512 GB de almacenamiento ultrarrápido",
          "Triple cámara de 50 MP con Zoom con IA y Super HDR",
          "Batería de 4.900 mAh con carga superrápida de 45W e IP68"
        ],
        variants: [
          "256 GB - Negro Ónix / Gris Mármol / Violeta Cobalto - $3.699.000",
          "512 GB - $4.099.000"
        ],
        colors: [
          {
            "name": "Negro Ónix",
            "hex": "#28282B"
          },
          {
            "name": "Gris Mármol",
            "hex": "#C5C5C7"
          },
          {
            "name": "Violeta Cobalto",
            "hex": "#59536A"
          },
          {
            "name": "Amarillo Ámbar",
            "hex": "#EFE4B8"
          }
        ]
      },
      {
        id: 'samsung-s24',
        category: 'samsung',
        badge: "Gama S24 (2024)",
        title: "Samsung Galaxy S24 5G (128GB - 256GB)",
        price: 2999000,
        img: IMG_IPHONE_16,
        shortDesc: "Diseño compacto de 6.2 pulgadas con acabado satinado en Armor Aluminum, pantalla de 2.600 nits, cámara triple con zoom óptico 3x y Galaxy AI.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.2\" FHD+ LTPO 1-120Hz con biseles mínimos",
          "Triple cámara: 50 MP Principal + 10 MP Teleobjetivo 3x + 12 MP Ultra Gran Angular",
          "Batería de 4.000 mAh optimizada por IA y resistencia al agua IP68",
          "Circle to Search, Live Translate y Edición Generativa de Fotos"
        ],
        variants: [
          "128 GB - $2.999.000",
          "256 GB - $3.299.000"
        ],
        colors: [
          {
            "name": "Negro Ónix",
            "hex": "#28282B"
          },
          {
            "name": "Gris Mármol",
            "hex": "#C5C5C7"
          },
          {
            "name": "Violeta Cobalto",
            "hex": "#59536A"
          },
          {
            "name": "Amarillo Ámbar",
            "hex": "#EFE4B8"
          }
        ]
      },
      {
        id: 'samsung-s24-fe',
        category: 'samsung',
        badge: "Gama S24 (2024) • Fan Edition",
        title: "Samsung Galaxy S24 FE 5G (128GB - 256GB)",
        price: 2499000,
        img: IMG_IPHONE_16,
        shortDesc: "La entrada ideal a la serie S24 y Galaxy AI con gran pantalla de 6.7 pulgadas, cámara ProVisual Engine de 50 MP y batería de 4.700 mAh.",
        specs: [
          "Pantalla Dynamic AMOLED 2X de 6.7\" FHD+ 120Hz Gorilla Glass Victus+",
          "Sistema de triple cámara de 50 MP con OIS y zoom óptico 3x de 8 MP",
          "Batería de 4.700 mAh, carga inalámbrica y certificación IP68",
          "Colores: Azul, Grafito, Menta y Amarillo"
        ],
        variants: [
          "128 GB - $2.499.000",
          "256 GB - $2.799.000"
        ],
        colors: [
          {
            "name": "Azul",
            "hex": "#A6C2D6"
          },
          {
            "name": "Grafito",
            "hex": "#363839"
          },
          {
            "name": "Menta",
            "hex": "#BCE0D0"
          },
          {
            "name": "Amarillo",
            "hex": "#F5E693"
          }
        ]
      }
    ,
      {
        id: 'rayban-meta-wayfarer',
        category: 'gafas',
        badge: "Ray-Ban Meta • Best Seller",
        title: "Ray-Ban Meta Wayfarer (Estándar & Large)",
        price: 1699000,
        img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
        shortDesc: "El ícono del estilo ahora con cámara ultra gran angular de 12 MP, grabación en primera persona 1080p, altavoces invisibles de oído abierto y asistente Meta AI integrado.",
        specs: [
          "Cámara de 12 MP Ultra HD para fotos y videos verticales en primera persona",
          "Sistema de 5 micrófonos y altavoces direccionales de oído abierto",
          "Lentes G-15 polarizados / Transitions fotocromáticos disponibles",
          "Estuche de carga de cuero con hasta 36 horas de batería total"
        ],
        variants: [
          "Wayfarer Negro Brillante (Lente Verde G-15) - $1.699.000",
          "Wayfarer Negro Mate (Lente Polarizado Gris) - $1.799.000",
          "Wayfarer Negro (Lente Transitions Fotocromático) - $1.999.000"
        ],
        colors: [
          { "name": "Negro Brillante", "hex": "#18181A" },
          { "name": "Negro Mate", "hex": "#2A2A2E" },
          { "name": "Havana Carey", "hex": "#5C3A21" }
        ]
      },
      {
        id: 'rayban-meta-skyler',
        category: 'gafas',
        badge: "Ray-Ban Meta • Nuevo Diseño",
        title: "Ray-Ban Meta Skyler Smart Glasses",
        price: 1699000,
        img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85",
        shortDesc: "Diseño moderno tipo cat-eye inspirado en el glamour clásico con inteligencia artificial Meta AI, transmisión en directo en Instagram/Facebook y audio envolvente.",
        specs: [
          "Montura ergonómica ligera con cámara de 12 MP y LED de privacidad",
          "Llamadas manos libres por WhatsApp y transmisión en vivo directa",
          "Resistencia al agua IPX4 y control táctil en la patilla",
          "Compatible con iOS y Android mediante la app Meta View"
        ],
        variants: [
          "Skyler Negro Brillante (Lente Azul / Gris) - $1.699.000",
          "Skyler Gris Tiza (Lente Transitions Zafiro) - $1.999.000"
        ],
        colors: [
          { "name": "Negro Brillante", "hex": "#1A1A1D" },
          { "name": "Gris Tiza", "hex": "#D8D8DC" },
          { "name": "Azul Hibisco", "hex": "#3B5998" }
        ]
      },
      {
        id: 'rayban-meta-headliner',
        category: 'gafas',
        badge: "Ray-Ban Meta • Clásico Redondeado",
        title: "Ray-Ban Meta Headliner Smart Glasses",
        price: 1699000,
        img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",
        shortDesc: "La combinación perfecta entre la montura Wayfarer y Round. Captura momentos sin sacar tu iPhone del bolsillo, escucha tu música y traduce idiomas en tiempo real.",
        specs: [
          "Cámara de 12 MP integrada en el marco y traducción en vivo con Meta AI",
          "Audio personalizado de graves profundos sin bloquear el sonido ambiental",
          "Almacenamiento interno de 32 GB (más de 500 fotos o 100 videos)",
          "Carga rápida: 50% de batería en solo 22 minutos dentro del estuche"
        ],
        variants: [
          "Headliner Negro Brillante (Lente Verde G-15) - $1.699.000",
          "Headliner Carey / Havana (Lente Marrón Polarizado) - $1.799.000"
        ],
        colors: [
          { "name": "Negro Brillante", "hex": "#1C1C1E" },
          { "name": "Havana Carey", "hex": "#6B4423" }
        ]
      },
      {
        id: 'rayban-meta-limited',
        category: 'gafas',
        badge: "Ray-Ban Meta • Edición Transparente",
        title: "Ray-Ban Meta Wayfarer Edición Limitada Transparente",
        price: 2199000,
        img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=900&q=85",
        shortDesc: "Edición de colección con montura transparente que deja ver la ingeniería interna de Qualcomm Snapdragon AR1 Gen 1 y lentes Transitions Rubí.",
        specs: [
          "Chasis transparente de edición numerada con arquitectura visible",
          "Procesador Qualcomm Snapdragon AR1 Gen 1 dedicado para IA",
          "Lentes originales Transitions Gen S que se oscurecen al sol en segundos",
          "Incluye estuche de carga edición especial y paño oficial Ray-Ban"
        ],
        variants: [
          "Edición Transparente Mate - Lente Transitions Rubí / Gris - $2.199.000"
        ],
        colors: [
          { "name": "Cristal Transparente", "hex": "#E5E7EB" },
          { "name": "Rubí Espejado", "hex": "#991B1B" }
        ]
      }
    ];