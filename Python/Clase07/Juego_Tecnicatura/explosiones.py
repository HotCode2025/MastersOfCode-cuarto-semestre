import pygame
import os
from constantes import ASSETS_PATH

class Explosion:
    def __init__(self, x, y):
        # Construye la ruta completa a las imágenes de la explosión
        self.images = [pygame.image.load(f'{ASSETS_PATH}/images/regularExplosion0{i:02d}.png').convert_alpha() for i in range(9)]
        self.index = 0
        
        # CORREGIDO: Faltaba definir cuál es la imagen actual antes de sacar su rectángulo
        self.image = self.images[self.index] 
        self.rect = self.image.get_rect(center=(x, y))
        
        self.frame_rate = 0
        self.max_frames = 3 # CORREGIDO: Le puse 3. Si lo dejas en 0, la explosión será tan rápida que ni se verá.

    def actualizar(self):
        self.frame_rate += 1
        if self.frame_rate >= self.max_frames:
            # CORREGIDO: Esto debe ir con un tabulador (sangría) hacia la derecha porque está dentro del if
            self.frame_rate = 0
            self.index += 1
            if self.index >= len(self.images):
                return False  
            # CORREGIDO: Hay que actualizar la imagen actual para que la animación avance
            self.image = self.images[self.index] 
            
        return True

    def dibujar(self, screen):
        # CORREGIDO: Tenía un error de tipeo (decía 'toplef' en lugar de 'topleft')
        screen.blit(self.image, self.rect.topleft)