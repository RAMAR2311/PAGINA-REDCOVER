#!/bin/bash
set -e

echo "🎬 Optimizando videos para carga rápida web (faststart + H.264)..."

if ! command -v ffmpeg &> /dev/null; then
  echo "📦 Instalando ffmpeg..."
  apt-get update -qq && apt-get install -y -qq ffmpeg
fi

VIDEO_DIR="/var/www/redcover/assets/videos"
if [ ! -d "$VIDEO_DIR" ]; then
  echo "❌ No se encontró $VIDEO_DIR"
  exit 1
fi

cd "$VIDEO_DIR"
shopt -s nullglob
for f in *.mp4; do
  echo "⚡ Procesando $f..."
  if ffmpeg -y -i "$f" -vcodec libx264 -crf 28 -preset fast -vf "scale='min(1280,iw)':-2" -movflags +faststart -an "opt_$f" -loglevel error; then
    mv "opt_$f" "$f"
    echo "   ✔ $f optimizado"
  else
    rm -f "opt_$f"
    echo "   ⚠️ Saltando archivo dañado o inválido: $f"
  fi
done

echo "✅ Todos los videos fueron optimizados."
