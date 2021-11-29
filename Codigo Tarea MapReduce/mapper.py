#!/usr/bin/python

import sys
import time

for i in sys.stdin:
    
    words = []

    # Si la linea comienza con la clave title
    if( i.startswith('title', 3, 8) ):
        words = i[12:-4].split() # Se obtiene el valor de la clave titulo y se particiona por espacios

    # Se itera e imprime en salida estandar las palabras
    for word in words:
        print('%s\t%s' %(word, 1))

