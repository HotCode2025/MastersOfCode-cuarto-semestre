import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y):
        # Construye la ruta completa a las imágenes de la explosión
        self.images = [pygame.image.load(f'{ASSETS_PATH}/images/regularExplosion0{i:02d}.png') for i in range(9)]
        self.index = 0
        self.image = self.image.get_rect(center=(x, y))
        self.frame_rate = 0
        self.max_frames = 0

        # Actualiza la animación
    def actualizar(self):
        self.frame_rate += 1
        self.frame_rate >= self.max_frames:
        self.frame_rate = 0
        self.index += 1
        if self.index >= len(self.images):
            return False  
        return True

    def dibujar(self, screen):
        # Dibuja la imagen en la pantalla
        screen.blit(self.image, self.rect.toplef)