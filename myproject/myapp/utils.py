import numpy as np
from PIL import Image, ImageDraw, ImageFont
from stl import mesh
from skimage import measure

def create_text_image(text, font_path='arial.ttf', font_size=100):
    image = Image.new('L', (500, 200), color=255)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(font_path, font_size)
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width, text_height = text_bbox[2] - text_bbox[0], text_bbox[3] - text_bbox[1]
    draw.text(((500 - text_width) / 2, (200 - text_height) / 2), text, font=font, fill=0)
    return np.array(image)

def image_to_3d(image, height=10):
    binary_image = (image < 128).astype(np.uint8)
    depth = height
    volume = np.stack([binary_image] * depth, axis=-1)  # Extrude the 2D image into 3D
    vertices, faces, _, _ = measure.marching_cubes(volume, level=0.5)
    
    text_mesh = mesh.Mesh(np.zeros(faces.shape[0], dtype=mesh.Mesh.dtype))
    for i, f in enumerate(faces):
        for j in range(3):
            text_mesh.vectors[i][j] = vertices[f[j], :]
    return text_mesh

def save_stl(mesh, filename='output.stl'):
    mesh.save(filename)