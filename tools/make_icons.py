"""Generate the PNG app icons (green Christian cross) with no third-party deps."""
import struct
import zlib
from pathlib import Path

BG = (15, 26, 20)
FG = (46, 204, 113)
OUT = Path(__file__).resolve().parent.parent / "icons"


def rects(scale, ox, oy):
    # Cross in a 100x100 design space: vertical bar + horizontal bar.
    v = (43, 12, 57, 92)
    h = (18, 36, 82, 50)
    return [tuple(c * scale + (ox if i % 2 == 0 else oy) for i, c in enumerate(r)) for r in (v, h)]


def render(size, cross_fraction):
    scale = size * cross_fraction / 100.0
    # Centre the cross's bounding box (x 18..82, y 12..92) in the canvas.
    ox = size / 2 - 50 * scale
    oy = size / 2 - 52 * scale
    rs = rects(scale, ox, oy)
    ss = 3
    rows = []
    for y in range(size):
        row = bytearray([0])
        for x in range(size):
            hit = 0
            for sy in range(ss):
                for sx in range(ss):
                    px = x + (sx + 0.5) / ss
                    py = y + (sy + 0.5) / ss
                    if any(r[0] <= px < r[2] and r[1] <= py < r[3] for r in rs):
                        hit += 1
            a = hit / (ss * ss)
            row += bytes(round(BG[i] + (FG[i] - BG[i]) * a) for i in range(3))
        rows.append(bytes(row))
    return rows


def write_png(path, size, rows):
    def chunk(tag, data):
        body = tag + data
        return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(b"".join(rows), 9)) + chunk(b"IEND", b"")
    path.write_bytes(png)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name, size, frac in [("icon-192.png", 192, 0.78), ("icon-512.png", 512, 0.78), ("icon-maskable-512.png", 512, 0.55)]:
        write_png(OUT / name, size, render(size, frac))
        print("wrote", name)
